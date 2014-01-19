/**
 * Created by eddematta on 1/2/14.
 */
var async = require('async');
var mongoose = require( 'mongoose' );
var Standing = mongoose.model( 'Standing' );
var Team = mongoose.model( 'Team' );
var TeamStat = mongoose.model('Teamstat');

var getTeamStats = function(doc, callback) {
    var teamID = parseInt(doc.teamID._id);
    console.log("teamID: " +teamID);
    TeamStat
        .findOne({teamID: parseInt(teamID)})
        .exec(function(err, rec){
            if (err) { return callback(err,  null)}
            else {
                var teamInfo = {
                    rank: doc.rank,
                    teamName: doc.teamID.name,
                    win: doc.win,
                    loss: doc.loss,
                    pointsScored: rec.ppg,
                    pointsAllowed: rec.papg,
                    diff: rec.diff
                }
                return callback(null, teamInfo);
            }
        });
}

exports.getStandingsX = function(req, res) {
    popStanding();
    Standing
        .find()
        .exec(function(err, standings) {
            console.log("exec" +standings.length);
            console.log(standings);
            res.json(standings);
        });
};

exports.getStandings = function(req, res) {
    Standing
        .find()
        .sort({rank: 1})
        .populate('teamID', 'name')
        .exec(function(err, docs) {
            if (err) {
                console.log("error @getStandings" +err);
            } else {
                console.log("docs" +docs);
                async.map(docs, getTeamStats, function(err, results) {
                    res.json(results);
                });

            }
        });
};

exports.popStandings = function() {
    console.log("pop");
    var t = new Team ({_id: 6, name: "orange", color: "orange", hometown: "Home"});
    t.save(function(err) {
        if (err) return handleError(err);
    })

    var s = new Standing({leagueID: "leag", teamID: t._id, win: 0, loss:0});
    s.save(function(err) {
        if (err) return handleError(err);
    })

}