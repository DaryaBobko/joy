angular.module('DiplomApp').controller('PostValidationController', postValidationController);

postValidationController.$inject = ["postService", "$stateParams"];

function postValidationController(postService, $stateParams) {
    var vm = this;

    vm.post = {};

    vm.actions = {
        search: search,
        selectStateForImage: selectStateForImage
    };


    init();

    function init() {
        postService.getPostById($stateParams.Id);
    }

    function search() {
        
    }

    function selectStateForImage() {
        
    }
}