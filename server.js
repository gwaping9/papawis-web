var express = require('express'),
    db = require('./model/db'),
    standings = require('./routes/standings'),
    schedule = require('./routes/schedule'),
    teams = require('./routes/teams'),
    gamelog = require('./routes/gamelog'),
    roster = require('./routes/roster'),
    playerstats = require('./routes/playerstats'),
    leaders = require('./routes/leaders'),
    path = require('path');


var app = express();
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, '/app')));

app.get('/standings', standings.getStandings);
app.get('/schedule/:gameType', schedule.getGames);
app.get('/teams', teams.getTeams);
app.get('/gamelog/:gameID', gamelog.getGamelogs);
app.get('/players/:teamID', roster.getPlayers);
app.get('/playerstats/:teamID', playerstats.getPlayerStats);
app.get('/leaders', leaders.getPlayerPts);

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});