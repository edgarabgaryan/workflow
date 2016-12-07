'use strict';

var module = require('../module');

module.service('currentUserService', [currentUserService]);

function currentUserService () {
    var service = this;

    service.get = function () {
    };
}