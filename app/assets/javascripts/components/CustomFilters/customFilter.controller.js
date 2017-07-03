(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('CustomFilterController', CustomFilterController);

    CustomFilterController.$inject = [];

    function CustomFilterController() {
        let vm = this;

        vm.filter_fields = ['miles', 'runs'];
        vm.comparators = ['less than', 'less than or equal to', 'greater than', 'greater than or equal to', 'equal to'];
        vm.comparators_display = {
            lt: 'less than',
            lte: 'less than or equal to',
            gt: 'greater than',
            gte: 'greater than or equal to',
            eq: 'equal to'
        }

        let dataObj_fields = {
            miles: 'Team Distance',
            runs: 'Team Run Count'
        }
        
        vm.selectedField = '(select field)';
        vm.selectedComparator = '(select comparison)'

        vm.filter = {
            filter_field: '(select field)',
            filter_value: '',
            comparator: '(select comparison)'
        }

        vm.onFilterFieldChange = onFilterFieldChange;
        vm.onComparatorChange = onComparatorChange;
        vm.onValueChange = onValueChange;

        function onFilterFieldChange(field) {
            vm.selectedField = field;
            vm.fieldChange()(vm.id, field);
        }

        function onComparatorChange(comp) {
            vm.selectedComparator = vm.comparators_display[comp];
            vm.comparatorChange()(vm.id, comp);
        }

        function onValueChange(v) {
            vm.valueChange()(vm.id, v);
        }
    }
})();