'use strict';

require('./main.styl');

var module = require('../../module');

module.component('mainLayout', {
    template: require('./main.html'),
    controller: mainLayoutCtrl,
});

function mainLayoutCtrl(currentUserService) {
    var ctrl = this;

    currentUserService.get().then(
        function (user) {
            ctrl.user = user;
            console.log(1, user);
        }, function (reason) {
            console.log(2, reason);
        }
    );


    ctrl.logout = function () {
        currentUserService.logout();
    };
}