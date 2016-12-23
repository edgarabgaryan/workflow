'use strict';

require('./page2.styl');

var pagesModule = require('../module');

pagesModule.component('page2Component', {
    template: require('./page2.html'),
    controller: page2Ctrl,
});

function page2Ctrl() {
    var ctrl = this;

    ctrl.src = './assets/pages/page2/st.png';
    console.log('page 2 ctrl');
}