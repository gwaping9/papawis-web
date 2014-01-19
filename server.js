var express = require('express'),
    db = require('./model/db'),
    standings = require('./routes/standings'),
    schedule = require('./routes/schedule'),
    teams = require('./routes/teams'),
    gamelog = require('./routes/gamelog'),
    roster = require('./routes/roster'),
    playerstats = require('./routes/playerstats'),
    path = require('path');


var app = express();
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, '/app')));

app.get('/standings', standings.getStandings);
app.get('/schedule', schedule.getGames);
app.get('/teams', teams.getTeams);
app.get('/gamelog/:gameID', gamelog.getGamelogs);
app.get('/players/:teamID', roster.getPlayers);
app.get('/playerstats/:teamID', playerstats.getPlayerStats);

app.listen(3000);
console.log('Listening on port 3000...');