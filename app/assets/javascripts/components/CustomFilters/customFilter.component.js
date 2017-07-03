(function(){
    'use strict';

    angular
        .module('milesBoard')
        .component('customFilter', {
            templateUrl: 'components/CustomFilters/_customFilter.html',
            controller: 'CustomFilterController',
            controllerAs: 'vm',
            bindings: {
                id: '@',
                objectType: '@',
                showFilterField: '<',
                fieldChange: '&',
                comparatorChange: '&',
                valueChange: '&'
            }
        })
})();