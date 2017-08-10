import template from './_customFilter.html'
(function(){
    'use strict';

    angular
        .module('milesBoard')
        .component('customFilter', {
            templateUrl: template,
            controller: 'CustomFilterController',
            controllerAs: 'vm',
            bindings: {
                index: '<',
                filterIndex: '<',
                objectType: '<',
                showFilterField: '<',
                fieldChange: '&',
                comparatorChange: '&',
                valueChange: '&',
                initialField: '<',
                initialComparator: '<',
                initialValue: '<'
            }
        })
})();