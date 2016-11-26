'use strict';

var module = require('../module');

module.component('page2Component', {
    templateUrl: 'src/pages/page2/page2.html',
    controller: [page2Ctrl],
});

function page2Ctrl() {
    var ctrl = this;

    console.log('page 2 ctrl');
}