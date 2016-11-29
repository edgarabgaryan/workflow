'use strict';

var angular = require('angular');
require('angular-ui-router');

var dreamTeam = angular.module('dreamTeam', [
    'ui.router',
    require('./pages'),
    require('./common/translate'),
]);

dreamTeam.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
        var path = $location.path();
        if (path === '/' || path === '') {
            return '/page1';
        }
    });
    $stateProvider.state('page1', {
        url: '/page1',
        component: 'page1Component',
    })
    .state('page2', {
        url: '/page2',
        component: 'page2Component',
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