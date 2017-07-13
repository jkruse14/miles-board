(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('CustomFilterController', CustomFilterController);

    CustomFilterController.$inject = [];

    function CustomFilterController() {
        let vm = this;

        vm.filter_fields = ['Team Distance', 'Team Runs Count'];
        vm.comparators = ['less than', 'less than or equal to', 'greater than', 'greater than or equal to', 'equal to'];
        vm.comparators_display = {
            lt: 'less than',
            lte: 'less than or equal to',
            gt: 'greater than',
            gte: 'greater than or equal to',
            eq: 'equal to'
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
            vm.selectedField = field;
            vm.fieldChange()(vm.index, vm.filterIndex, field);
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
