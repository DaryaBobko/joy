(function () {
    var module = angular.module('DiplomApp');
    module.controller('NavbarController', navbarController);

    navbarController.$inject = ["userService", "$window", "$state", "tagService"];
    function navbarController(userService, $window, $state, tagService) {
        var vm = this;

        vm.actions = {
            isUserExists: isUserExists,
            logOut: logOut,
            getUserEmail: getUserEmail
        }

        init();

        function init() {
            tagService.getAvailableTags().then(response => {
                vm.tags = response.data;
            });
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


