/**
 * Created by eddematta on 1/7/14.
 */
/**
 * Created by eddematta on 1/2/14.
 */
var mongoose = require( 'mongoose' );
var Team = mongoose.model( 'Team' );

exports.getTeams = function(req, res) {
    Team
        .find()
        .lean()
        .exec(function(err, teams) {
            var outTeams = [];
            if (err) {
                console.log("error" +err);
            } else {
                teams.forEach(function(team){
                    outTeams.push({
                       teamID: team._id,
                       name: team.name,
                       color: team.color,
                       hometown: team.hometown,
                       logo: team.logo
                    });
                })
                res.json(outTeams);
            }
        });
};