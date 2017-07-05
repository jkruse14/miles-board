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

        vm.$onInit = onInit;
        vm.onFilterFieldChange = onFilterFieldChange;
        vm.onComparatorChange = onComparatorChange;
        vm.onValueChange = onValueChange;

        function onInit() {
            vm.selectedField = vm.initialField || '(select field)';
            vm.selectedComparator = vm.comparators_display[vm.initialComparator] || '(select comparison)';
            vm.filter = {
                filter_field: vm.selectedField,
                filter_value: parseInt(vm.initialValue),
                comparator: vm.selectedComparator
            }
        }

        function onFilterFieldChange(field) {
            vm.selectedField = dataObj_fields[field];
            vm.fieldChange()(vm.index, vm.index, dataObj_fields[field]);
        }

        function onComparatorChange(comp) {
            vm.selectedComparator = comp;
            vm.comparatorChange()(vm.index, vm.filterIndex, comp);
        }

        function onValueChange(v) {
            vm.valueChange()(vm.index, vm.filterIndex, v);
        }
    }
})();