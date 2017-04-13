/// <reference path="Main.html" />
(function () {
    "use strict";
    angular
        .module("DiplomApp")
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("add-post", {
                url: "/add-post",
                templateUrl: "/Pages/user-profile/add-post/add-post.tmpl.html",
                controller: "AddPostController as vm"
            });
    }
})();
