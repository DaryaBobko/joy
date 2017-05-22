angular.module('DiplomApp').controller('PostValidationController', postValidationController);

postValidationController.$inject = ["postService", "$stateParams"];

function postValidationController(postService, $stateParams) {
    var vm = this;

    vm.post = {};
    vm.findedPosts = [];

    vm.actions = {
        search: search,
        selectStateForImage: selectStateForImage
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
}