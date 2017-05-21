angular.module("DiplomApp").service('enumService', enumService);

enumService.$inject = [];
function enumService() {

	var postStatus = {
		Approved: 1,
		NeedVerify: 2,
		Rejected: 3
	}

	var service = {
	    postStatus: postStatus
	};

    return service;
}