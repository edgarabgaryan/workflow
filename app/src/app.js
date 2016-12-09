'use strict';

var angular = require('angular');
require('angular-ui-router');
require('lodash');

var dreamTeam = angular.module('dreamTeam', [
    'ui.router',
    require('./pages'),
    require('./common'),
]);

dreamTeam.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path();
        if (path === '/' || path === '') {
            return '/page1';
        }
    });

    // always resolve translateService
    var originalState = $stateProvider.state;
    $stateProvider.state = function (name, params) {
        params = params || {};
        params.resolve = params.resolve || {};
        params.dictionaryLoading = ['translateService', function (translateService) {
            return translateService.loadDictionary();
        }];

        return originalState.call(this, name, params);
    };


    $stateProvider
        .state('main', {
            component: 'mainLayout',
        }).state('page1', {
            parent: 'main',
            url: '/page1',
            component: 'page1Component',
        })
        .state('page2', {
            parent: 'main',
            url: '/page2',
            component: 'page2Component',
        })
        .state('login', {
            url: '/login',
            component: 'loginComponent',
        })
        .state('404', {
            url: '*path',
            template: '<div id="page404">404</div>',
        })
    ;
}]);

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

// bootstrap
{
    document.addEventListener("DOMContentLoaded", function bootstrapApp(event) { // ie9+
        // console.log("DOM fully loaded and parsed");
        angular.bootstrap(document, ['dreamTeam']);
        document.removeEventListener("DOMContentLoaded", bootstrapApp);
    });
// angular.element(document).ready(function () {
//     console.log("DOM fully loaded and parsed");
//     angular.bootstrap(document, ['dreamTeam']);
// });

// angular.element(function() {
//     console.log("DOM fully loaded and parsed");
//     angular.bootstrap(document, ['dreamTeam']);
// });
}