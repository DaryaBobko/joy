angular.module('DiplomApp').service('userService', userService);

userService.$inject = [];
function userService() {
    var user = {};

    var service = {
        user: user
    };

    return service;
}