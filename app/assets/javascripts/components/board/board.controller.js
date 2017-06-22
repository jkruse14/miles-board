(function(){
    'use strict';

angular
    .module('milesBoard')
    .controller('BoardController', BoardController);

BoardController.$inject = ['$scope'];//'displayObj','displayObjConfig'];

function BoardController($scope) {
    var vm = this;
    vm.$onInit = onInit;

    vm.callback = callback;

    function onInit() {
    }

    function callback(row) {
        vm.rowCallback()(row);
    }
}
})();