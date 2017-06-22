(function(){
    'use strict';

angular
    .module('milesBoard')
    .controller('BoardController', BoardController);

BoardController.$inject = ['$localStorage','$scope', '$stateParams'];//'displayObj','displayObjConfig'];

function BoardController($localStorage, $scope) {
    var vm = this;
    vm.$onInit = onInit;

    vm.showActions = $localStorage.user ? true : false;
    vm.loggedInUserId = $localStorage.user ? $localStorage.user.id : null;

    vm.callback = callback;

    function onInit() {
    }

    function callback(row) {
        vm.rowCallback()(row);
    }
}
})();