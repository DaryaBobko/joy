angular.module('DiplomApp').service('userService', userService);

userService.$inject = ["$http"];
function userService($http) {

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
        service.userPromise = $http.post('api/api/account/getUserInfo', { UserId: null })
            .then(function (response) {
                if (response.data)
                    service.user = response.data.UserInfo;
            }, function(error) {

            });
    }

    function isInnRole(role) {
        return _.find(service.user.Roles, roleId => roleId === role);
    }

    return service;
}