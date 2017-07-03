(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('CustomTabsController', CustomTabsController);

    CustomTabsController.$inject = ['$uibModalInstance'];

    function CustomTabsController($uibModalInstance) {
        let vm = this;
        vm.filter_fields = ['miles', 'runs'];
        vm.comparators = ['less than', 'less than or equal to', 'greater than', 'greater than or equal to', 'equal to'];
        vm.comparators_display = {
            lt:'less than',
            lte:'less than or equal to',
            gt: 'greater than',
            gte: 'greater than or equal to',
            eq: 'equal to'
        }

        let dataObj_fields = {
            miles: 'Team Distance',
            runs: 'Team Run Count'
        }

        let filter1 = {
            filter_field: '(select field)',
            filter_value: '',
            comparator: '(select comparison)'
        };

        let filter2 = {
            filter_field: filter1.filter_field,
            filter_value: '',
            comparator: '(select comparison)'
        };

        vm.filters = [filter1, filter2];

        vm.newTab = {
            heading: ''
        }

        vm.valid_inputs = {
            field: false,
            comparator: false
        }

        vm.cancel = cancel;
        vm.save = save;
        vm.setFilterField = setFilterField;
        vm.setComparator = setComparator;
        vm.setValue = setValue;

        function save() {
            let dbf = dataObj_fields[vm.filter1.filter_field]
            vm.filter1.filter_field = dbf;
            vm.filter2.filter_field = dbf;
            let result = {
                newTab: vm.newTab,
                filter1 : vm.filter1,
                filter2 : vm.filter2
            }
            $uibModalInstance.close(result);
        }

        function cancel() {
            $uibModalInstance.close(null);
        }

        function setFilterField(filter, field) {
            vm.filters[filter].field = field;            
        }

        function setComparator(filter, comp) {
            let parsed = ''
            switch(comp) {
                case 'less than':
                    parsed = 'lt';
                    break;
                case 'less than or equal to':
                    parsed = 'lte';
                    break;
                case 'greater than':
                    parsed = 'gt';
                    break;
                case 'greater than or equal to':
                    parsed = 'gte';
                    break;
                case 'equal to':
                    parsed = 'eq';
                    break;
                default:
                    parsed = 'lt';
                    break;
            }

            vm.filters[filter].comparator = parsed;
        }

        function setValue(filter, val) {
            vm.filters[filter].vaule = val
        }
    }

})()