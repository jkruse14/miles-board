(function () {
    'use strict';

angular
    .module('milesBoard')
    .component('board', {
        templateUrl: 'components/board/_board.html',
        controller: 'BoardController',
        controllerAs: 'vm',
        bindings: {
            displayObjData: '<',
            displayObjConfig: '<',
            rowCallback: '&'
        }
    });
})();