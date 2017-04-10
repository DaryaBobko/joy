angular.module('DiplomApp').directive('posts', postsDirective);


function postsDirective() {
    var directive = {
        scope: {},
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

    vm.variableFrom = '';

    vm.posts = [];

    vm.actions = {
        isPostImgExists: isPostImgExists
    }

    init();


    function init() {
        vm.variableFrom = 'asd';
        var date = new Date();
        vm.posts = [
            {
                Tittle: 'First',
                Creator: 'SomeUser',
                CreationDate: date,
                Tags: ['firstTag', 'second tag'],
                ImagePath: 'content/staticImages/avt.jpg',
                PostText: "lorem ipsum"
            },
            {
                Tittle: 'Second',
                Creator: 'SomeUser',
                CreationDate: date,
                Tags: ['firstTag', 'second tag'],
                ImagePath: 'content/staticImages/logo.png',
                PostText: "lorem ipsum"
            },
            {
                Tittle: 'Second',
                Creator: 'SomeUser',
                CreationDate: date,
                Tags: ['firstTag', 'second tag'],
                //ImagePath: null,
                PostText: "lorem ipsum"
            },
            {
                Tittle: 'Second',
                Creator: 'SomeUser',
                CreationDate: date,
                Tags: ['firstTag', 'second tag'],
                //ImagePath: '',
                PostText: "lorem ipsum"
            },
            {
                Tittle: 'Second',
                Creator: 'SomeUser',
                CreationDate: date,
                Tags: ['firstTag', 'second tag'],
                //ImagePath: undefined,
                PostText: "lorem ipsum"
            }
        ];
    }

    function isPostImgExists(post) {
        if (post.ImagePath === null || post.ImagePath === "" || post.ImagePath === undefined) {
            return false;
        }
        return true;
    }

}