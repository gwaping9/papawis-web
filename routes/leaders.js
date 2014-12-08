/**
 * Created by eddematta on 1/9/14.
 */
var async = require('async');
var db = require('../model/db');
var utils = require('../routes/utils')
var mongoose = require( 'mongoose' );
var Playerstat = mongoose.model( 'Playerstat' );


exports.getPlayerPts = function(req, res) {
    var teamID = parseInt(req.params.teamID);
    console.log("getPlayerPts");
    Playerstat
        .aggregate([
            { $match : {gamesPlayed: {$gt : 0}}},
            { $project: { 
                pts: { $divide: ['$points', '$gamesPlayed']},
                playerID: 1,
                teamID: 1,
                fts: 1,
                fg2: 1,
                fg3: 1,
                gamesPlayed: 1
            }}])
        .sort({pts: -1}).limit(15)
        .exec(function(err, players) {
            if (err) {
                console.log("error" +err);
            } else {
                /*
                players.forEach(function(player){                
                    utils.getNames(player,function(err, results){
                        res.json(results);
                    });
                });*/
                async.map(players, utils.getNames, function(err, results) {
                console.log(results);
                //console.log("team: " +results[0].team);
                res.json(results);
            });
            }
        });
};
