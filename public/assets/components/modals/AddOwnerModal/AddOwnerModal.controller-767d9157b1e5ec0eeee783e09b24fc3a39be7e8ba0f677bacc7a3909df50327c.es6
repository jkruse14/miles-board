(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('AddOwnerModalController', AddOwnerModalController);

    AddOwnerModalController.$inject = ['$scope', '$uibModalInstance'];

    function AddOwnerModalController($scope, $uibModalInstance) {
        let vm = this;
        vm.users = $scope.$parent.vm.team.users;
        vm.owner_ids = $scope.$parent.vm.owner_ids;

        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        vm.updateOwnersList = updateOwnersList;
        vm.save = save;
        vm.close = close;

        function onInit(){
        }

        function onChanges() {
            if($scope.query === '') {
                vm.users = $scope.$parent.vm.team.users;
            }
        }

        function updateOwnersList(user) {
            let index = vm.owner_ids.indexOf(user.id);
            if(index === -1) {
                vm.owner_ids.push(user.id);
            } else {
                vm.owner_ids.splice(index, 1);
            }
        }

        function save() {
            $uibModalInstance.close(vm.owner_ids);
        }

        function close() {
            $uibModalInstance.close(null);
        }
    }
})();
