'use strict';

require('./main.styl');

var module = require('../../module');

module.component('mainLayout', {
    template: require('./main.html'),
    controller: ['currentUserService', mainLayoutCtrl],
});

function mainLayoutCtrl(currentUserService) {
    var ctrl = this;

    ctrl.logout = function () {
        currentUserService.logout();
    };
}