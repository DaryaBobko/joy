﻿var app = angular.module('DiplomApp', ['ui.router', 'ui.bootstrap', 'ui.select']);

app.config(config);

config.$inject = ['$urlRouterProvider', '$httpProvider'];

function config($urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/");

    $httpProvider.interceptors.push(["$injector", function ($injector) {
        return {
            'request': function (config) {
                if (window.localStorage.getItem('tocken')) {
                    config.headers.tocken = window.localStorage.getItem('tocken');
                }
                return config;
            },
            'response': function (result) {
                var $state = $injector.get('$state');
                if (result.status === 401) {
                    $state.go("auth");
                }
                return result;
            }
    }
    }]);
}

app.run(onRun);
onRun.$inject = ["userService"];
function onRun(userService) {
    userService.getUserInfo();
}

angular.module("DiplomApp")
.config(function ($locationProvider) {
    //$locationProvider.html5Mode(true);
});