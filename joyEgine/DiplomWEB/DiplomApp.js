var app = angular.module('DiplomApp', ['ui.router', 'ui.bootstrap', 'ui.select']);

app.config(config);

config.$inject = ['$urlRouterProvider', '$httpProvider'];

function config($urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise("/main");

    $httpProvider.interceptors.push([ function () {
        return {
            'request': function (config) {
                if (window.localStorage.getItem('tocken')) {
                    config.headers.tocken = window.localStorage.getItem('tocken');
                }
                return config;
            },
            'response': function(result) {
                if (result.status === 401) {
                    //$state.go("auth");
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

angular.module('DiplomApp').controller('AppController', appController);


function appController() {
    var vm = this;
    vm.test = "asd";

    vm.a = [1, 2, 3, 4, 5];
}