/// <reference path="Main.html" />
(function () {
    "use strict";
    angular
        .module("DiplomApp")
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("auth", {
                url: "/auth",
                templateUrl: "/Pages/auth-user/auth-user.tmpl.html",
                controller: "AuthUserController as vm"
            });
    }
})();
