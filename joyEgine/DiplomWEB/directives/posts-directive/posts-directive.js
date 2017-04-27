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
                Tittle: 'Сырники',
                Creator: 'Akkyleev.Kirill',
                CreationDate: date,
                Tags: ['Кухня',],
                ImagePath: 'content/staticImages/past1.jpg',
                PostText: "Понадобится (на 12-14шт.): по 2 яйца и пачки творога, 1 пакетик разрыхлителя, 4-6ст.л. муки, 4ст.л. сахара, соль, ванильный сахар – при желании. Как приготовить простые сырники. Миксером или блендером взбить яйца с сахаром, разрыхлителем и солью, добавить творог и как следует перемешать, всыпать просеянную муку, до однородности размешать. Сформовать из теста сырники, обжарить с двух сторон на масле до румяной корочки. Подавать со сметаной."
            },
            {
                Tittle: 'Милота',
                Creator: 'snurlad',
                CreationDate: date,
                Tags: ['отдых'],
                ImagePath: 'content/staticImages/cat.jpg',
                PostText: "Меньше ворчите, больше урчите"
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