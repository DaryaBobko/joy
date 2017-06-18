angular.module('DiplomApp').directive('posts', postsDirective);


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

postsController.$inject = ['postService', "userService", "$state"];

function postsController(postService, userService, $state) {
    var vm = this;
    
    vm.actions = {
        isPostImgExists: isPostImgExists,
        bottomButtonPress: bottomButtonPress,
        bottomRightButtonPress: bottomRightButtonPress,
        changeRating: changeRating
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

    function changeRating(post, isUp) {
        if (!userService.user) {
            $state.go('auth');
        }
        postService.changeRating(post.Id, isUp).then(response => {
            if (response.data) {
                if (isUp && post.RatedByUser === false) {
                    post.Rating += 2;
                    post.RatedByUser = !post.RatedByUser;
                } else if (!isUp && post.RatedByUser === true) {
                    post.Rating -= 2;
                    post.RatedByUser = !post.RatedByUser;
                } else {
                    isUp ? post.Rating++ : post.Rating--;
                    post.RatedByUser = isUp;
                }
            }
        });
    }

}