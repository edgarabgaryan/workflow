'use strict';

require('./login.styl');

var module = require('../../module');

module.component('loginComponent', {
    template: require('./login.html'),
    controller: [loginCtrl],
});

function loginCtrl() {
    var ctrl = this;

    ctrl.submit = function () {
        console.log('submit');
    };
}