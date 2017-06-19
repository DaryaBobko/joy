angular.module('DiplomApp').service('userService', userService);

userService.$inject = ["$http", "$window", "commonService"];
function userService($http, $window, commonService) {

    var service = {
        user: null,
        isUserExists: isUserExists,
        getUserInfo: getUserInfo,
        isInnRole: isInnRole,
        userPromise: null,
        changeUserInfo: changeUserInfo
    };

    function isUserExists() {
        return (!!service.user);
    }

    function getUserInfo() {
        if ($window.localStorage.getItem('tocken')) {
            service.userPromise = $http.post('api/api/account/getUserInfo', { UserId: null })
                .then(function(response) {
                    if (response.data)
                        service.user = response.data.UserInfo;
                });
        } else {
            var defer = $q.defer();
            defer.reject("no tocken");
            service.userPromise = defer.promise;
        }

    }

    function isInnRole(role) {
        if (!service.user) {
            return false;
        }
        return _.find(service.user.Roles, roleId => roleId === role);
    }

    function changeUserInfo(model) {
        model = commonService.createFormData(model);
        return $http.post("api/api/account/changeUserInfo", model, {
            headers:
                {
                    'Content-Type': undefined,
                    transformRequest: angular.identity
                }
        });
    }

    return service;
}