angular.module('DiplomApp').controller('UserProfileController', userProfileController);

userProfileController.$inject = ["$state", "enumService", "postService", "userService", "userHere"];

function userProfileController($state, enumService, postService, userService, userHere) {
    var vm = this;

    vm.UserInfo = {};
    vm.postStatuses = enumService.postStatus;
    vm.role = enumService.appRole;

    vm.actions = {
        goToPostValidate: goToPostValidate,
        getPosts: getPosts,
        goToPost: goToPost
    };

    init();
   

    function init() {
        getPosts(vm.postStatuses.NeedVerify)
            .then(function(response) {
                vm.postsInQueue = response.data;
            });
        getPosts(vm.postStatuses.Approved)
            .then(function (response) {
                vm.approvedPosts = response.data;
            });
        getPosts(vm.postStatuses.Rejected)
            .then(function (response) {
                vm.rejectedPosts = response.data;
            });
        getPosts()
            .then(function (response) {
                vm.allUserPosts = response.data;
            });
    }

    function goToPostValidate(id) {
        $state.go("post-validation", {id: id});
    }

    function getPosts(status) {
        if (userService.isInnRole(vm.role.Admin) && status === vm.postStatuses.NeedVerify) {
            return postService.getPostsForUser(null, status);
        }
        return postService.getPostsForUser(userService.user.UserId, status);
            //.then(function(response) {
            //    postList.length = 0;
            //    response.data.forEach(function(post) {
            //        postList.push(post);
            //    });
            //}
        //)
        
    }

    function goToPost(state, params) {
        $state.go(state, params);
    }
}