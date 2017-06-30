(function(){
    angular
        .module('milesBoard')
        .controller('NewMemberModalController', NewMemberModalController);

    NewMemberModalController.$inject = ['$scope','$uibModalInstance'];

    function NewMemberModalController($scope, $uibModalInstance) {
        let vm = this;
        
        vm.newMember = $scope.$parent.profileAction !== 'edit' ? 
                        {
                            first_name:'',
                            last_name:'',
                            email:'',
                            password: '',
                            password_confirmation: ''
                        } : 
                        $scope.user_for_modal;

        vm.showPasswordForm = $scope.$parent.profileAction;

        vm.save = save;
        vm.cancel = cancel;

        function save() {
            $uibModalInstance.close(vm.newMember);
        }

        function cancel() {
            $uibModalInstance.close('cancel');
        }

    }

})();