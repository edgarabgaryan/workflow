'use strict';

var translateModule = require('./module');

translateModule.directive('t', function ($rootScope, translateService) {
    return {
        restrict: 'A',
        template: '{{value}}',
        scope: {
            t: '@',
            tValues: '<',
        },
        link: function (scope) {
            function setValue() {
                scope.value = translateService.getValue(scope.t, scope.tValues);
            }
            setValue();
            var removeListener = $rootScope.$on('translateService:loaded', setValue);

            scope.$watch('tValues', setValue);

            scope.$on('$destroy', function() {
                removeListener();
            });
        },
    };
});