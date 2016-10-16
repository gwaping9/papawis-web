/**
 * Created by eddematta on 1/9/14.
 */
var db = require('../model/db');
var utils = require('../routes/utils')
var mongoose = require( 'mongoose' );
var Playerstat = mongoose.model( 'Playerstat' );
var Team = mongoose.model( 'Team' );
var getPlayerPts = function() {
    Playerstat
        //.find()      
        //.find().sort({points: -1}).limit(10)
        //.sort({points: -1}).limit(10)
        //.populate('playerID teamID')
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
        .sort({pts: -1}).limit(10)     
        //.lean()
        .exec(function(err, players) {
            if (err) {
                console.log("error" +err);
            } else {
                players.forEach(function(player){
                    //console.log(player);
                    utils.getNames(player,function(err, results){
                            console.log(results);
                           })
                        }
                    );

                //})
                //createView(players);
//                console.log(p);
            }
        });
};

var createView = function(players) {
    var p = [];
    players.forEach(function(player){
        //console.log(player);
        //console.log(player.playerID.name);
        //console.log(player.teamID.name);
        
        p.push({
            name: player.playerID.name,
            team: player.teamID.name,
            points: player.points/player.gamesPlayed,
            fts: player.fts/player.gamesPlayed,
            fg2: player.fg2/player.gamesPlayed,
            fg3: player.fg3/player.gamesPlayed,
            gp: player.gamesPlayed
        });
        
    });
    console.log(p);
    return p;
};

getPlayerPts();