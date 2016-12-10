'use strict';

var angular = require('angular');
require('angular-ui-router');
require('lodash');

var dreamTeam = angular.module('dreamTeam', [
    'ui.router',
    require('./pages'),
    require('./common'),
]);

dreamTeam.config(require('./routes'));

dreamTeam.config(['translateServiceProvider', function (translateServiceProvider) {
    translateServiceProvider.setDefaultLanguage('ru');
}]);

dreamTeam.run(['$transitions', '$state', 'currentUserService', function ($transitions, $state, currentUserService) {
    var unAuthStates = ['login'];
    $transitions.onBefore(null, function (transition) {
        var redirect,
            fromPath = transition.router.globals.current.name,
            toAuthType = !!~unAuthStates.indexOf(transition.targetState().name()),
            fromAuthType = fromPath ? !!~unAuthStates.indexOf(fromPath) : true,
            isAuthenticated = currentUserService.isAuthenticated();

        if (!isAuthenticated && !toAuthType) {
            redirect = 'login';
        }

        if (isAuthenticated && toAuthType) {
            redirect = fromPath;
        }

        if (isAuthenticated && toAuthType && fromAuthType) {
            redirect = 'page1';
        }

        if (redirect) {
            $state.go(redirect);
        }
    });
}]);

require('./bootstrap');