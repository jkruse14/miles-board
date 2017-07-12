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
    vm.setOrdering = setOrdering;
    vm.getValueForOrdering = getValueForOrdering;
    
    const ASC = 'asc';
    const DSC = 'dsc';
    vm.DSC = DSC;

    vm.ordering = {
        col: 'Name',
        dir: ASC
    }

    

    function onInit() {
        if(vm.rowCallback instanceof Array){
            vm.callbacks = vm.rowCallback;
        } else {
            vm.callbacks = [vm.rowCallback]
        }
        vm.callback = callback
    }

    function callback(row, index) {
        vm.callbacks[0]()[index](row);
    }

    function setOrdering(col) {
        vm.ordering.col = col;
        switch(vm.ordering.dir) {
            case ASC:
                vm.ordering.dir = DSC;
                break;
            case DSC:
                vm.ordering.dir = ASC;
                break;
            default:
                vm.ordering.dir = ASC;
                break;
        }
    }

    function getValueForOrdering(item) {
        return item[vm.ordering.col];
    }
}
})();