angular.module('DiplomApp').controller('PostValidationController', postValidationController);

postValidationController.$inject = ["postService", "$stateParams", "$state", "userService", "enumService"];

function postValidationController(postService, $stateParams, $state, userService, enumService) {
    var vm = this;

    vm.post = {};
    vm.findedPosts = [];
    vm.isImageApproved = false;
    vm.tagStatus = enumService.tagStatus;

    vm.actions = {
        search: search,
        selectStateForImage: selectStateForImage,
        approve: approve,
        reject: reject,
        changeImageApprovement: changeImageApprovement,
        changeTagStatus: changeTagStatus
    };


    init();

    function init() {
        postService.getPostById($stateParams.id)
            .then(function(result) {
                vm.post = result.data;
                setInvalidOrPendingStatusForTags(vm.post);
            });
    }

    function setInvalidOrPendingStatusForTags(post) {
        _.forEach(post.Tags, function(tag) {
            if (tag.Status === vm.tagStatus.Approved) {
                tag.Status = vm.tagStatus.Rejected;
            } else {
                tag.Status = vm.tagStatus.NeedVerify;
                tag.IsNeedVerify = true;
            }
        });
    }

    function search() {
        postService.getPosts({ SaerchText: vm.searchText })
            .then(function(result) {
                vm.findedPosts = result.data;
            });
    }

    function selectStateForImage() {
        
    }

    function approve() {
        postService.approvePost(vm.post.Id).then(response => {
            $state.go("user-profile"/*, { id: userService.user.Id }*/);
        });
    }

    function reject() {
        postService.rejectPost(vm.post.Id).then(response => {
            $state.go("user-profile"/*, { id: userService.user.Id }*/);
        });
    }

    function changeImageApprovement() {
        vm.isImageApproved = !vm.isImageApproved;
    }

    function changeTagStatus(tag) {
        if (tag.Status === vm.tagStatus.Approved) {
            tag.Status = vm.tagStatus.Rejected;
        } else {
            if (tag.Status === vm.tagStatus.Rejected) {
                if (tag.IsNeedVerify) {
                    tag.Status = vm.tagStatus.NeedVerify;
                } else {
                    tag.Status = vm.tagStatus.Approved;
                }
            } else {
                if (tag.Status === vm.tagStatus.NeedVerify) {
                    tag.Status = vm.tagStatus.Approved;
                }
            }
        }
    }
}