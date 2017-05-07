var app = angular.module('DiplomApp', ['ui.router', 'ui.bootstrap', 'ui.select']);

app.config(config);

config.$inject = ['$urlRouterProvider', '$httpProvider'];

function config($urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/main");

    $httpProvider.interceptors.push(function() {
        return {
            'request': function(config) {
                console.log(config);
                return config;
            }
        }
    });
}

angular.module('DiplomApp').controller('AppController', appController);


function appController() {
    var vm = this;
    vm.test = "asd";

    vm.a = [1, 2, 3, 4, 5];
}