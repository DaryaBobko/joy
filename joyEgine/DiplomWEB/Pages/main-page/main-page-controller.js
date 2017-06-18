angular.module('DiplomApp').controller('MainController', MainController);

MainController.$inject = ['$scope', '$http', "$stateParams", "postService"];

function MainController($scope, $http, $stateParams, postService) {
    var vm = this;
    vm.posts = [];

    vm.actions = {
    }

    init();

    function init() {

        var promice = null;
        var searchModel = {};
        if ($stateParams.SearchText) {
            searchModel.SaerchText = $stateParams.SearchText;
        }
        if ($stateParams.TagId) {
            searchModel.TagId = $stateParams.TagId;
        }
        if ($stateParams.DisplayType) {
            searchModel.DisplayType = $stateParams.DisplayType;
        }
        if (!angular.equals(searchModel, {})) {
            promice = postService.getPosts(searchModel);
        } else {
            promice = postService.getPosts();
        }
        promice.then(function (response) {
                vm.posts = response.data;
            });
    }

}