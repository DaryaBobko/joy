angular.module('DiplomApp').controller('EditPostController', editPostController);

editPostController.$inject = ["postService", "$stateParams", "tagService"];

function editPostController(postService, $stateParams, tagService) {
    var vm = this;

    vm.postData = {};

    vm.actions = {
        updatePost: updatePost
    };


    init();

    function init() {
        postService.getPostById($stateParams.id)
            .then(function(result) {
                vm.postData = result.data;
            });

        tagService.getAvailableTags().then(response => {
            vm.availableTags = response.data;
        });
    }

    function updatePost(form) {
        if (form.$invalid || vm.selectedTags.length < 1) {
            vm.showError = true;
            return;
        }
        vm.showError = false;

        vm.postData.SelectedTags = _.map(vm.selectedTags, function (tag) { return tag.Id });
        postService.sendPostToServer(vm.postData);
    }
}