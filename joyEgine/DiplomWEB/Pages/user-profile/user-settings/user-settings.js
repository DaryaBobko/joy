/// <reference path="Main.html" />
(function () {
    "use strict";
    angular
        .module("DiplomApp")
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("user-settings", {
                url: "/user-settings",
                templateUrl: "/Pages/user-profile/user-settings/user-settings.tmpl.html",
                controller: "UserSettingsController as vm"
            });
    }
})();
