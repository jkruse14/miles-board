(function(){
    'use strict';

angular
    .module('milesBoard')
    .controller('TeamsController', TeamsController);

TeamsController.$inject = ['$localStorage', '$scope', '$stateParams', 'MilesBoardApi', 
                                'team', 'teams', 'TeamsDisplayConfig', 
                                'TeamMemberListsApi', '$uibModal','UsersDisplayConfig'];

    function TeamsController($localStorage, $scope, $stateParams, MilesBoardApi, 
                             team, teams, TeamsDisplayConfig, 
                             TeamMemberListsApi, $uibModal, UsersDisplayConfig) {
        let vm = this;
        vm.team = team;
        vm.teams = teams.plain();
        vm.loggedIn = $localStorage.user ? true : false;
        vm.isTeamOwner = vm.loggedIn && ($localStorage.user.id === vm.team.team_owner_id)
        
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        vm.showAddRunToUser = showAddRunToUser;
        vm.showAddTeamMemberModal = showAddTeamMemberModal;
        vm.showUserProfileModal = showUserProfileModal;

        function onInit() {
            setUpTable();
        }

        function onChanges(changes) {
            setUpTable();
        }

        function setUpTable() {
            if ($stateParams.team_id) {
                vm.displayConfig = UsersDisplayConfig;
                vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig)
            } else {
                vm.displayConfig = TeamsDisplayConfig;
                vm.displayObjData = buildDisplayObject(vm.teams, TeamsDisplayConfig)
            }
        }

        function buildDisplayObject(obj, config) {
            let displayObj = [];
            
            for (let j = 0; j < obj.length; j++) {
                let item = {};
                for (let i = 0; i < config.headers.length; i++) {
                    if(!item.hasOwnProperty(config.headers[i].text)){
                        item[config.headers[i].text] = { text: '', hidden: false };
                    }
                    
                    item[config.headers[i].text].text = obj[j][(config.headers[i].text.toLowerCase()).replace(/\s/g, '_')];
                    item[config.headers[i].text].hidden = config.headers[i].hidden;

                    if (config.headers[i].uiSref && vm.loggedIn) {
                        item[config.headers[i].text].uiSref = config.headers[i].uiSref + '({' + config.paramName + ':' + obj[j].id + '})';
                    }
                }

                if($stateParams.team_id){
                    item['Name'].text = obj[j].first_name + ' ' +obj[j].last_name
                }
                displayObj.push(item);
            }

            return displayObj;
        }

        function teamMemberAddSuccessFlash() {
            let message = 'New Team Member Successfully Created!';
            Flash.create('success', message, 5000, { container: 'index_flash' }, true)
        }

        function teamMemberAddFailFlash(reason) {
            let message = 'There was an error while creating a new team member:<br />'
            message += MilesBoardApi.errorReader(reason);
            Flash.create('danger', message, 0, { container: 'index_flash' }, true)
        }

        function showAddTeamMemberModal(parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.page-container ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modals/newMemberModal/_newMemberModal.html',
                controller: 'NewMemberModalController',
                controllerAs: 'vm',
                size: 'md',
                appendTo: parentElem,
                scope: {
                    profileAction: 'create'
                }
            });

            modalInstance.result.then(function (result) {
                Flash.clear();
                MilesBoardApi.UsersApi.get('',{email:result.email}).then(function(response){
                    if(response.id) {
                        let user = {
                            id: response.id,
                            first_name: response.first_name,
                            last_name: response.last_name,
                            team_distance: 0,
                            team_run_count: 0
                        }
                        TeamMemberListsApi.post({
                            user_id: response.id,
                            team_id: $stateParams.team_id,
                        }).then(function(post_result){
                            vm.team.users.push(user);
                            vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig)
                            teamMemberAddSuccessFlash();
                        }, function(reason) {
                            teamMemberAddFailFlash(reason)
                        })
                    } else {
                        let newUser = { 
                            user:{
                                first_name : result.first_name,
                                last_name: result.last_name,
                                email : result.email,
                                team_id: $stateParams.team_id,
                                password : result.password,
                                password_confirmation: result.password_confirmation,
                            }
                        }

                        MilesBoardApi.UsersApi.post(newUser).then(function(result){
                            let user = {
                                id: result.id,
                                first_name: newUser.user.first_name,
                                last_name: newUser.user.last_name,
                                team_distance: 0,
                                team_run_count: 0
                            }
                            vm.team.users.push(user);
                            vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig)

                            teamMemberAddSuccessFlash();
                        },
                        function(reason) {
                           teamMemberAddFailFlash(reason);
                        });
                    }
                }, function () {});
            })
        };

        function showAddRunToUser(input) {let user_id = input.id.text; //contains user id
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modals/AddRunToUser/_addRunToUser.html',
                controller: 'AddRunToUserController',
                controllerAs: 'vm',
                size: 'md',
            });

            modalInstance.result.then(function (result) {
                Flash.clear();
                let newRun = {
                    run: {
                        distance: result.distance,
                        run_date: result.run_date,
                        team_id:  $stateParams.team_id,
                        user_id:  user_id
                    }
                }

                MilesBoardApi.RunsApi.post(newRun).then(function (api_result) {
                    for(let i = 0; i < vm.team.users.length; i++) {
                        if(vm.team.users[i].id === parseInt(user_id)) {
                            vm.team.users[i].team_distance = parseInt(vm.team.users[i].team_distance) + parseInt(result.distance);
                            vm.team.users[i].team_run_count = parseInt(vm.team.users[i].team_run_count) + 1;
                            vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig);
                            break;
                        }
                    }

                    let message = 'Run Successfully Added!'
                    Flash.create('success', message, 5000, { container: 'index_flash'}, true);
                });
            }, function (reason) {
                let message = 'An error occured while saving your run:<br />';
                message += MilesBoardApi.errorReader(reason);
                Flash.create('danger', message, 0, { container: 'index_flash'}, true)
             });
        }
    };

    function showUserProfileModal(user_id) {

    }

})();