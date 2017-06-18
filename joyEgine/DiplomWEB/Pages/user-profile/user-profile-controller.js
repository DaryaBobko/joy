/// <reference path="remove-modal.tmpl.html" />
angular.module('DiplomApp').controller('UserProfileController', userProfileController);

userProfileController.$inject = ["$state", "enumService", "postService", "userService", "userHere", "$uibModal", "$scope"];

function userProfileController($state, enumService, postService, userService, userHere, $uibModal, $scope) {
    var vm = this;

    vm.UserInfo = {};
    vm.postStatuses = enumService.postStatus;
    vm.role = enumService.appRole;

    vm.actions = {
        goToPostValidate: goToPostValidate,
        getPosts: getPosts,
        goToPost: goToPost,
        removePost: removePost,
        confirmRemove: confirmRemove,
        cancel: cancel
    };

    init();
   

    function init() {
        if (userService.user) {
            getPosts(vm.postStatuses.NeedVerify)
                .then(function (response) {
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

    function removePost(postId) {
        vm.removablePostId = postId.id;
        vm.modalInstance = $uibModal.open({
            scope: $scope,
            templateUrl: "Pages/user-profile/remove-modal.tmpl.html"
        });

        vm.modalInstance.result.then(removedPostId => {
        });
    }

    function confirmRemove() {
        vm.modalInstance.close(vm.removablePostId);
        postService.removePost(vm.removablePostId).then(response => {
            vm.postsInQueue = _.filter(vm.postsInQueue, post => post.Id !== vm.removablePostId);
            vm.approvedPosts = _.filter(vm.approvedPosts, post => post.Id !== vm.removablePostId);
            vm.rejectedPosts = _.filter(vm.rejectedPosts, post => post.Id !== vm.removablePostId);
            vm.allUserPosts = _.filter(vm.allUserPosts, post => post.Id !== vm.removablePostId);
        });
    }

    function cancel() {
        vm.modalInstance.dismiss("cancel");
    }

    function goToPost(state, params) {
        $state.go(state, params);
    }
}