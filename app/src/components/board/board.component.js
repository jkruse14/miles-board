import template from './_board.html'

(function () {
    'use strict';

angular
    .module('milesBoard')
    .component('board', {
        templateUrl: template,
        controller: 'BoardController',
        controllerAs: 'vm',
        bindings: {
            displayObjData: '<',
            displayObjConfig: '<',
            isOwner: '<',
            rowCallback: '&',
            showCallbackConditions:'&'
        }
    });
})();