'use strict';

var translateModule = require('./module');

translateModule.directive('t', ['$rootScope', 'translateService', function ($rootScope, translateService) {
    return {
        restrict: 'A',
        template: '{{value}}',
        scope: {
            t: '@',
        },
        link: function (scope, elem, attrs) {
            function setValue() {
                scope.value = translateService.getValue(scope.t, attrs.tValues);
            }
            setValue();
            $rootScope.$on('translateService:loaded', setValue);
        },
    };
}]);