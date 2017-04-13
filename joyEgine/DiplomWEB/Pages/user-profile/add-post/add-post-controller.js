angular.module('DiplomApp').controller('AddPostController', addPostController);

addPostController.$inject = [];

function addPostController() {
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