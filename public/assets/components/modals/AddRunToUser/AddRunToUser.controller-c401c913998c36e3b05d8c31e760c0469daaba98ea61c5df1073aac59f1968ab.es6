(function () {
    'use strict';

    angular
        .module('milesBoard')
        .controller('AddRunToUserController', AddRunToUserController);

    AddRunToUserController.$inject = ['$scope', '$uibModalInstance'];

    function AddRunToUserController($scope, $uibModalInstance) {
        let vm = this;
        
        vm.$onInit = onInit;
        vm.save = save;
        vm.cancel = cancel;

        function onInit() {
            vm.cal_opened = false;
            vm.run = {
                user_id: '',
                distance: 0,
                run_date: new Date(),
            };
            vm.dateOptions = {
                maxDate: new Date(),
            };
        }

        function save(user_id) {
            vm.run.user_id = user_id;
            $uibModalInstance.close(vm.run);
        }

        function cancel() {
            $uibModalInstance.close(null);
        }

    }

})();
