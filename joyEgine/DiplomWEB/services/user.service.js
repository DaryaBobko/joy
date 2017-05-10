angular.module('DiplomApp').service('userService', userService);

userService.$inject = [];
function userService() {
    var user = {};

    function isUserExists() {
        return (!!user);
    }

    var service = {
        user: user,
        isUserExists: isUserExists
    };

    return service;
}