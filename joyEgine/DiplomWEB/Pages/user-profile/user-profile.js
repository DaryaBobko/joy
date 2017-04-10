/// <reference path="Main.html" />
(function () {
    "use strict";
    angular
        .module("DiplomApp")
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("user-profile", {
                url: "/user-profile",
                templateUrl: "/Pages/user-profile/user-profile.tmpl.html",
                controller: "UserProfileController as vm"
            });
    }
})();
