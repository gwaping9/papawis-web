/**
 * Created by eddematta on 1/2/14.
 */
/**
 * Created by eddematta on 1/2/14.
 */
var mongoose = require( 'mongoose' );
var Game = mongoose.model( 'Game' );
var Team = mongoose.model( 'Team' );

exports.getGamesX = function(req, res) {
    Game
        .aggregate(
            { $group: {
                   _id: "$date",
                   users: { $push: { userid: "$user", score: "$score" } }
                }
            }
         )
        .find()
        .exec(function(err, standings) {
            console.log("exec" +standings.length);
            console.log(standings);
            res.json(standings);
        });
};

exports.getGames = function(req, res) {
    Game
        .find()
        .populate('home', 'name')
        .populate('winner', 'name')
        .populate('away', 'name')
        .exec(function(err, games) {
            if (err) {
                console.log("error" +err);
            } else {
                console.log(games); /*
                var gameArray = [{ date: null, games: {} }];
                games.forEach(function(game) {
                    if (game) {
                        standingArray.push(
                            {
                                matchup: standing.teamID.name,
                                time: standing.win,
                                venue: standing.loss
                            }
                        )
                    }
                    console.log(standingArray);
                }); */
                res.json(createView(games));
            }
        });
};

var createView = function(games) {
    var s = { date: null, games: [] };
    var gameArray = [];
    games.forEach(function(game){
        if ( s.date == null ) { s.date = game.date };

        if ( s.date .getTime() !== game.date.getTime() ) {
            //console.log(s.games);
            gameArray.push({date: s.date, games: s.games});
            s.date = game.date;
            s.games = [];
        };

        var getResults = function() {
            if (game.winner == null) { return null }
            else {
                return game.homeScore.toString() +"-" +game.awayScore.toString() +" " +game.winner.name;
            }
        };

        s.games.push({
            gameID: game._id,
            matchup: game.home.name +" vs " +game.away.name,
            time: game.time,
            venue: game.venue,
            results: getResults()
        });

        console.log(gameArray);
    });

    if ( s.games.length > 0 ) { gameArray.push({date: s.date, games: s.games}) };

    return gameArray;
};

exports.popTeams = function() {
    console.log("pop");
    var tArray = [
        {_id:1, name: "Blue", color:"Blue", hometown:"Southington CT"},
        {_id:2, name: "Gray", color:"Gray", hometown:"West Hartford CT"},
        {_id:3, name: "Black", color:"Black", hometown:"East Hartford CT"},
        {_id:4, name: "Red", color:"Red", hometown:"Rocky Hill CT"},
        {_id:5, name: "White", color:"White", hometown:"Middletown CT"}
    ];

    tArray.forEach(function(t){
        var t2 = new Team(t);
        t2.save(function(err) {
            if (err) { console.log(err); }
        })
    });

}