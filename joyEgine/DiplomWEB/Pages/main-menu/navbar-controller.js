(function () {
    var module = angular.module('DiplomApp');

    navbarController.$inject = ["userService", "$window", "$state"];
    module.controller('NavbarController', navbarController);
    function navbarController(userService, $window, $state) {
        var vm = this;

        vm.actions = {
            isUserExists: isUserExists,
            logOut: logOut
        }

        init();

        function init() {
            vm.tags = ["Спорт", "Кухня", "Юмор", "Отдых"];
        }

        function isUserExists() {
            return !!userService.user;
        }

        function logOut() {
            window.localStorage.removeItem("tocken");
            userService.user = null;
            $state.go("main");
        }

    }


})();


