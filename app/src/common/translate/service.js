'use strict';

var translateModule = require('./module');

translateModule.provider('translateService', function() {
    var defaultLanguage = 'en',
        path = 'languages';

    this.$get = ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {
        var service = {};
        var dictionary,
            currentLanguage;

        var aborter = $q.defer();

        service.loadDictionary = function(language) {
            language = language || defaultLanguage;

            if (language == currentLanguage) {
                return;
            }

            aborter.resolve();
            aborter = $q.defer();

            dictionary = $http.get(path + '/' + language + '.json', {timeout: aborter.promise}).then(
                function (response) {
                    currentLanguage = language;
                    // $emit for performance reasons
                    $rootScope.$emit('translateService:loaded');
                    console.log(language, 'Json loaded ' + currentLanguage);
                    return response.data;
                },
                function (response) {
                    console.log(language, 'Failed to load json file', response);
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