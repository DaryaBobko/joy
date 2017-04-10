(function () {
    var module = angular.module('DiplomApp');

    module.controller('NavbarController', navbarController);
    function navbarController() {
        var vm = this;
        vm.tags = [ "Спорт", "Кухня", "Юмор", "Отдых" ];
    }
})();


