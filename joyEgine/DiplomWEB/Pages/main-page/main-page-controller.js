angular.module('DiplomApp').controller('MainController', MainController);

MainController.$inject = ['$scope', '$http'];

function MainController($scope, $http) {
    var vm = this;

    vm.actions = {
    }

    init();


    function init() {
        $http.get('/api/DiplomAPI/Values');
        $http.get('/api/DiplomAPI/api/Values');
        $http.get('/api/api/Values');
        $http.get('/api/Values');
    }
}