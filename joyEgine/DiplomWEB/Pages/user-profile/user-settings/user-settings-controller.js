angular.module('DiplomApp').controller('UserSettingsController', userSettingsController);

userSettingsController.$inject = ["userService"];

function userSettingsController(userService) {
    var vm = this;

    vm.userInfo = userService.user;

    vm.actions = {
        save: save
    };

    vm.userDetails = {};

    init();

    function init() {
        vm.userDetails = {
            ProfilePhoto: "content/staticImages/avt.jpg"
        }
    }

    function save(form) {
        vm.error = false;
        vm.errorText = "";
        if (form.$invalid) {
            return;
        }
        if (vm.oldPass) {
            if (vm.newPass === vm.newPassCheck) {
                vm.userInfo.NewPassword = vm.newPass;
                vm.userInfo.OldPassword = vm.oldPass;
            } else {
                vm.error = true;
                vm.errorText += "Новые пароли не совпадают";
            }
        }
        if (vm.newEmail) {
            vm.userInfo.newEmail = vm.newEmail;
        }
        //changeModel.Images = vm.userInfo.Images;
        vm.userInfo.Id = userService.user.UserId;
        userService.changeUserInfo(vm.userInfo)
            .then(
            response => {
                userService.user = response.data.UserInfo;
            },
        error => {
            vm.error = true;
            vm.errorText += "Старый пароль неверный";
        });
    }

}