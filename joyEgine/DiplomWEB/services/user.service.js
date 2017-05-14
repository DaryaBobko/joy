angular.module('DiplomApp').service('userService', userService);

userService.$inject = [];
function userService() {

    var service = {
        user: null,
        isUserExists: isUserExists
    };

    function isUserExists() {
        return (!!service.user);
    }

    return service;
}