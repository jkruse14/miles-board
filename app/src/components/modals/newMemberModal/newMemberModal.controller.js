import teamMemberForm from './_newMemberForm.html';
(function(){
    angular
        .module('milesBoard')
        .controller('NewMemberModalController', NewMemberModalController);

    NewMemberModalController.$inject = ['$scope','$uibModalInstance', 'Flash', 'MilesBoardApi'];

    function NewMemberModalController($scope, $uibModalInstance, Flash, MilesBoardApi) {
        let vm = this;
        vm.teamMemberForm = teamMemberForm;
        vm.showPasswordFields = false;
        vm.waiverUrl = 'teams/'+$scope.team_id+'/waiver.txt';
        vm.showWaiver = false;
        vm.waiverAgree = false;
        vm.updating = $scope.$parent.profileAction === 'edit'
        vm.newMember = $scope.$parent.profileAction !== 'edit' ? 
                        {
                            first_name:'',
                            last_name:'',
                            email:'',
                            password: '',
                            password_confirmation: '',
                            team_id: $scope.team_id
                        } : 
                        $scope.user_for_modal;
        
        vm.disableSubmit = !vm.newMember.first_name || !vm.newMember.last_name || !vm.waiverAgree;

        vm.showPasswordForm = $scope.$parent.profileAction;

        vm.save = save;
        vm.cancel = cancel;
        vm.handleFieldUpate = handleFieldUpate;

        function showPasswordFieldsChange() {
            if(!vm.showPasswordFields) {
                vm.newMember.password = '';
                vm.newMember.password_confirmation = '';
            }
        }

        function save() {
            if(vm.newMember.email){
                MilesBoardApi.UsersApi.get('', { email: vm.newMember.email }).then(function (response) {
                    response = response.plain();
                    if (response.user && response.user.id) {
                        let found = false;
                        for(let i = 0; i < response.user.teams.length; i++) {
                            if(response.user.teams[i].id === parseInt($scope.team_id)) {
                                found = true;
                                break;
                            }
                        }

                        if(!found) {
                            let user = {
                                id: response.user.id,
                                first_name: response.user.first_name,
                                last_name: response.user.last_name,
                                team_distance: 0,
                                team_run_count: 0
                            }
                            if($scope.team_id){
                                MilesBoardApi.TeamMemberListsApi.post({
                                    user_id: response.user.id,
                                    team_id: parseInt($scope.team_id),
                                }).then(function (post_result) {
                                    $uibModalInstance.close(user);
                                }, function (reason) {
                                    $uibModalInstance.close(reason);
                                });
                            } else {
                                $uibModalInstance.close(user);
                            }
                        } else {
                            let message = 'A user with that email is already on this team ('+response.user.first_name+' '+response.user.last_name+')'; 
                            Flash.create('warning',message, 5000, {container: 'newmember-flash'}, true);
                        }

                    } else {
                        createNewUser(vm.newMember).then(function (result) {
                            let user = {
                                id: result.id,
                                first_name: vm.newMember.first_name,
                                last_name: vm.newMember.last_name,
                                team_distance: 0,
                                team_run_count: 0
                            }
                            $uibModalInstance.close(user);
                        },
                            function (reason) {
                                $uibModalInstance.close(reason);
                            });
                    }
                }, function () { });
            } else {
                createNewUser(vm.newMember).then(function(result){
                    let user = {
                        id: result.id,
                        first_name: vm.newMember.first_name,
                        last_name: vm.newMember.last_name,
                        team_distance: 0,
                        team_run_count: 0
                        }  
                    $uibModalInstance.close(user);
                },
                function(reason) {
                    $uibModalInstance.close(reason);
                });
            }
            
        }

        function cancel() {
            $uibModalInstance.close(null);
        }

        function createNewUser(user) {
            let newUser = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                team_id: user.team_id,
                password: user.password,
                password_confirmation: user.password_confirmation,
            }

            if ($scope.team_id) {
                user.team_id = $scope.team_id;
            }

            return MilesBoardApi.UsersApi.post(newUser);
        }

        function handleFieldUpate() {
            vm.disableSubmit = !vm.newMember.first_name || !vm.newMember.last_name || !vm.waiverAgree;
        }

    }

})();