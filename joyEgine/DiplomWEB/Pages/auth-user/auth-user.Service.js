angular.module("DiplomApp").service("authUserService", authUserService);

authUserService.$inject = ["$http", "userService", "$window"];

function authUserService($http, userService, $window) {
    var service = {};

    service.auth = function (userData) {
        return $http.post("api/api/Account/auth", userData)
            .then(succsesAuthRegister);
    }

    service.getUserInfo = function (identifier) {
        return $http.get('api/api/account/getUserInfo', { params: identifier })
            .then(function (response) {
                userService.user = response.data.UserInfo;
            });
    }

    service.register = function(userData) {
        return $http.post("api/api/Account/register", userData).then(succsesAuthRegister);
    }

    function succsesAuthRegister(response) {
        userService.user = response.data.UserInfo;
        $window.localStorage.setItem('tocken', response.data.Tocken);
    }

    return service;

}