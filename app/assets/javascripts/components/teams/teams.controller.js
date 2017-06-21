(function(){
    'use strict';

angular
    .module('milesBoard')
    .controller('TeamsController', TeamsController);

    TeamsController.$inject = ['$scope', '$stateParams', 'RunsApi', 'team', 'teams', 'TeamsApi', 'TeamsDisplayConfig', 'TeamMemberListsApi', '$uibModal' ,'UsersApi','UsersDisplayConfig'];

    function TeamsController($scope, $stateParams, RunsApi, team, teams, TeamsApi, TeamsDisplayConfig, TeamMemberListsApi, $uibModal , UsersApi, UsersDisplayConfig) {
        var vm = this;
        vm.team = team;
        vm.teams = teams.plain();
        vm.displayConfig = UsersDisplayConfig;

        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        vm.showAddRunToUser = showAddRunToUser;
        vm.showAddTeamMemberModal = showAddTeamMemberModal;
        vm.showUserProfileModal = showUserProfileModal;

        function onInit() {
            if ($stateParams.team_id) {
                vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig)
            } else {
                vm.displayObjData = buildDisplayObject(vm.teams, TeamsDisplayConfig)
            }
            
        }

        function onChanges(changes) {
            if ($stateParams.team_id) {
                vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig)
            } else {
                vm.displayObjData = buildDisplayObject(vm.teams, TeamsDisplayConfig)
            }
        }

        function buildDisplayObject(obj, config) {
            let displayObj = {};
            for (let j = 0; j < obj.length; j++) {
                for (let i = 0; i < config.headers.length; i++) {
                    if (!displayObj.hasOwnProperty(j)) {
                        displayObj[j] = {};
                    }
                    if(!displayObj[j].hasOwnProperty(config.headers[i].text)){
                        displayObj[j][config.headers[i].text] = { text: '', hidden: false };
                    }
                    
                    displayObj[j][config.headers[i].text].text = obj[j][(config.headers[i].text.toLowerCase()).replace(/\s/g, '_')];
                    displayObj[j][config.headers[i].text].hidden = config.headers[i].hidden;

                    if (config.headers[i].uiSref) {
                        displayObj[j][config.headers[i].text].uiSref = config.headers[i].uiSref + '({' + config.paramName + ':' + obj[j].id + '})';
                    }
                }

                if($stateParams.team_id){
                    displayObj[j]['Name'].text = obj[j].first_name + ' ' +obj[j].last_name
                }
            }

            return displayObj;
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
                // resolve: {
                //     items: function () {
                //         return vm.items;
                //     }
                // }
            });

            modalInstance.result.then(function (result) {
                UsersApi.service.get('',{email:result.email}).then(function(response){
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
                        })
                    } else {
                        let newUser = { 
                            user:{
                                first_name : result.first_name,
                                last_name: result.last_name,
                                email : result.email,
                                team_id: $stateParams.team_id,
                                password : 'test1234',
                                password_confirmation: 'test1234',
                                //type: 'user'
                            }
                        }

                        UsersApi.service.post(newUser).then(function(result){
                            let user = {
                                id: result.id,
                                first_name: newUser.user.first_name,
                                last_name: newUser.user.last_name,
                                team_distance: 0,
                                team_run_count: 0
                            }
                            vm.team.users.push(user);
                            vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig)
                        });
                    }
                }, function () {});
            })
        };

        function showAddRunToUser(input) {
            // var parentElem = parentSelector ?
            //     angular.element($document[0].querySelector('.page-container ' + parentSelector)) : undefined;
            let user_id = input.id.text; //contains user id
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modals/AddRunToUser/_addRunToUser.html',
                controller: 'AddRunToUserController',
                controllerAs: 'vm',
                size: 'md',
                // appendTo: parentElem,
            });

            modalInstance.result.then(function (result) {
                let newRun = {
                    run: {
                        distance: result.distance,
                        run_date: result.run_date,
                        team_id:  $stateParams.team_id,
                        user_id:  user_id
                    }
                }

                RunsApi.post(newRun).then(function (api_result) {
                    for(let i = 0; i < vm.team.users.length; i++) {
                        if(vm.team.users[i].id === parseInt(user_id)) {
                            vm.team.users[i].team_distance = parseInt(vm.team.users[i].team_distance) + parseInt(result.distance);
                            vm.team.users[i].team_run_count = parseInt(vm.team.users[i].team_run_count) + 1;
                            vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig)
                            break;
                        }
                    }
                });
            }, function (reason) {
                if(reason !== 'cancel') {
                    console.error(reason);
                }
             });
        }
    };

    function showUserProfileModal(user_id) {

    }

})();