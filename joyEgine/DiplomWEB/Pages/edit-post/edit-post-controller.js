angular.module('DiplomApp').controller('EditPostController', editPostController);

editPostController.$inject = ["postService", "$stateParams", "tagService", "$q", "$state"];

function editPostController(postService, $stateParams, tagService, $q, $state) {
    var vm = this;

    vm.postData = {};

    vm.actions = {
        updatePost: updatePost
    };


    init();

    function init() {
        //postService.getPostById($stateParams.id)
        //    .then(function(result) {
        //        vm.postData = result.data;
        //    });

        //tagService.getAvailableTags().then(response => {
        //    vm.availableTags = response.data;
        //});
        $q.all([postService.getPostById($stateParams.id), tagService.getAvailableTags()]).then(response => {
            vm.postData = response[0].data;
            vm.availableTags = response[1].data;

            vm.selectedTags = _.filter(vm.availableTags, tag => _.includes(_.map(vm.postData.Tags, tag => tag.Id), tag.Id));
        });

    }

    function updatePost(form) {
        if (form.$invalid || vm.selectedTags.length < 1) {
            vm.showError = true;
            return;
        }
        vm.showError = false;

        vm.postData.SelectedTags = _.map(vm.selectedTags, function (tag) { return tag.Id });
        postService.updatePost(vm.postData).then(response => {
            $state.go("user-profile"/*, { id: userService.user.Id }*/);
        });
    }
}