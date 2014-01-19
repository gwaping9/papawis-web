'use strict';

(function () {

    var skeds = [
            {
                dayt: "Dec 1, 2013",
                games: [
                    {opponents:"Blue vs Red", results:"51 vs 60", hipts:"Chris Gallares 18pts", hirebs:"Jerry Gomez 12rebs",
                     hiasts:"Reggie Roxas 5asts"},
                    {opponents:"Black vs White", results:"41 vs 48", hipts:"Alfred Javillonar 21pts", hirebs:"Tyler Holcomb 12rebs",
                     hiasts:"Justin Josef 7asts"} 
                ] 
            },
            {
                dayt: "Dec 8, 2013",
                games: [
                    {opponents:"Blue vs Red", results:"51 vs 60", hipts:"Chris Gallares 18pts", hirebs:"Jerry Gomez 12rebs",
                     hiasts:"Reggie Roxas 5asts"},
                    {opponents:"Black vs White", results:"41 vs 48", hipts:"Alfred Javillonar 21pts", hirebs:"Tyler Holcomb 12rebs",
                     hiasts:"Justin Josef 7asts"} 
                ] 
            }
        ];

    var scores = [
            {gameDate: "Dec 1 @4pm", opponent: "Blue", result: "W 50-39"},
            {gameDate: "Dec 8 @5pm", opponent: "Grey", result: "W 55-41"}
        ];

    var stats = [
            {id: 1, number: "9", name: "Bobot DeMatta", points: "10.5", rebounds: "10", assists: "3", steals: "0.5", blocks: "1.5"},
            {id: 2, number: "6", name: "Reggie Roxas", points: "10.5", rebounds: "10", assists: "3", steals: "0.5", blocks: "1.5"},
            {id: 3, number: "14", name: "Chris Gallares", points: "10.5", rebounds: "10", assists: "3", steals: "0.5", blocks: "1.5"},
            {id: 4, number: "7", name: "Jerry Gomez", points: "10.5", rebounds: "10", assists: "3", steals: "0.5", blocks: "1.5"},
            {id: 5, number: "10", name: "Pablo Sarin", points: "10.5", rebounds: "10", assists: "3", steals: "0.5", blocks: "1.5"},
            {id: 7, number: "21", name: "Francis Malabanan", points: "10.5", rebounds: "10", assists: "3", steals: "0.5", blocks: "1.5"}
        ];

    var players = [
            {id: 1, number: "9", name: "Bobot DeMatta", position: "C", age: "41", height: "5-10", hometown: "Rocky Hill CT"},
            {id: 2, number: "6", name: "Reggie Roxas", position: "SG/SF", age: "41", height: "5-8", hometown: "Middletown CT"},
            {id: 3, number: "14", name: "Chris Gallares", position: "PG/SG", age: "43", height: "5-9", hometown: "Wethersfield CT"},
            {id: 4, number: "7", name: "Jerry Gomez", position: "PF", age: "35", height: "5-9", hometown: "Wallingford CT"},
            {id: 5, number: "10", name: "Pablo Sarin", position: "PG", age: "42", height: "5-6", hometown: "South Windsor CT"},
            {id: 6, number: "11", name: "Jojo Ruiz", position: "SG", age: "42", height: "5-7", hometown: "South Windsor"},
            {id: 7, number: "21", name: "Francis Malabanan", position: "SF", age: "39", height: "5-7", hometown: "Rocky Hill CT"}
        ],

        findById = function (id) {
            var player = null,
                l = players.length,
                i;
            for (i = 0; i < l; i = i + 1) {
                if (players[i].id === id) {
                    player = players[i];
                    break;
                }
            }
            return employee;
        };


    angular.module('myApp.services', [])
        .factory('Team', [
            function () {
                return {
                    getPlayers: function () {
                        return players;
                    },
                    getStats: function () {
                        return stats;
                    },
                    getScores: function () {
                        return scores;
                    },
                    get: function (player) {
                        return findById(parseInt(player.playerId));
                    }
                }

            }])
            .factory('Sked', [
            function () {
                return {
                    getSked: function () {
                        return skeds;
                    },
                    get: function (player) {
                        return findById(parseInt(player.playerId));
                    }
                }

            }])
            .factory('Report', [
            function () {
                return {
                    query: function (player) {
                        return findByManager(parseInt(player.playerId));
                    }
                }

            }]);

}());