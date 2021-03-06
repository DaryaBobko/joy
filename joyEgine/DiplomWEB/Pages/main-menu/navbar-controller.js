﻿(function () {
    var module = angular.module('DiplomApp');
    module.controller('NavbarController', navbarController);

    navbarController.$inject = ["userService", "$window", "$state", "tagService", "enumService"];
    function navbarController(userService, $window, $state, tagService, enumService) {
        var vm = this;

        vm.displayType = enumService.postsDisplayType;

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
            userService.userPromise.then(response => {
                vm.userInfo = userService.user;
            });
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


