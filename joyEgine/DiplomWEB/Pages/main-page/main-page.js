/// <reference path="Main.html" />
(function () {
    "use strict";
    angular
        .module("DiplomApp")
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("main", {
                url: "/main",
                templateUrl: "/Pages/main-page/main.tmpl.html",
                controller: "MainController as vm"
            });
    }
})();
