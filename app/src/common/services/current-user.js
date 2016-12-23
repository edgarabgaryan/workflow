'use strict';

var module = require('../module');

module.service('currentUserService', currentUserService);

function currentUserService ($q, $state, databaseService) {
    var service = this;

    var currentUser;

    service.login = function (username, password, remember) {
        return databaseService.getUsers().then(
            function (users) {
                var user = _.find(users, {login: {username: username}});

                if (!user) {
                    return $q.reject({username: ['No such user']});
                }

                if (user.login.password !== password) {
                    return $q.reject({password: ['Wrong password']});
                }

                if (remember) {
                    localStorage.setItem('currentUsername', user.login.username);
                }

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
        return !!currentUser || !!localStorage.getItem('currentUsername');
    };

    service.get = function () {
        if (currentUser) {
            return $q.when(currentUser);
        }

        if (localStorage.getItem('currentUsername')) {
            return databaseService.getUsers().then(
                function (users) {
                    currentUser = _.find(users, {login: {username: localStorage.getItem('currentUsername')}});

                    if (currentUser) {
                        return currentUser;
                    }

                    localStorage.removeItem('currentUsername');
                    return $q.reject();
                }
            );
        }

        return $q.reject();
    };
}