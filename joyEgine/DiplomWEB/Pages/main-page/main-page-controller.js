angular.module('DiplomApp').controller('MainController', MainController);

MainController.$inject = ['$scope', '$http'];

function MainController($scope, $http) {
    var vm = this;

    vm.actions = {
    }

    init();


    function init() {
   
        
        $http.get('/api/api/Values');
    }
}