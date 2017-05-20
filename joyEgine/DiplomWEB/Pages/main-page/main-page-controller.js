angular.module('DiplomApp').controller('MainController', MainController);

MainController.$inject = ['$scope', '$http', "$stateParams"];

function MainController($scope, $http, $stateParams) {
    var vm = this;
    vm.posts = [];

    vm.actions = {
    }

    init();

    function init() {


        var searchModel = {};
        if ($stateParams.SearchText) {
            searchModel.SaerchText = $stateParams.SearchText;
        }
        if ($stateParams.TagId) {
            searchModel.TagId = $stateParams.TagId;
        }
        $http.post('api/api/post/getPosts', searchModel)
            .then(function (response) {
                vm.posts = response.data;
            });
    }

}