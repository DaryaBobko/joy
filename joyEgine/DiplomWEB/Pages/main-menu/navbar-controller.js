(function () {
    var module = angular.module('DiplomApp');

    navbarController.$inject = ["userService", "$window", "$state"];
    module.controller('NavbarController', navbarController);
    function navbarController(userService, $window, $state) {
        var vm = this;

        vm.actions = {
            isUserExists: isUserExists,
            logOut: logOut,
            getUserEmail: getUserEmail
        }

        init();

        function init() {
            vm.tags = ["Спорт", "Кухня", "Юмор", "Отдых"];
            vm.userInfo = userService.user;
        }

        function isUserExists() {
            return userService.isUserExists();
        }

        function getUserEmail() {
            return userService.user.Email;
        }

        function logOut() {
            window.localStorage.removeItem("tocken");
            userService.user = null;
            $state.go("main");
        }

    }


})();


