angular.module('DiplomApp').controller('AddPostController', addPostController);

addPostController.$inject = ['postService', "$q"];

function addPostController(postService, $q) {
    var vm = this;

    vm.UserInfo = {};

    vm.actions = {
        test: test,
        sendPost: sendPost,
   //  TODO :  getError: getError,
   //  TODO :  addNewPost: addNewPost
    };

    vm.userDetails = {};
    vm.selectedTags = [];
    vm.availableTags = [];
    vm.postData = {};
    //  TODO : vm.messege = {};
    //  TODO : vm.showError = {}

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

    function sendPost() {
        //getFileIfExists().then(function() 
        vm.postData.SelectedTags = _.map(vm.selectedTags, function (tag) { return tag.Id });
        postService.sendPostToServer(vm.postData);
        //});

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

    //  TODO : function addNewPost(detailsPost, isvalid) {
    //    if (isvalid) {
    //        vm.messege = detailsPost.head + " " + detailsPost.text;
    //    }
    //    else {
    //        vm.messege = "Error";
    //        vm.showError = true;
    //    }


    //}

    //  TODO : function getError(error) {
    //    if (angular.isDefined(error)) {
    //        if (error.required) {
    //            return "Поле не должно быть пустым";
    //        } else if (error.text) {
    //            return "Введите правильный заголовок";
    //        }
    //    }
    //}

}