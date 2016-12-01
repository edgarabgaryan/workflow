'use strict';

var translateModule = require('./module');

translateModule.provider('translateService', [function() {
    var defaultLanguage = 'en',
        path = 'languages',
        init;

    this.setDefaultLanguage = function (language) {
        defaultLanguage = language;
    };

    this.setPathToLocals = function (thePath) {
        path = thePath;
    };

    this.$get = ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {
        var service = {};
        var dictionary,
            currentLanguage,
            loadingLanguage;

        var aborter = $q.defer();

        service.loadDictionary = function(language) {
            init = true;
            language = language || defaultLanguage;

            if (language == loadingLanguage) {
                return;
            }
            loadingLanguage = language;

            aborter.resolve();
            aborter = $q.defer();

            $http.get(path + '/' + language + '.json', {timeout: aborter.promise}).then(
                function (response) {
                    currentLanguage = language;
                    dictionary = response.data;
                    // $emit for performance reasons
                    $rootScope.$emit('translateService:loaded');
                    return response;
                },
                function (response) {
                    console.log(language, 'Failed to load json file', response);
                    return response;
                }
            );
        };

        service.getDictionary = function () {
            if (!init) {
                service.loadDictionary();
            }
            return dictionary;
        };

        service.getValue = function (key, variables) {
            service.getDictionary();
            var result;
            if (dictionary && dictionary[key]) {
                result = dictionary[key];
                if (variables) {
                    try {
                        var variablesObjet = JSON.parse(variables);
                        angular.forEach(variablesObjet, function (value, key) {
                            result = result.replace(new RegExp('{{' + key + '}}', 'g'), value);
                        });
                    } catch (r) {
                        console.log('Failed to parse translate variables: "' + variables + '"');
                        return key;
                    }
                }
            } else {
                result = key;
            }
            
            return result;
        };

        return service;
    }];
}]);