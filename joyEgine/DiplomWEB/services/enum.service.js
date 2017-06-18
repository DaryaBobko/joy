angular.module("DiplomApp").service('enumService', enumService);

enumService.$inject = [];
function enumService() {

	var postStatus = {
		Approved: 1,
		NeedVerify: 2,
		Rejected: 3
	}

    var tagStatus = {
        Approved: 1,
        NeedVerify: 2,
        Rejected: 3
    }

	var appRole = {
		Admin: 1,
		User: 2
	}

    var postsDisplayType = {
        Hot: 1,
        Best: 2,
        Fresh: 3
    }

	var service = {
		postStatus: postStatus,
		appRole: appRole,
		tagStatus: tagStatus,
	    postsDisplayType: postsDisplayType
	};

	

    return service;
}