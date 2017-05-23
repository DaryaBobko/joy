angular.module('DiplomApp').controller('EditPostController', editPostController);

editPostController.$inject = ["postService", "$stateParams"];

function editPostController(postService, $stateParams) {
    var vm = this;

    vm.post = {};
    vm.findedPosts = [];

    vm.actions = {
        search: search,
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

}