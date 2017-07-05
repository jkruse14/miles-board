(function(){
    'use strict';

    angular
        .module('milesBoard')
        .component('customFilter', {
            templateUrl: 'components/CustomFilters/_customFilter.html',
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