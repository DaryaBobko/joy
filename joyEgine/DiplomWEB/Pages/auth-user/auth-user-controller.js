angular.module("DiplomApp").controller("AuthUserController", AuthUserController);

AuthUserController.$inject = ["$scope", "$http", "userService", "$window", "$state"];

function AuthUserController($scope, $http, userService, $window, $state) {
    var vm = this;

    vm.userData = {};

    vm.isAuth = $state.current.name === "auth" ? true : false;
    
    vm.error = false;

    vm.actions = {
        auth: auth
    }


    init();


    function init() {


        $http.get("/api/api/values");
    }

    function auth() {
        $http.post("api/api/Account", vm.userData).then(successAuth, error);
    }

    function successAuth(response) {
        vm.error = false;
        userService.user = response.data.UserData.UserInfo;
        $window.localStorage.setItem('tocken', response.data.UserData.Tocken);
    }
    function error(response) {
        vm.error = true;
        vm.errors = response.data.ErrorList;
    }
}