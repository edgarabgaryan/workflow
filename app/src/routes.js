'use strict';

module.exports =  routes;

function routes ($stateProvider, $urlRouterProvider) {
    "ngInject";
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
            resolve: {
                security: ['securityService', function (securityService) {
                    return securityService.check(securityService.AUTHED);
                }],
            },
        })
        .state('page1', {
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
            resolve: {
                security: ['securityService', function (securityService) {
                    return securityService.check(securityService.UNAUTHED);
                }],
            },
        })
        .state('404', {
            url: '*path',
            template: '<div id="page404">404</div>',
        })
    ;
}