angular.module("DiplomApp").service('tagService', tagService);

tagService.$inject = ["$http"];
function tagService($http) {

    var service = {
        addNewTag: addNewTag
};
    //
    function addNewTag(tagName) {
        return $http.post("api/api/tags", { Name: tagName });
    }

    return service;
}