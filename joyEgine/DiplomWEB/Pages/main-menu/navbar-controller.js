(function () {
    var module = angular.module('DiplomApp');

    navbarController.$inject = ["userService"];
    module.controller('NavbarController', navbarController);
    function navbarController(userService) {
        var vm = this;

        vm.actions = {
            isUserExists: isUserExists
        }

        init();

        function init() {
            vm.tags = ["Спорт", "Кухня", "Юмор", "Отдых"];
        }

        function isUserExists() {
            return userService.isUserExists();
        }

    }


})();


