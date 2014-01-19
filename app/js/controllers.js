'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('HomeCtrl', ['$scope' ,function($scope) {

    $scope.slides = [];
    $scope.slides.push({image: 'img/slide-1.jpg'});
    $scope.slides.push({image: 'img/slide-2.jpg'});
    $scope.slides.push({image: 'img/slide-3.jpg'});

  }])
  .controller('ScheduleCtrl', ['$scope', 'Schedule', function($scope, Schedule) {
      console.log("Schedule");
      $scope.schedule = Schedule.query();
  }])
  .controller('GameLogCtrl', ['$scope', '$routeParams', 'Gamelog', function($scope, $routeParams, Gamelog) {
    console.log("Gamelog");
    $scope.gamelog = Gamelog.query({gameID: $routeParams.gameID});
      
    $scope.predicate = 'points';
    $scope.reverse = true;

  }])
  .controller('StandingsCtrl', ['$scope', 'Standing', function($scope, Standing) {
    console.log("Standings");
    $scope.standings = Standing.query();

  }])
  .controller('PlayersCtrl', ['$scope', '$routeParams', 'Players', function($scope, $routeParams, Players) {
    console.log("Players");
    $scope.players = Players.query({teamID: $routeParams.teamID});

  }])
  .controller('PlayerStatsCtrl', ['$scope', '$routeParams', 'Playerstats', function($scope, $routeParams, Playerstats) {
    console.log("Playerstats");
    $scope.playerstats = Playerstats.query({teamID: $routeParams.teamID});

    $scope.avgPoints = function(player) {
      switch($scope.klik) {
        case "pts":
          return player.points / player.gamesPlayed;
        case "reb":
          console.log("reb"); 
          return player.rebounds / player.gamesPlayed;
        case "ast":
          return player.assists / player.gamesPlayed;
        case "blk":
          return player.blocks / player.gamesPlayed;
        case "stl":
          return player.steals / player.gamesPlayed;
        default:
          return player.points / player.gamesPlayed;

      }
    }

    $scope.predicate = $scope.avgPoints;
    $scope.reverse = true;
    $scope.klik = "pts";
  }])
  .controller('StCtrl', ['$scope',  function($scope) {
    console.log("StCtrl");
    $scope.predicate = 'win';
    $scope.reverse = true;

  }])
  .controller('TeamsCtrl', ['$scope', 'Teams',  function($scope, Teams) {
  	console.log("Team");
  	$scope.teams = Teams.query();
 
  }]);