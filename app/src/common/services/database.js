'use strict';

var module = require('../module');

module.service('databaseService', databaseService);

function databaseService ($http, $q) {
    var service = this;

    var users;

    service.getUsers = function () {
        if (users)  {
            return $q.when(users);
        }

        var deferred = $q.defer();
        // if (localStorage in window)
        var usersStr = localStorage.getItem('db-users');

        if (usersStr) {
            try {
                users = JSON.parse(usersStr, function(key, value) {
                    if (key == 'registered') {
                        return new Date(value);
                    }
                    return value;
                });

                deferred.resolve(users);
            } catch (error) {
                localStorage.removeItem('db-users');
            }
        }

        if (!users) {
            $http.get('database/users.json').then(
                function (response) {
                    users = response.data;
                    localStorage.setItem('db-users', JSON.stringify(users));
                    deferred.resolve(users);
                },
                function (response) {
                    deferred.reject(response);
                }
            );
        }

        return deferred.promise;
    }
}