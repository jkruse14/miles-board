(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('CustomTabsController', CustomTabsController);

    CustomTabsController.$inject = ['$scope','$uibModalInstance', 'Flash', 'Restangular'];

    function CustomTabsController($scope, $uibModalInstance, Flash, Restangular) {
        let vm = this;
        vm.filter_fields = ['Team Distance', 'Team Run Count'];
        vm.comparators = ['less than', 'less than or equal to', 'greater than', 'greater than or equal to', 'equal to'];
        vm.comparators_display = {
            lt:'less than',
            lte:'less than or equal to',
            gt: 'greater than',
            gte: 'greater than or equal to',
            eq: 'equal to'
        }

        vm.newTab = {
            heading: '',
            custom_filters:[]
        }

        vm.$onInit = onInit;
        vm.cancel = cancel;
        vm.save = save;
        vm.setFilterField = setFilterField;
        vm.setComparator = setComparator;
        vm.setValue = setValue;
        vm.deleteTab = deleteTab;

        function onInit() {
            vm.tabs = [];
            switch ($scope.$parent.tabAction){
                case 'add':
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
                    vm.showSecondCondition = false;
                break;
                case 'edit':
                    vm.tabs = $scope.$parent.tabs;
                    for (let i = 0; i < vm.tabs.length; i++) {
                        vm.tabs[i].is_open = false;
                        vm.tabs[i].disableSubmit = false;
                        if(vm.tabs[i].custom_filters[1].comparator === 'gte' && parseInt(vm.tabs[i].custom_filters[1].filter_value) === 0) {
                            vm.tabs[i].showSecondCondition = false;
                        } else {
                            vm.tabs[i].showSecondCondition = true;
                        }
                    }
                break;
            }
            vm.updatedFilters = [];
            vm.delete_first_click = false;
        }

        function validateTab() {
            let valid = false;
            switch($scope.$parent.tabAction) {
                case 'add':
                    //check that each filter is valid before being able to submit
                    let filter1_valid = vm.filter_fields.indexOf(vm.newTab.custom_filters[0].filter_field) !== -1 &&
                                        vm.comparators.indexOf(vm.comparators_display[vm.newTab.custom_filters[0].comparator]) !== -1 &&
                                        !isNaN(vm.newTab.custom_filters[0].filter_value) && vm.newTab.custom_filters[0].filter_value >= 0;

                    let filter2_valid = vm.showSecondCondition === false || (vm.showSecondCondition === true && (vm.filter_fields.indexOf(vm.newTab.custom_filters[1].filter_field) !== -1 &&
                                        vm.comparators.indexOf(vm.comparators_display[vm.newTab.custom_filters[1].comparator]) !== -1 &&
                                        !isNaN(vm.newTab.custom_filters[1].filter_value) && vm.newTab.custom_filters[1].filter_value >= 0));
                    
                    valid = filter1_valid && filter2_valid && (vm.newTab.heading !== '' && vm.newTab.heading !== undefined);
                break;
                case 'edit':
                break;
            }

            return valid;
        }

        function save() {
            let result = {};
            if($scope.$parent.tabAction === 'add'){
                let dbf = vm.newTab.custom_filters[0].filter_field;
                vm.newTab.custom_filters[0].filter_field = dbf;
                vm.newTab.custom_filters[1].filter_field = dbf;
                if (validateTab()){
                    if(vm.showSecondCondition === false) {
                        vm.newTab.custom_filters[1].filter_value = 0;
                        vm.newTab.custom_filters[1].comparator = 'gte';
                    }
                    result = vm.newTab;
                } else {
                    let message = 'Invalid Filter Inputs'
                    Flash.clear();
                    Flash.create('warning', message, 5000, {container: 'createTab_flash'}, true);
                    return;
                }
            } else if ($scope.$parent.tabAction === 'edit') {
                for (let i = 0; i < vm.tabs.length; i++) {
                    if (vm.tabs[i].showSecondCondition === false) {
                        vm.tabs[i].custom_filters[1].comparator = 'gte';
                         vm.tabs[i].custom_filters[1].filter_value = 0;
                    } 
                }
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
                    parsed = 'gte';
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
                if(val >= 0) {
                    vm.tabs[tab].custom_filters[filter].filter_value = val;
                    Flash.clear();
                } else {
                    vm.tabs[tab].custom_filters[filter].filter_value = 0
                    let message = 'The filter value must be at least 0';
                    Flash.clear();
                    Flash.create('warning', message, 0, { container: 'editTab_flash'}, true);
                }
            }
        }

        function deleteTab(tab) {
            vm.delete_first_click = false;
            Restangular.all('custom_tabs').customDELETE(vm.tabs[tab].id).then(function(resp){;
                vm.tabs.splice(tab,1);
                let message = 'Tab successfully deleted'
                Flash.clear();
                Flash.create('success', message, 0, { container: 'editTab_flash'}, true);
            });
        }
    }

})();
