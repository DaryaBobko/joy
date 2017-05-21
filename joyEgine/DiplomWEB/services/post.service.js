angular.module('DiplomApp').service('postService', postService);

postService.$inject = ['$http', '$q', "commonService"];
function postService($http, $q, commonService) {
    var service = {
        getAvailableTags: getAvailableTags,
        sendPostToServer: sendPostToServer,
        getPosts: getPosts,
        getPostById: getPostById
    };

    function getAvailableTags() {
        //var response = {
        //    data:['спорт', 'юмор', 'кухня', 'отдых']
        //}
        //return $q.when(response);
        return $http.get('api/api/tags');
        
    }

    function sendPostToServer(post) {
       
        //post.SelectedTags[0] = 1;
        post = commonService.createFormData(post);
        return $http.post("api/api/post", post, {headers: 
            {
                'Content-Type': undefined,
                transformRequest: angular.identity
            }});
    }

    function getPosts(searchModel) {
        return $http.post('api/api/post/getPosts', searchModel);
    }

    function getPostById(id) {
        return $http.get("api/api/post", { params: { id: id } });
    }

    return service;
}