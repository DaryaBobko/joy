angular.module('DiplomApp').controller('AddPostController', addPostController);

addPostController.$inject = ['postService', "$q", "tagService"];

function addPostController(postService, $q, tagService) {
    var vm = this;

    vm.UserInfo = {};

    vm.actions = {
        test: test,
        sendPost: sendPost,
        addNewTag: addNewTag

    };

    vm.userDetails = {};
    vm.selectedTags = [];
    vm.availableTags = [];
    vm.postData = {};


    init();

    function init() {
        vm.userDetails = {
            ProfilePhoto: "content/staticImages/add-img.jpg"
        }
        getAvailableTags();
    }

    function getAvailableTags() {
        postService.getAvailableTags().then(function (response) {
            vm.availableTags = response.data;
        });
    }

    function test() {
        debugger;
        console.log(vm.selectedImage);
    }

    function sendPost(form) {
        if (form.$invalid || vm.selectedTags.length < 1) {
            vm.showError = true;
            return;
        }
        vm.showError = false;

        vm.postData.SelectedTags = _.map(vm.selectedTags, function (tag) { return tag.Id });
        postService.sendPostToServer(vm.postData);
    }

    function getFileIfExists() {
        var f = document.getElementById('file').files[0],
        r = new FileReader();
        var deferred = $q.defer();

        r.onloadend = function (e) {
            vm.postData.SelectedFile = e.target.result;
            deferred.resolve();
            //send your binary data via $http or $resource or do anything else with it
        }

        r.readAsBinaryString(f);
        return deferred.promise;
    }

    function addNewTag(tagName) {
        tagService.addNewTag(tagName).then((response) => {
            var newTag = { Name: tagName, Id: response.data };
            vm.availableTags.push(newTag);
            vm.selectedTags.push(newTag);
        });
    }

}