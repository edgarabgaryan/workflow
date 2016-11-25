'use strict';

var dreamTeam = require('../module');

dreamTeam.component('page1Component', {
    templateUrl: 'src/pages/page1/page1.html',
    controller: [page1Ctrl],
});

function page1Ctrl() {
    var ctrl = this;

    console.log('page 1 ctrl');
}