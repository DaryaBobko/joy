angular.module('DiplomApp').controller('AddPostController', addPostController);

addPostController.$inject = ['postService'];

function addPostController(postService) {
    var vm = this;

    vm.UserInfo = {};

    vm.actions = {
        test:test
    };

    vm.userDetails = {};
    vm.selectedTags = [];
    vm.availableTags = [];

    init();

    function init() {
        vm.userDetails = {
            ProfilePhoto: "content/staticImages/avt.jpg"
        }
        getAvailableTags();
    }

    function getAvailableTags() {
        postService.getAvailableTags().then(function (response) {
            vm.availableTags = response.data;
        });
    }

    function test() {
        debugger;
        console.log(vm.selectedImage);
    }

}