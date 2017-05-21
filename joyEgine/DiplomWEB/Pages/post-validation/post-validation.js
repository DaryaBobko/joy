/// <reference path="Main.html" />
(function () {
    "use strict";
    angular
        .module("DiplomApp")
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("post-validation", {
                url: "/post-validation/:id",
                templateUrl: "/Pages/post-validation/post-validation.tmpl.html",
                controller: "PostValidationController as vm"
            });
    }
})();
