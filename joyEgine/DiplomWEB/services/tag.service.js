angular.module("DiplomApp").service('tagService', tagService);

tagService.$inject = ["$http"];
function tagService($http) {

    var service = {
        addNewTag: addNewTag,
        getAvailableTags: getAvailableTags
};
    //
    function addNewTag(tagName) {
        return $http.post("api/api/tags", { Name: tagName });
    }

    function getAvailableTags() {
        return $http.get('api/api/tags');
    }

    return service;
}