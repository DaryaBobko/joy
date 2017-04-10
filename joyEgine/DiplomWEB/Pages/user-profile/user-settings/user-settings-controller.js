angular.module('DiplomApp').controller('UserSettingsController', userSettingsController);

userSettingsController.$inject = [];

function userSettingsController() {
    var vm = this;

    vm.UserInfo = {};

    vm.actions = {
    
    };

    vm.userDetails = {};

    init();

    function init() {
        vm.userDetails = {
            ProfilePhoto: "content/staticImages/avt.jpg"
        }
    }

}