angular.module("DiplomApp").controller("AuthUserController", AuthUserController);

AuthUserController.$inject = ["$scope", "$http", "userService", "$window", "$state"];

function AuthUserController($scope, $http, userService, $window, $state) {
    var vm = this;

    vm.userData = {};

    vm.isAuth = $state.current.name === "auth" ? true : false;

    vm.error = false;

    vm.actions = {
        register: register,
        auth: auth,
    }

    init();

    function init() {
        $http.get("/api/api/values");
    }

    function register() {
        $http.post("api/api/Account/register", vm.userData).then(successAuthOrRegister, error);
    }

    function auth() {
        $http.post("api/api/Account/auth", vm.userData).then(successAuthOrRegister, error);
    }
    //api/api/Account/auth
    function successAuthOrRegister(response) {
        vm.error = false;
        userService.user = response.data.UserInfo;
        $window.localStorage.setItem('tocken', response.data.Tocken);
        $state.go("main");
    }
    function error(response) {
        vm.error = true;
        vm.errors = response.data.ErrorList;
    }
        
}