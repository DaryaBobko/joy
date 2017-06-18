angular.module('DiplomApp').service('postService', postService);

postService.$inject = ['$http', '$q', "commonService", "enumService"];
function postService($http, $q, commonService, enumService) {
    var service = {
        getAvailableTags: getAvailableTags,
        sendPostToServer: sendPostToServer,
        getPosts: getPosts,
        getPostById: getPostById,
        getPostsForUser: getPostsForUser,
        removePost: removePost,
        updatePost: updatePost,
        approvePost: approvePost,
        rejectPost: rejectPost,
        changeRating: changeRating
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

    function getPostsForUser(userId, status) {
        return $http.get("api/api/post/getUserPosts", { params: { id: userId, status: status } });
    }

    function removePost(id) {
        return $http.delete("api/api/post", {params: { id: id } });
    }

    function updatePost(post) {
        post = commonService.createFormData(post);
        return $http.put("api/api/post", post, {
            headers:
                {
                    'Content-Type': undefined,
                    transformRequest: angular.identity
                }
        });
    }

    function approvePost(post) {
        return $http.post("api/api/post/approvePost", { Id: post.Id, ApproveImage: post.isImageApproved, Tags: post.Tags, ApproveAll: post.ApproveAll });
    }

    function rejectPost(id) {
        return $http.patch("api/api/post", { Id: id, PropertyName: "Status", Value: enumService.postStatus.Rejected });
    }

    function changeRating(id, isUp) {
        return $http.post("api/api/rating/", { PostId: id, isUp: isUp });
    }

    return service;
}