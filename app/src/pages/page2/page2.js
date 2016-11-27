'use strict';

require('./page2.css');

var pagesModule = require('../module');

pagesModule.component('page2Component', {
    template: require('./page2.html'),
    controller: [page2Ctrl],
});

function page2Ctrl() {
    var ctrl = this;

    console.log('page 2 ctrl');
}