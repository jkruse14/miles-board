(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('CustomTabsController', CustomTabsController);

    CustomTabsController.$inject = ['$scope','$uibModalInstance'];

    function CustomTabsController($scope, $uibModalInstance) {
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

        vm.tabs = [];
        if($scope.$parent.tabAction === 'edit') {
            vm.tabs = $scope.$parent.tabs;
            for(let i = 0; i < vm.tabs.length; i++) {
                vm.tabs[i].is_open = false;
            }
        }

        let dataObj_fields = {
            miles: 'Team Distance',
            runs: 'Team Run Count'
        }

        vm.newTab = {
            heading: '',
            custom_filters:[]
        }

        vm.valid_inputs = {
            field: false,
            comparator: false
        }

        vm.$onInit = onInit;
        vm.cancel = cancel;
        vm.save = save;
        vm.setFilterField = setFilterField;
        vm.setComparator = setComparator;
        vm.setValue = setValue;

        function onInit() {
            if ($scope.$parent.tabAction === 'add'){
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

                vm.newTab.custom_filters = [filter1, filter2];
            }
            vm.updatedFilters = [];
        }

        function save() {
            let result = {};
            if($scope.$parent.tabAction === 'add'){
                let dbf = dataObj_fields[vm.filter1.filter_field]
                vm.filter1.filter_field = dbf;
                vm.filter2.filter_field = dbf;
                let result = {
                    newTab: vm.newTab,
                    filter1 : vm.filter1,
                    filter2 : vm.filter2
                }
            } else if ($scope.$parent.tabAction === 'edit') {
                result = vm.tabs;
            }
            $uibModalInstance.close(result);
        }

        function cancel() {
            $uibModalInstance.close(null);
        }

        function setFilterField(tab, filter, field) {
            if(vm.updatedFilters.indexOf(filter) === -1) {
                vm.updatedFilters.push(filter);
            }
            
            if ($scope.$parent.tabAction === 'add') {
                vm.newTab.custom_filters[filter].filter_field = field;
            } else {
                vm.tabs[tab].custom_filters[filter].filter_field = field;
            }            
        }

        function setComparator(tab, filter, comp) {
            if (vm.updatedFilters.indexOf(filter) === -1) {
                vm.updatedFilters.push(filter);
            }

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

            if ($scope.$parent.tabAction === 'add') {
                vm.newTab.custom_filters[filter].comparator = parsed;
            } else {
                vm.tabs[tab].custom_filters[filter].comparator = comp;
            }
        }

        function setValue(tab, filter, val) {
            if (vm.updatedFilters.indexOf(filter) === -1) {
                vm.updatedFilters.push(filter);
            }

            if ($scope.$parent.tabAction === 'add') {
                vm.newTab.custom_filters[filter].filter_value = val;
            } else {
                vm.tabs[tab].custom_filters[filter].filter_value = val;
            }
        }
    }

})();