'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', [
  'ngRoute',
  'ui.bootstrap',
  'myApp.filters',
  'myApp.restServices',
  'myApp.directives',
  'myApp.controllers'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'HomeCtrl'})
  $routeProvider.when('/standings', {templateUrl: 'partials/standings.html', controller: 'StandingsCtrl'});
  $routeProvider.when('/schedule/:gameType', {templateUrl: 'partials/schedule.html', controller: 'ScheduleCtrl'});
  $routeProvider.when('/teams', {templateUrl: 'partials/teams.html', controller: 'TeamsCtrl'});
  $routeProvider.when('/players/:teamID', {templateUrl: 'partials/roster.html', controller: 'PlayersCtrl'});
  $routeProvider.when('/playerstats/:teamID', {templateUrl: 'partials/playerstats.html', controller: 'PlayerStatsCtrl'});
  $routeProvider.when('/games/:teamID', {templateUrl: 'partials/roster.html', controller: 'GamesCtrl'});
  $routeProvider.when('/gamelog/:gameID', {templateUrl: 'partials/gamelog.html', controller: 'GameLogCtrl'});
  $routeProvider.when('/leaders', {templateUrl: 'partials/leaders.html', controller: 'LeadersCtrl'});
  $routeProvider.otherwise({redirectTo: '/home'});
}]);
