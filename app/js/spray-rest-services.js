'use strict';

angular.module('myApp.restServices', ['ngResource'])
    .factory('Players', ['$resource',
        function ($resource) {
            return $resource('/players/:teamID', {});
        }])

    .factory('Schedule', ['$resource',
        function ($resource) {
            return $resource('/schedule', {});
        }])

    .factory('Gamelog', ['$resource',
        function ($resource) {
            return $resource('/gamelog/:gameID', {});
        }])

    .factory('Standing', ['$resource',
        function ($resource) {
            return $resource('/standings', {});
        }])

    .factory('Teams', ['$resource',
        function ($resource) {
            return $resource('http://localhost:8080/teams', {});
        }])

    .factory('Playerstats', ['$resource',
        function ($resource) {
            return $resource('/playerstats/:teamID', {});
        }])

    .factory('Leaders', ['$resource',
        function ($resource) {
            return $resource('/leaders', {});
        }])

    .factory('Games', ['$resource',
        function ($resource) {
            return $resource('/games/:teamID', {});
        }]);
