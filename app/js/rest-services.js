'use strict';

angular.module('myApp.restServices', ['ngResource'])
    .factory('Players', ['$resource',
        function ($resource) {
            return $resource('http://localhost:3000/players/:teamID', {});
        }])

    .factory('Schedule', ['$resource',
        function ($resource) {
            return $resource('http://localhost:3000/schedule', {});
        }])

    .factory('Gamelog', ['$resource',
        function ($resource) {
            return $resource('http://localhost:3000/gamelog/:gameID', {});
        }])

    .factory('Standing', ['$resource',
        function ($resource) {
            return $resource('http://localhost:3000/standings', {});
        }])

    .factory('Teams', ['$resource',
        function ($resource) {
            return $resource('http://localhost:3000/teams', {});
        }])

    .factory('Playerstats', ['$resource',
        function ($resource) {
            return $resource('http://localhost:3000/playerstats/:teamID', {});
        }])

    .factory('Games', ['$resource',
        function ($resource) {
            return $resource('http://localhost:3000/games/:teamID', {});
        }]);
