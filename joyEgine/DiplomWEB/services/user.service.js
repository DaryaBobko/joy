angular.module('DiplomApp').service('userService', userService);

userService.$inject = ["$http", "$window"];
function userService($http, $window) {

    var service = {
        user: null,
        isUserExists: isUserExists,
        getUserInfo: getUserInfo,
        isInnRole: isInnRole,
        userPromise: null
    };

    function isUserExists() {
        return (!!service.user);
    }

    function getUserInfo() {
        if ($window.localStorage.getItem('tocken')) {
            service.userPromise = $http.post('api/api/account/getUserInfo', { UserId: null })
            .then(function (response) {
                if (response.data)
                    service.user = response.data.UserInfo;
            });
        }
        
    }

    function isInnRole(role) {
        if (!service.user) {
            return false;
        }
        return _.find(service.user.Roles, roleId => roleId === role);
    }

    return service;
}