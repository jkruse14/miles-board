(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('CreateTeamModalController', CreateTeamModalController)

    CreateTeamModalController.$inject = ['$localStorage','$uibModalInstance'];

    function CreateTeamModalController($localStorage, $uibModalInstance) {
        let vm = this;

        vm.newTeam = {
            name: '',
            location: '',
            contact_email: ''
        };

        vm.cancel = cancel;
        vm.save = save;

        function save() {
            if ($localStorage.user && $localStorage.user.id) {
                vm.newTeam.team_owner_id = $localStorage.user.id
                $uibModalInstance.close(vm.newTeam);
            }
        }

        function cancel() {
            $uibModalInstance.close(null);
        }
    }
})();
