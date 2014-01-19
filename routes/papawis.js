/**
 * Created by eddematta on 12/24/13.
 */
/**
 * Created by eddematta on 12/18/13.
 */
var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('papawis', server, {safe: true});

db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'papawis' database");
    }
});

exports.getPlayers = function(req, res) {
    db.collection('players', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.gamesByTeam = function(req, res) {
    db.collection('games', function(err, collection) {
        collection.find().forEach(function(games) {
            console.log("game date: " +games.date);
        });
    }); 
};

exports.findByTeam = function(req, res) {
    console.log("findByTeam");
    var teamID = parseInt(req.params.teamID);
    console.log("teamID: " +teamID);
    db.collection('players', function(err, collection) {
        collection.find({team: teamID}).toArray(function(err, items) {
            console.log("number of players: " +items.length);
            res.send(items);
        });
    });

};

exports.getTeams = function(req, res) {
    db.collection('teams', function(err, collection) {
        collection.find().sort({date: 1}).toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.getSkeds = function(req, res) {
    console.log("getSkeds");
    db.collection('games', function(err, collection) {
        collection.find().toArray(function(err, items) {
            items.forEach(function(game){
                getTeamName(game.home);
            });
            res.send(items);
        });
    });
};

exports.getStats = function(req, res) {
    db.collection('stats', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

var getTeamName = function(teamID) {
  db.collection('Team',function(err, coll){
      coll.findOne({id: parseInt(teamID)}, function(err, team){
          if (err) {console.log(err)} else {
              console.log(team.name);
          }
      });
  })
};
/*
exports.getStandings = function(req, res) {
    db.collection('Standings', function(err, collection) {
        var result = [];
        collection.find().each(function(err, items) {
            result.push({
               name:
            });
        });
    });
};*/
