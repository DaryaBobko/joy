angular.module('DiplomApp').service('postService', postService);

postService.$inject = ['$http'];
function postService($http) {
    var service = {
        getAvailableTags: getAvailableTags
    };

    function getAvailableTags () {
        return $http.get('api/api/tags');
    }

    return service;
}