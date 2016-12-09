'use strict';

require('./login.styl');

var module = require('../../module');

module.component('loginComponent', {
    template: require('./login.html'),
    controller: ['$state', 'currentUserService', loginCtrl],
});

function loginCtrl($state, currentUserService) {
    var ctrl = this;

    ctrl.submit = function () {
        currentUserService.login(ctrl.username, ctrl.password).then(
            function (result) {
                console.log(1, result);
                $state.go('page1');
            }, function (error) {
                console.log(2, error);
            }
        )
    };
}