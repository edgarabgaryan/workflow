'use strict';

var translateModule = require('./../module');

translateModule.component('translateSwitcher', {
    template: require('./switcher.html'),
    controller: switcherCtrl,
});

function switcherCtrl ($rootScope, translateService) {
    var ctrl = this;

    ctrl.language = translateService.getCurrentLanguage();
    var removeListener = $rootScope.$on('translateService:loaded', function () {
        ctrl.language = translateService.getCurrentLanguage();
        removeListener();
    });

    ctrl.switchLanguage = function () {
        translateService.loadDictionary(ctrl.language);
    };
}