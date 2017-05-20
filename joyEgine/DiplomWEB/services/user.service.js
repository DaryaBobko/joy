angular.module('DiplomApp').service('userService', userService);

userService.$inject = ["$http"];
function userService($http) {

    var service = {
        user: null,
        isUserExists: isUserExists,
        getUserInfo: getUserInfo
    };

    function isUserExists() {
        return (!!service.user);
    }

    function getUserInfo() {
        $http.post('api/api/account/getUserInfo')
            .then(function (response) {
                if (response.data)
                    service.user = response.data.UserInfo;
            }, function(error) {

            });
    }

    return service;
}