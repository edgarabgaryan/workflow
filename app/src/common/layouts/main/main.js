'use strict';

require('./main.styl');

var module = require('../../module');

module.component('mainLayout', {
    template: require('./main.html'),
    controller: mainLayoutCtrl,
});

function mainLayoutCtrl(currentUserService) {
    var ctrl = this;

    ctrl.user;
    currentUserService.get().then(function (user) {
        ctrl.user = user;
    });


    ctrl.logout = function () {
        currentUserService.logout();
    };
}