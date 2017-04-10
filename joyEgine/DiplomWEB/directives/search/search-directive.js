angular.module('DiplomApp').directive('search', searchDirective);


function postsDirective() {
    var directive = {
        scope: {},
        //templateUrl: "/Pages/posts-directive/posts.tmpl.html",
        restrict: "E",
        controller: postsController,
        //controllerAs: "vm"
    }

    return directive;
}

postsController.$inject = ['$scope', '$http', '$state'];

function postsController($scope, $http) {
    var vm = this;

    vm.posts = [];

    vm.actions = {
        searchPosts: searchPosts
    }

    init();


    function init() {
       
    }

    function searchPosts(searchText) {
        $http.get('api/api/search', {
            params: {
                searchText: searchText
            }
        }).then(result => {
            vm.posts = result.data;
        });
    }

    

}