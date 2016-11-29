'use strict';

var translateModule = require('./module');

translateModule.provider('translateService', function() {
    var defaultLanguage = 'en',
        path = 'languages';

    this.$get = ['$http', '$rootScope', function ($http, $rootScope) {
        var service = {};
        var dictionary,
            currentLanguage;

        service.loadDictionary = function(language) {
            language = language || defaultLanguage;

            if (language == currentLanguage) {
                return;
            }

            dictionary = $http.get(path + '/' + language + '.json').then(
                function (response) {
                    $rootScope.$emit('translateService:loaded');
                    console.log('Json loaded');
                    return response.data;
                },
                function (response) {
                    console.log('Failed to load json file', response);
                    return response;
                }
            );
        };

        service.getDictionary = function () {
            return dictionary;
        };

        return service;
    }];
});