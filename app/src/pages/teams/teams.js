'use strict';

require('./teams.styl');

var pagesModule = require('../module');

pagesModule.component('teamsPageComponent', {
    template: require('./teams.html'),
    controller: teamsPageCtrl,
    bindings: {
        teams: '<',
    }
});

function teamsPageCtrl() {
    var ctrl = this;

    console.log(ctrl.teams);
}
