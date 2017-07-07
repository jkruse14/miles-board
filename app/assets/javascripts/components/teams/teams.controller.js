(function(){
    'use strict';

angular
    .module('milesBoard')
    .controller('TeamsController', TeamsController);

TeamsController.$inject = ['$localStorage', '$scope', '$stateParams', 'boardFilterFilter', 'Flash', 
                           'MilesBoardApi', 'team', 'teams', 'TeamDisplayConfig', 'TeamsDisplayConfig', 
                           '$uibModal','UsersDisplayConfig'];

function TeamsController($localStorage, $scope, $stateParams, boardFilterFilter, Flash, 
                          MilesBoardApi, team, teams, TeamDisplayConfig, TeamsDisplayConfig, 
                        $uibModal, UsersDisplayConfig) {
        let vm = this;
        vm.team = $stateParams.team_id ? team.plain().team : null;
        vm.teams = teams ? teams.plain() : null;
        vm.loggedIn = $localStorage.user ? true : false;
        
        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        vm.showAddRunToUser = showAddRunToUser;
        vm.showAddTeamMemberModal = showAddTeamMemberModal;
        vm.showUserProfileModal = showUserProfileModal;
        vm.showFilteredTable = showFilteredTable;
        vm.showCustomTabsModal = showCustomTabsModal;
        vm.showAddRunButton = showAddRunButton;
        vm.showJoinTeamButton = showJoinTeamButton;
        vm.joinTeam = joinTeam;
        vm.showAddTeamOwnerModal = showAddTeamOwnerModal;

        function onInit() {
            if ($stateParams.team_id) {
                vm.team.users = team.plain().users;

                vm.owner_ids = [];
                for (let i = 0; i < vm.team.team_owners.length; i++) {
                    vm.owner_ids.push(vm.team.team_owners[i].id);
                }

                vm.isTeamOwner = vm.loggedIn && vm.owner_ids.indexOf($localStorage.user.id) !== -1
            }
            
            setUpTable();
            vm.originalDisplayData = angular.merge([], vm.displayObjData);
        }

        function onChanges(changes) {
            setUpTable();
        }

        function setUpTable() {
            if ($stateParams.team_id) {
                vm.displayConfig = UsersDisplayConfig;
                vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig);
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

        function showFilteredTable(tab) {
            if(tab === 0) {
                setUpTable();
            } else {
                let filtered = angular.merge([],vm.originalDisplayData);
                for(let i = 0; i < vm.team.custom_tabs[tab-1].custom_filters.length; i++) {
                    if (parseInt(vm.team.custom_tabs[tab - 1].custom_filters[i].value) === 0 && 
                        (vm.team.custom_tabs[tab - 1].custom_filters[i].comparator === 'gt' ||
                        vm.team.custom_tabs[tab - 1].custom_filters[i].comparator === 'gte')) {
                            continue; // 0 is the minimum, so everything will be >, >= 0
                        }
                    filtered = boardFilterFilter(filtered, vm.team.custom_tabs[tab-1].custom_filters[i]);
                }

                vm.displayObjData = filtered;
            }

        }

        function teamMemberAddSuccessFlash() {
            let message = 'New Team Member Successfully Created!';
            Flash.create('success', message, 5000, { container: 'index_flash' }, true)
        }

        function teamMemberAddFailFlash(reason) {
            let message = 'There was an error while creating a new team member:<br />'
            message += MilesBoardApi.errorReader(reason.data);
            Flash.create('danger', message, 0, { container: 'index_flash' }, true)
        }

        function showAddRunButton(user_row) {
            return (vm.loggedIn && (vm.isTeamOwner || $localStorage.user.id == parseInt(user_row.id.text)));
        }

        function showJoinTeamButton(row) {
            let notOnTeam = true
            if($localStorage.user.team_ids){
                notOnTeam = $localStorage.user.team_ids.indexOf(row.id.text) === -1;
            }
            return notOnTeam;
        }

        function joinTeam(team_row) {
            MilesBoardApi.TeamMemberListsApi.post({ team_id: team_row.id.text, user_id: $localStorage.user.id }).then(
                function (resp) {
                    $localStorage.user.teams.push({ id: team_row.id.text, name: team_row['Name'].text })
                    $localStorage.user.team_ids.push(team_row.id.text)
                    let message = 'You have been added as a member to ' + team_row['Name'].text;
                    Flash.create('success', message, 5000, { container: 'index_flash' }, true);
                },
                function (reason) {
                    let message = 'Whoops... There was an error with your request, please try again later'
                    Flash.create('danger', message, 5000, { container: 'index_flash' }, true);
                }
            )
        }

        ///// MODALS /////

        function showAddTeamMemberModal(parentSelector) {
            var parentElem = parentSelector ?
                angular.element($document[0].querySelector('.page-container ' + parentSelector)) : undefined;
            
            $scope.profileAction = 'create';
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modals/newMemberModal/_newMemberModal.html',
                controller: 'NewMemberModalController',
                controllerAs: 'vm',
                size: 'md',
                appendTo: parentElem,
                scope: $scope
            });

            modalInstance.result.then(function (result) {
                Flash.clear();
                if(result){
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
                                    first_name : result.first_name,
                                    last_name: result.last_name,
                                    email : result.email,
                                    team_id: $stateParams.team_id,
                                    password : result.password,
                                    password_confirmation: result.password_confirmation,
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
                }
            })
        };

        function showAddTeamOwnerModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modals/AddOwnerModal/_addOwnerModal.html',
                controller: 'AddOwnerModalController',
                controllerAs: 'vm',
                size: 'md',
                scope: $scope
            });

            modalInstance.result.then(function (result) {
                Flash.clear();
                if (result) {
                    Flash.clear();
                    MilesBoardApi.TeamOwnerListsApi.updateOwners({team_id: $stateParams.team_id, owners_list: result}).then(function (response) {
                            let message = 'Team owners successfully updated!'
                            Flash.create('success', message, 5000, {container: 'index_flash'}, true);
                    },
                    function(reason) {
                        let message = 'Whoops... there was an error updating the team owners<br />';
                        message += MilesBoardApi.errorReader(reason.data);
                        Flash.create('danger', message, 0, {container: 'index_flash'}, true);
                    });
                }
            });
        };

        function showAddRunToUser(input) {
            let user_id = input.id.text; //contains user id
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
                if(result) {
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
                }
                }, function (reason) {
                    let message = 'An error occured while saving your run:<br />';
                    message += MilesBoardApi.errorReader(reason);
                    Flash.create('danger', message, 0, { container: 'index_flash'}, true)
                });
        }

    function showCustomTabsModal(action) {
        $scope.tabAction = action
        $scope.tabs = [];
        let template = 'components/modals/CustomTabsModal/_createTabModal.html'
        if(action === 'edit') {
            $scope.tabs = vm.team.custom_tabs;
            template = 'components/modals/CustomTabsModal/_editTabModal.html'
        } 
        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: template,
            controller: 'CustomTabsController',
            controllerAs: 'vm',
            size: 'md',
            scope: $scope
        });

        modalInstance.result.then(function (result) {
            Flash.clear();
            if(result){
                if($scope.tabAction === 'add') {
                    result.team_id = $stateParams.team_id;         
                    MilesBoardApi.CustomTabsApi.post(result).then(function (api_result) {
                        result.id = api_result.plain().id;
                        let filter1 = result.custom_filters[0];
                        filter1.custom_tab_id = api_result.plain().id;
                        filter1.object_type = 'team';
                        let filter2 = result.custom_filters[1];
                        filter2.custom_tab_id = api_result.plain().id;
                        filter2.object_type = 'team';
                        
                        MilesBoardApi.CustomFiltersApi.post(filter1).then(function(f1_resp) {
                            MilesBoardApi.CustomFiltersApi.post(filter2).then(function(f2_resp){
                                result.custom_filters = [];
                                result.custom_filters.push(filter1, filter2);
                                vm.team.custom_tabs.push(result);

                                let message = 'Tab Successfully Created!'
                                Flash.create('success', message, 5000, { container: 'index_flash' }, true);
                            }, function(reason) {
                                let message = 'An error occured while creating the second condition of your tab:<br />';
                                message += MilesBoardApi.errorReader(reason.data);
                                Flash.create('danger', message, 0, { container: 'index_flash' }, true);
                            })
                        }, function(reason) {
                            let message = 'An error occured while creating the first condition of your tab:<br />';
                            message += MilesBoardApi.errorReader(reason.data);
                            Flash.create('danger', message, 0, { container: 'index_flash' }, true);
                        });
                    });
                } else if ($scope.tabAction === 'edit') {
                    let updates = {tabs: result}
                    MilesBoardApi.put('custom_tabs', updates);
                }
            }
        }, function (reason) {
            let message = 'An error occured while creating your tab:<br />';
            message += MilesBoardApi.errorReader(reason.data);
            Flash.create('danger', message, 0, { container: 'index_flash' }, true);
        });
    }

    function showUserProfileModal(user_id) {

    }
}

})();