(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('EditRunModalController', EditRunModalController);

    EditRunModalController.$inject = ['$scope', '$uibModalInstance'];

    function EditRunModalController($scope, $uibModalInstance) {
        let vm = this;

        vm.run.distance = parseInt($scope.editing_run.Distance.text);
        vm.run.run_date = $scope.editing_run['Run Date'].text === '--' ? new Date() : moment($scope.editing_run['Run Date'].text);


        vm.$onInit = onInit;
        vm.save = save;
        vm.cancel = cancel;

        function save() {
            $uibModalInstance.close({id:parseInt($scope.editing_run.id.text),
                                     team_id: parseInt($scope.editing_run.Team.team_id),
                                     distance: vm.run.distance,
                                     run_date: vm.run.run_date});
        }

        function cancel() {
            $uibModalInstance.close('cancel');
        }
        
        function onInit() {
            vm.run.distance = parseInt($scope.editing_run.Distance.text);
            vm.run.run_date = $scope.editing_run['Run Date'].text === '--' ? new Date() : moment($scope.editing_run['Run Date'].text);
            
            vm.today = moment();
            vm.dateOptions = {
                maxDate: new Date(),
            };
        }
    }
})();