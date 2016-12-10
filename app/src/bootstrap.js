'use strict';

document.addEventListener("DOMContentLoaded", function bootstrapApp(event) { // ie9+
    // console.log("DOM fully loaded and parsed");
    angular.bootstrap(document, ['dreamTeam']);
    document.removeEventListener("DOMContentLoaded", bootstrapApp);
});
// angular.element(document).ready(function () {
//     console.log("DOM fully loaded and parsed");
//     angular.bootstrap(document, ['dreamTeam']);
// });