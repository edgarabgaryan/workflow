var dreamTeam = angular.module('dreamTeam', ['ui.router']);

dreamTeam.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule( function ($injector, $location) {
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

document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM fully loaded and parsed");
    angular.bootstrap(document, ['dreamTeam']);
});
