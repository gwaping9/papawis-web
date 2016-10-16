var db = require('../model/db');

var mongoose = require( 'mongoose' );
var Gamelog = mongoose.model( 'Gamelog' );
var Playerstat = mongoose.model('Playerstat');

var addPlayer = function() {
		console.log("addPlayer");
	    Gamelog
        .find({played: 'TRUE'})
        .lean()
        .exec(function(err, logs) {            
            if (err) {
                console.log("error" +err);
            } else {
                logs.forEach(function(log){
                	console.log("forEach");
       				var query = {playerID: log.playerID}
       				Playerstat.update(query, {
       					$set: {
       						playerID: log.playerID,
       						leagueID: log.leagueID,
       						teamID: log.teamID	
       					},
       					$inc: {
       						points: log.points,
       						rebounds: log.rebounds,
       						assists: log.assists,
       						blocks: log.blocks,
       						steals: log.steals,
       						gamesPlayed: 1
       					}
       				},{upsert: true},function(err, numberAffected, rawResponse){
       					if (err) { console.log("error upsert" +err); return}
       				});
                    
                });

            }
        });

};

addPlayer();