angular.module("DiplomApp").controller("AuthUserController", AuthUserController);

AuthUserController.$inject = ["$scope", "$http"];

function AuthUserController($scope, $http) {
    var vm = this;

    vm.actions = {
        auth: auth
    }


    init();


    function init() {


        $http.get("/api/api/values");
    }

    function auth() {


    }
}