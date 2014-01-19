/**
 * Created by eddematta on 1/3/14.
 */

var db = require('./model/db'),
    async = require('async');
    standings = require('./routes/standings'),
    gamelog = require('./routes/gamelog'),
    schedule = require('./routes/schedule');

var mongoose = require( 'mongoose' );
var Gamelog = mongoose.model( 'Gamelog' );
var Team = mongoose.model( 'Team' );
var Player = mongoose.model( 'Player' );

var app = {
    getDB: function(){
        //gamelog.getGamelogs();
        gamelog.getGroup();
        //gamelog.getName();
    }
}

//app.getDB();
var doc = {
    teamID: 4,
    stats: [{ playerID: "1A", points: 15},
        {playerID: "1B", points: 20}]
}

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
                            ,points: doc.points };
                        return callbackMap(err, stats);
                    });

            },

            function(err, results) {
                console.log("player results: " +results);
                callback(err, results);
            });

    }
}, function(err, results) {
    var gamelogs = {};
    gamelogs.teamID = results.teamID;
    gamelogs.teamname = results.teamName;
    gamelogs.stats = results.stats;

    console.log("teamName: " +results.team.teamName);
    console.log("player: " +results.player[0].playerName);

    if (err) { console.log("Error: " +err); return; }
    console.log("gamelog: " +gamelogs);
    //return callback(null, gamelogs);
})
