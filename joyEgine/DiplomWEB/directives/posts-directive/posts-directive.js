﻿angular.module('DiplomApp').directive('posts', postsDirective);


function postsDirective() {
    var directive = {
        scope: {},
        bindToController: {
            list: '=',
            buttonAction: '&?',
            buttonTemplate: '@?',
            anotherButtonAction: '&?'
        },
        templateUrl: "/directives/posts-directive/posts.tmpl.html",
        restrict: "E",
        controller: postsController,
        controllerAs: "vm"
    }

    return directive;
}

postsController.$inject = ['$scope'];

function postsController($scope) {
    var vm = this;
    
    vm.actions = {
        isPostImgExists: isPostImgExists,
        bottomButtonPress: bottomButtonPress,
        bottomRightButtonPress: bottomRightButtonPress
    }

    init();


    function init() {
        
    }

    function bottomButtonPress(postId) {
        vm.buttonAction({ params : {id : postId}});
    }

    function bottomRightButtonPress(postId) {
        vm.anotherButtonAction({ params: { id: postId } });
    }

    function isPostImgExists(post) {
        if (post.ImagePath === null || post.ImagePath === "" || post.ImagePath === undefined) {
            return false;
        }
        return true;
    }

}