/**
 * Created by eddematta on 1/1/14.
 */
// Bring Mongoose into the project
var mongoose = require( 'mongoose' );

// Build the connection string
//var dbURI = 'mongodb://localhost/papawis';
var dbHost = 'ds061318.mongolab.com';
var dbURI = process.env.MONGOLAB_URI;
//'mongodb://mongodb://localhost/papawis';

// Create the database connection
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through app termination');
        process.exit(0);
    });
});

/* ********************************************
 SCHEMAs
 ******************************************** */

var standingSchema = new mongoose.Schema({
    leagueID: String,
    teamID: {type: Number, ref: 'Team'},
    win: Number,
    loss: Number,
    rank: Number
});

mongoose.model('Standing', standingSchema);

var gameSchema = new mongoose.Schema({
    _id: Number,
    date: Date,
    time: String,
    home: {type: Number, ref: 'Team'},
    away: {type: Number, ref: 'Team'},
    homeScore: Number,
    awayScore: Number,
    winner: {type: Number, ref: 'Team'},
    venue: String,
    completed: String
});

mongoose.model('Game', gameSchema);

var gamelogSchema = new mongoose.Schema({
    _id: Number,
    leagueID: String,
    date: Date,
    playerID: String,
    teamID: {type: Number, ref: 'Team'},
    points: Number,
    rebounds: Number,
    assists: Number,
    blocks: Number,
    steals: Number,
    played: String

});

mongoose.model('Gamelog', gamelogSchema);

//Player Model

var playerSchema = new mongoose.Schema({
    _id: String,
    name: String,
    number: Number,
    position: String,
    height: String,
    age: Number,
    points: Number,
    rebounds: Number,
    assists: Number,
    blocks: Number,
    steals: Number,
    totalPoints: Number,
    totalRebounds: Number,
    totalAssists: Number,
    totalBlocks: Number,
    totalSteals: Number,
    gamesPlayed: Number

});

mongoose.model('Player', playerSchema);

var playerStatSchema = new mongoose.Schema({
    playerID: {type: String, ref: 'Player'},
    leagueID: String,
    teamID: Number,
    points: Number,
    rebounds: Number,
    assists: Number,
    blocks: Number,
    steals: Number,
    gamesPlayed: Number

});

mongoose.model('Playerstat', playerStatSchema);

//Team Model

var teamSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    color: String,
    hometown: String
});

mongoose.model('Team', teamSchema );

var teamStatSchema = new mongoose.Schema({
    leagueID: String,
    teamid: Number,
    gamesPlayed: Number,
    points: Number,
    rebounds: Number,
    assists: Number,
    blocks: Number,
    steals: Number,
    pointsAllowed: Number,
    diff: Number,
    ppg: Number,
    papg: Number
});

mongoose.model('Teamstat', teamStatSchema);

var rostersSchema = new mongoose.Schema({
    leagueID: String,
    teamID: {type: Number, ref: 'Team'},
    playerID: {type: String, ref: 'Player'}
});

mongoose.model('Roster', rostersSchema);