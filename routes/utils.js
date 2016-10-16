/**
 * Created by eddematta on 1/3/14.
 */
var async = require('async');
var mongoose = require( 'mongoose' );
var Team = mongoose.model( 'Team' );
var Player = mongoose.model( 'Player' );

exports.getNames = function(doc, callback) {
    //console.log(doc);
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
            var playerID = doc.playerID;

            Player
                .findOne({_id: playerID})
                .exec(function(err, rec){
                    callback(err, { playerID: doc.playerID, playerName: rec.name });
                });
        }
        }, function(err, results) {

            if (err) { console.log("Error: " +err); return; }

            //console.log(results.team);
            var p = {playerName: results.player.playerName,
                     teamName: results.team.teamName,
                     pts: doc.pts,
                     gamesPlayed: doc.gamesPlayed
            };

            return callback(null, p);

    });
}



