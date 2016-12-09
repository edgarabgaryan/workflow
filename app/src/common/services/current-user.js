'use strict';

var module = require('../module');

module.service('currentUserService', ['$q', '$state', 'databaseService', currentUserService]);

function currentUserService ($q, $state, databaseService) {
    var service = this;

    var currentUser;

    service.login = function (username, password) {
        return databaseService.getUsers().then(
            function (users) {
                var user = _.find(users, {login: {username: username}});

                if (!user) {
                    return $q.reject({username: ['No such user']});
                }

                if (user.login.password !== password) {
                    return $q.reject({password: ['Wrong password']});
                }

                localStorage.setItem('currentUsername', user.login.username);
                return currentUser = user;
            }, function () {
                return {errors: ['Failed to authenticate. Try later please']}
            }
        );
    };

    service.logout = function () {
        localStorage.removeItem('currentUsername');
        currentUser = null;
        $state.go('login');
    };

    service.isAuthenticated = function () {
        return !!localStorage.getItem('currentUsername');
    };

    service.get = function () {
    };
}