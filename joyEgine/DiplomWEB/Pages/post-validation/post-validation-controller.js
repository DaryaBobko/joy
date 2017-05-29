angular.module('DiplomApp').controller('PostValidationController', postValidationController);

postValidationController.$inject = ["postService", "$stateParams", "$state", "userService"];

function postValidationController(postService, $stateParams, $state, userService) {
    var vm = this;

    vm.post = {};
    vm.findedPosts = [];

    vm.actions = {
        search: search,
        selectStateForImage: selectStateForImage,
        approve: approve,
        reject: reject
    };


    init();

    function init() {
        postService.getPostById($stateParams.id)
            .then(function(result) {
                vm.post = result.data;
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
}