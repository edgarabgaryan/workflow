'use strict';

var module = require('../module');

module.service('databaseService', databaseService);

function databaseService ($http, $q) {
    var service = this;

    var entities = {
        users: null,
    };

    // shortcuts for 'get'. It is a way to remove old method 'getUsers' and add method common 'get'
    // by refactoring only this file. Old calls of databaseService.getUsers works in same way
    service.getUsers = function () {
        return service.get('users')
    };
    service.getTeams = function () {
        return service.get('teams')
    };

    service.get = function (entitiesName) {
        if (entities[entitiesName])  {
            return $q.when(entities[entitiesName]);
        }

        var deferred = $q.defer();
        // if (localStorage in window)
        var asJson = localStorage.getItem('db-' + entitiesName);

        if (asJson) {
            try {
                entities[entitiesName] = JSON.parse(asJson, function(key, value) {
                    if (key == 'registered') {
                        return new Date(value);
                    }
                    return value;
                });

                deferred.resolve(entities[entitiesName]);
            } catch (error) {
                localStorage.removeItem('db-' + entitiesName);
            }
        }

        if (!entities[entitiesName]) {
            $http.get('database/' + entitiesName + '.json').then(
                function (response) {
                    entities[entitiesName] = response.data;
                    localStorage.setItem('db-' + entitiesName, JSON.stringify(entities[entitiesName]));
                    deferred.resolve(entities[entitiesName]);
                },
                function (response) {
                    deferred.reject(response);
                }
            );
        }

        return deferred.promise;
    }
}