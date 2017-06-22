(function(){
    angular
        .module('milesBoard')
        .controller('NewMemberModalController', NewMemberModalController);

    NewMemberModalController.$inject = ['$scope','$uibModalInstance'];

    function NewMemberModalController($scope, $uibModalInstance) {
        let vm = this;
        vm.newMember = {
            first_name:'',
            last_name:'',
            email:''
        };

        vm.save = save;
        vm.cancel = cancel;

        function save() {
            $uibModalInstance.close(vm.newMember);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

    }

})();