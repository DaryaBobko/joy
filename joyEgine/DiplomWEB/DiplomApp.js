var app = angular.module('DiplomApp', ['ui.router']);

app.config(config);

config.$inject = ['$urlRouterProvider'];

function config($urlRouterProvider) {
    $urlRouterProvider.otherwise("/main");
}

angular.module('DiplomApp').controller('AppController', appController);


function appController() {
    var vm = this;
    vm.test = "asd";

    vm.a = [1, 2, 3, 4, 5];
}