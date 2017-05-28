angular.module('DiplomApp').controller('EditPostController', editPostController);

editPostController.$inject = ["postService", "$stateParams"];

function editPostController(postService, $stateParams) {
    var vm = this;

    vm.postData = {};

    vm.actions = {
    };


    init();

    function init() {
        postService.getPostById($stateParams.id)
            .then(function(result) {
                vm.postData = result.data;
            });
    }
}