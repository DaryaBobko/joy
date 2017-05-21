angular.module('DiplomApp').controller('UserProfileController', userProfileController);

userProfileController.$inject = ["$state", "enumService", "postService", "userService"];

function userProfileController($state, enumService, postService, userService) {
    var vm = this;

    vm.UserInfo = {};
    vm.postStatuses = enumService.postStatus;


    vm.actions = {
        goToPostValidate: goToPostValidate,
        getPosts: getPosts
    };

    init();
   

    function init() {
        vm.testme = "asd";
        vm.UserInfo = {
            TotalPosts: 25,
            ApprovedPosts: 10,
            DisaprovedPosts: 5,
            PostsInQueue: 11
        };
    }

    function goToPostValidate(id) {
        $state.go("post-validation", {id: id});
    }

    function getPosts(status, postList) {
        postService.getPostsForUser(userService.user.UserId, status)
            .then(function(response) {
                postList.length = 0;
                response.data.forEach(function(post) {
                    postList.push(post);
                });
            });
    }

    function getAllUserPosts() {
        
    }

    function getPendingPosts() {
        
    }

    function getRejectedPosts() {
        
    }

    

}