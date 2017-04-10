angular.module('DiplomApp').controller('UserProfileController', userProfileController);

userProfileController.$inject = [];

function userProfileController() {
    var vm = this;

    vm.UserInfo = {};

    vm.actions = {
    
    };

    init();

    function init() {
        vm.testme = "asd";
        vm.UserInfo = {
            TotalPosts: 25,
            ApprovedPosts: 10,
            DisaprovedPosts: 5,
            PostsInQueue: 10
        };
    }

}