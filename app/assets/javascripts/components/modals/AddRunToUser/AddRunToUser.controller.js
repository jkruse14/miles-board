(function () {
    'use strict';

    angular
        .module('milesBoard')
        .controller('AddRunToUserController', AddRunToUserController);

    AddRunToUserController.$inject = ['$scope', '$uibModalInstance'];

    function AddRunToUserController($scope, $uibModalInstance) {
        let vm = this;
        vm.run = {
            user_id: '',
            distance: 0,
            run_date: '',
        };

        vm.save = save;
        vm.cancel = cancel;

        function save(user_id) {
            vm.run.user_id = user_id;
            $uibModalInstance.close(vm.run);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

    }

})();