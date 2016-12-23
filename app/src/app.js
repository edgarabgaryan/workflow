'use strict';

var angular = require('angular');
require('angular-ui-router');
require('lodash');

var dreamTeam = angular.module('dreamTeam', [
    'ui.router',
    require('./pages'),
    require('./common'),
]);

dreamTeam.config(require('./routes'));

dreamTeam.config(['translateServiceProvider', function (translateServiceProvider) {
    translateServiceProvider.setDefaultLanguage('ru');
}]);

require('./bootstrap');