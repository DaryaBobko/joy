angular.module('DiplomApp').service('postService', postService);

postService.$inject = ['$http', '$q'];
function postService($http, $q) {
    var service = {
        getAvailableTags: getAvailableTags
    };

    function getAvailableTags() {
        var response = {
            data:['спорт', 'юмор', 'кухня', 'отдых']
        }
        return $q.when(response);
        //$http.get('api/api/tags');
        
    }

    return service;
}