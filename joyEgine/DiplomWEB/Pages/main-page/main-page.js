﻿/// <reference path="Main.html" />
(function () {
    "use strict";
    angular
        .module("DiplomApp")
        .config(config);

    config.$inject = ["$stateProvider"];

    function config($stateProvider) {
        $stateProvider
            .state("main", {
                url: "/?:SearchText&:TagId&:DisplayType",
                templateUrl: "/Pages/main-page/main.tmpl.html",
                controller: "MainController as vm",
                //params: {
                //    'SearchText': {
                //        squash: true
                //    },
                //    'TagId': {
                //        squash: true
                //    },
                //    'DisplayType': {
                //        squash: true
                //    }
                //}
            });
    }
})();
