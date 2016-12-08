'use strict';

require('./main.styl');

var module = require('../../module');

module.component('mainLayout', {
    template: require('./main.html'),
    controller: [mainLayoutCtrl],
});

function mainLayoutCtrl() {
    var ctrl = this;

}