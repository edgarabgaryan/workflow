'use strict';

var translateModule = require('./module');

translateModule.directive('t', ['$rootScope', 'translateService', function ($rootScope, translateService) {
    return {
        restrict: 'A',
        template: '{{value}}',
        scope: {
            t: '@',
        },
        link: function (scope) {
            function setValue() {
                var dictionary = translateService.getDictionary();

                if (dictionary && dictionary[scope.t]) {
                    scope.value = dictionary[scope.t];
                } else {
                    scope.value = scope.t;
                }
            }
            setValue();
            $rootScope.$on('translateService:loaded', setValue);
        },
    };
}]);