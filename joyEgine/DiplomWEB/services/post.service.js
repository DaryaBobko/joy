angular.module('DiplomApp').service('postService', postService);

postService.$inject = ['$http', '$q', "commonService"];
function postService($http, $q, commonService) {
    var service = {
        getAvailableTags: getAvailableTags,
        sendPostToServer: sendPostToServer
    };

    function getAvailableTags() {
        //var response = {
        //    data:['спорт', 'юмор', 'кухня', 'отдых']
        //}
        //return $q.when(response);
        return $http.get('api/api/tags');
        
    }

    function sendPostToServer(post) {
        post = commonService.createFormData(post);
        return $http.post("api/api/post", post, {headers: 
            {
                'Content-Type': undefined,
                transformRequest: angular.identity
            }});
    }

    return service;
}