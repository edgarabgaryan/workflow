'use strict';

require('./login.styl');

var module = require('../../module');

module.component('loginComponent', {
    template: require('./login.html'),
    controller: loginCtrl,
});

function loginCtrl($state, currentUserService) {
    var ctrl = this;

    ctrl.errors;

    ctrl.submit = function () {
        currentUserService.login(ctrl.username, ctrl.password, ctrl.remember).then(
            function (result) {
                $state.go('page1');
            }, function (errors) {
                ctrl.errors = errors;
            }
        )
    };
}