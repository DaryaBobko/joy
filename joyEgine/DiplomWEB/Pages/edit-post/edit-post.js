/// <reference path="Main.html" />
(function () {
    "use strict";
    angular
        .module("DiplomApp")
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("edit-post", {
                url: "/edit-post/:id",
                templateUrl: "/Pages/edit-post/edit-post.tmpl.html",
                controller: "EditPostController as vm"
            });
    }
})();
