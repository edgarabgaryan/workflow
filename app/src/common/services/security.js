'use strict';

var module = require('../module');

module.service('securityService', securityService);

function securityService ($state, $q, currentUserService) {
    var service = this;

    service.UNAUTHED = 0;
    service.AUTHED = 1;
    // add some roles
    // service.ADMIN = 2;

    service.check = function (need) {
        var auth = currentUserService.isAuthenticated() ? 1 : 0;

        if (auth == need) {
            return;
        }

        switch (need) {
            case service.UNAUTHED:
                if (!$state.router.globals.current.name) {
                    $state.go('page1'); // home page
                } else {
                    $state.go($state.router.globals.current.name); // prevent url changing
                    return $q.reject(); // prevent router changing
                }
                break;
            case service.AUTHED:
                $state.go('login');
                break;
        }
    }
}