angular.module("DiplomApp").controller("AuthUserController", AuthUserController);

AuthUserController.$inject = ["$scope", "$http", "userService", "$window", "$state", "authUserService"];

function AuthUserController($scope, $http, userService, $window, $state, authUserService) {
    var vm = this;

    vm.userData = {};

    vm.isAuth = $state.current.name === "auth" ? true : false;

    vm.error = false;

    vm.actions = {
        register: register,
        auth: auth
    }

    init();

    function init() {
    }

    function register() {
        $http.post("api/api/Account/register", vm.userData).then(successAuthOrRegister, error);
    }

    function auth() {
        authUserService.auth(vm.userData)
            .then(successAuthOrRegister, error);
    }
    //api/api/Account/auth
    function successAuthOrRegister(response) {
        vm.error = false;
        $state.go("main");
    }
    function error(response) {
        vm.error = true;
        vm.errors = response.data.ErrorList;
    }
        
}