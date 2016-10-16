/**
 * Created by eddematta on 1/9/14.
 */
var mongoose = require( 'mongoose' );
var Playerstat = mongoose.model( 'Playerstat' );

exports.getPlayerStats = function(req, res) {
    var teamID = parseInt(req.params.teamID);
    console.log("getPlayerStats");
    Playerstat
        .find({teamID: teamID})
        .populate('playerID')
        .lean()
        .exec(function(err, players) {
            if (err) {
                console.log("error" +err);
            } else {
                console.log(players);
               res.json(players);
            }
        });
};