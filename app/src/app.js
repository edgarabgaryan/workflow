'use strict';

var angular = require('angular');
require('angular-ui-router');

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

dreamTeam.run(['databaseService', function (databaseService) {
    databaseService.getUsers().then(
        function (users) {
            console.log(users);
        }, function (error) {
            console.log(error);
        }
    );
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