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
            searchModel.SearchText = $stateParams.SearchText;
        }
        if ($stateParams.TagId) {
            searchModel.TagId = $stateParams.TagId;
        }
        $http.get('api/api/post', { params: searchModel })
            .then(function (response) {
                vm.posts = response.data;
            });
    }

}