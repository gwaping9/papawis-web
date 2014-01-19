/**
 * Created by eddematta on 1/3/14.
 */
var async = require('async');
var mongoose = require( 'mongoose' );
var Gamelog = mongoose.model( 'Gamelog' );
var Team = mongoose.model( 'Team' );
var Player = mongoose.model( 'Player' );

var findName = function(doc, callback) {
    console.log(doc.stats);
    var teamID = parseInt(doc.teamID);
    Team
        .findOne({_id: parseInt(teamID)})
        .exec(function(err, rec){
            //console.log(rec);
            return callback(null, { teamID: doc.teamID, stats: doc.stats, teamName: rec.name });
        });

};

var getNames = function(doc, callback) {

    async.parallel({
        //load team name

        team: function(callback) {
            var teamID = parseInt(doc.teamID);
            Team
                .findOne({_id: parseInt(teamID)})
                .exec(function(err, rec){
                    callback(err, { teamID: doc.teamID, teamName: rec.name });
                });
        },

        //load player names
        player: function(callback) {

            async.map(doc.stats,
                function(doc, callbackMap) {
                    var stats = {};
                    var playerID = doc.playerID;
                    //console.log("playerID: " +playerID);
                    Player
                        .findOne({_id: playerID})
                        .exec(function(err, rec){
                            // console.log("player: " +rec);
                            stats = { playerID: doc.teamID
                                ,playerName: rec.name
                                ,points: doc.points 
                                ,rebounds: doc.rebounds
                                ,assists: doc.assists
                                ,blocks: doc.blocks
                                ,steals: doc.steals };
                            return callbackMap(err, stats);
                        });

                },

                function(err, results) {
                    //console.log("player results: " +results);
                    callback(err, results);
                });

        }
        }, function(err, results) {

            if (err) { console.log("Error: " +err); return; }

            //console.log("gamelog: " +results);

            return callback(null, results);

    });
}

exports.getGamelogs = function(req, res) {
    console.log("getGamelogs");
    var gameID = parseInt(req.params.gameID);
    Gamelog
        .aggregate()
        .match({gameID : gameID })
        .group({_id:  "$teamID",
            stats: { $push: { playerID: "$playerID", 
                                points: "$points",
                              rebounds: "$rebounds",
                               assists: "$assists",
                                blocks: "$blocks",
                                steals: "$steals"  }}
        })
        .project({ _id: 0, teamID: "$_id", stats: 1 })
        .exec(function(err, docs){

            async.map(docs, getNames, function(err, results) {
                console.log("results: " +results);
                console.log("team: " +results[0].team);
                res.json(results);
            });

        });
};

exports.getGroup = function () {
    var gameID = parseInt(20141001);
    Gamelog
        .aggregate()
        .match({gameID : gameID })
        .group({_id:  "$teamID",
            stats: { $push: { playerID: "$playerID", points: "$points"  }}
        })
        .project({ _id: 0, teamID: "$_id", stats: 1 })
        .exec(function(err, docs){

            async.map(docs, findName, function(err, results) {
                console.log("results " +results[0].teamName);
            });

        });
}