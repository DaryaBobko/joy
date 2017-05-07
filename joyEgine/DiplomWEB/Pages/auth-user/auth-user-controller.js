angular.module("DiplomApp").controller("AuthUserController", AuthUserController);

AuthUserController.$inject = ["$scope", "$http", "userService", "$window"];

function AuthUserController($scope, $http, userService, $window) {
    var vm = this;
    var userData = {};


    vm.actions = {
        auth: auth
    }


    init();


    function init() {


        $http.get("/api/api/values");
    }

    function auth() {
        $http.post("api/api/account", userData).then(successAuth, error);
    }

    function successAuth(response) {
        userService.user = response.data.UserData.UserInfo;
        $window.localStorage.setItem('tocken', response.data.UserData.Tocken);
    }
    function error(response) {
        
    }
}