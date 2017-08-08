(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('UserProfileModalController', UserProfileModalController);

    UserProfileModalController.$inject = ['$filter','$localStorage', '$q', '$scope', 'Flash', 'MilesBoardApi', 'MilesBoardImages',  
                                          'RunsDisplayConfig', 'TeamDisplayConfig', '$uibModalInstance', '$rootScope'];

    function UserProfileModalController($filter, $localStorage, $q, $scope, Flash, MilesBoardApi, MilesBoardImages, 
                                        RunsDisplayConfig, TeamDisplayConfig, $uibModalInstance, $rootScope) {
        let vm = this;
        let PROFILE_MODAL_FLASH = 'profile-modal-flash';
        vm.user = $scope.user.user;

        const userTypes = {
            TEAM_OWNER: 'TeamOwner',
            USER: 'User'
        }

        vm.loggedIn = $localStorage.user ? true : false;
        vm.profileImageSrc = MilesBoardImages.road_runner;
        vm.myProfile = (vm.loggedIn && vm.user.id === $localStorage.user.id);

        vm.tabs = [
            { title: 'Teams', hidden: false },
            { title: 'Owned Teams', hidden: vm.user.type !== userTypes.TEAM_OWNER }
        ];

        vm.$onInit = onInit;
        vm.setTab = setTab;
        vm.close = close;
        vm.save = save;
        vm.showCallbackConditions = showCallbackConditions;
        vm.showEditRunModalClick = showEditRunModalClick;
        vm.showDeleteRunConfirmation = showDeleteRunConfirmation;

        function onInit() {
            vm.TeamDisplayConfig = TeamDisplayConfig;
            vm.RunsDisplayConfig = RunsDisplayConfig;

            vm.TeamDisplayConfig.showCallback = false;
            vm.TeamDisplayConfig.hideSearch = true;
            vm.TeamDisplayConfig.hideHeaderRow = true;

            vm.RunsDisplayConfig.showCallback = vm.myProfile;
            vm.RunsDisplayConfig.hideSearch = true;

            vm.showCreateTeamButton = getShowCreateTeamButton();
            vm.showUpdateProfileButton = vm.user.email.includes('milesboardimport') && (vm.user.id === $localStorage.user.id || $scope.owner_ids.indexOf($localStorage.user.id) !== -1);
            vm.showNewMemberForm = false;
            vm.showCreateTeamForm = false;
            vm.showEditRunModal = false;
            vm.showConfirmationDialog = false;

            if (vm.user.type === userTypes.TEAM_OWNER) {
                return getTeamOwnerProfile(vm.user.id);

            } else {
                initializeUserProfile({ user: vm.user });
            }
        }

        function getTeamOwnerProfile(user_id) {
            var deferred = $q.defer();
           return MilesBoardApi.TeamOwnersApi.get(user_id).then(function (resp) {
                initializeUserProfile(resp);
                deferred.resolve(resp, initializeUserProfile);
                return deferred.promise;
            }, function (reason) {
                deferred.reject(reason, initializeUserProfileFail);
                return deferred.promise;
            });
            
        }

        function initializeUserProfile(user) {
            vm.user = user.user;
            //vm.user.teams = owner.user.teams;
            for (var i = 0; i < vm.TeamDisplayConfig.headers.length; i++) {
                if (vm.TeamDisplayConfig.headers[i].text !== 'Name') {
                    vm.TeamDisplayConfig.headers[i].hidden = true;
                }
            }

            vm.teams_board_display = setupDisplay(vm.user.teams, TeamDisplayConfig, null);
            vm.runs_board_display = setupDisplay(vm.user.runs, RunsDisplayConfig, null);

            vm.setTab(0);
        }

        function initializeUserProfileFail() {
            close();
            let message = 'Whoops... something went wrong while finding the user\'s profile. Please try again later.';
            Flash.create('danger', message, 5000, { container: 'index_flash' }, true);
        }

        function setupDisplay(obj, config, rowcallback) {
            return {
                displayObjData: buildDisplayObject(obj, config),
                displayConfig: config,
                rowCallback: rowcallback
            }
        }

        function setTab(index) {
            vm.tab = index;
            vm.showCreateTeamButton = getShowCreateTeamButton();
            let displayObjData = buildDisplayObject(vm.user.teams, TeamDisplayConfig);
            if (!vm.myProfile) {
                displayObjData = $filter('filter')(displayObjData, getValueForFiltering, sharedTeamComparator)
            }
            switch (index) {
                case 0: //all teams user is on
                    vm.teams_board_display.displayObjData = displayObjData;
                    break;
                case 1: //user owned teams
                    vm.teams_board_display.displayObjData = $filter('filter')(displayObjData, { team_owner_id: { text: vm.user.id } }, isTeamOwnerComparator);
                    break;
                default:
                    vm.tab = 0;
                    vm.teams_board_display.displayObjData = displayObjData;
                    break;
            }
        }

        function buildDisplayObject(obj, config) {
            let displayObj = [];
            for (let j = 0; j < obj.length; j++) {
                let item = {}
                for (let i = 0; i < config.headers.length; i++) {
                    if (!item.hasOwnProperty(config.headers[i].text)) {
                        item[config.headers[i].text] = { text: '', hidden: false };
                    }

                    item[config.headers[i].text].text = obj[j][(config.headers[i].text.toLowerCase()).replace(/\s/g, '_')];
                    if ((config.headers[i].text.toLowerCase()).replace(/\s/g, '_') === 'run_date') {
                        let date = moment(item[config.headers[i].text].text);
                        item[config.headers[i].text].text = date.isValid() ? date.format('MMMM D, YYYY') : '--';
                    } else if ((config.headers[i].text.toLowerCase()).replace(/\s/g, '_') === 'team') {
                        item[config.headers[i].text].text = obj[j][(config.headers[i].text.toLowerCase()).replace(/\s/g, '_')].name
                        item[config.headers[i].text].team_id = obj[j].team_id;
                        item[config.headers[i].text].uiSref = config.headers[i].uiSref + '({' + 'team_id:' + obj[j].team_id + '})';
                    }
                    item[config.headers[i].text].hidden = config.headers[i].hidden;
                }
                displayObj.push(item);
            }

            return displayObj;
        }

        function getValueForFiltering(value, index, array) {
            return value.id.text;
        }

        function isTeamOwnerComparator(actual, expected) {
            let inOwnerArr = false;
            for (let i = 0; i < vm.user.teams[i].length; i++) {
                if (vm.user.teams[i].id === expected.Team.id.text) {
                    if (vm.user.teams[i].owner_ids && vm.user.teams[i].owner_ids.indexOf(expected) !== -1) {
                        inOwnerArr = true;
                    }
                }
            }
            return parseInt(actual) === parseInt(expected) || inOwnerArr;
        }

        function sharedTeamComparator(actual, expected) {
            for (let i = 0; i < $localStorage.user.teams; i++) {
                if ($localStorage.user.teams[i] === actual) {
                    return true;
                }
            }
            return false;
        }

        function getShowCreateTeamButton() {
            return (vm.loggedIn && vm.user.id === $localStorage.user.id && $localStorage.user.type === 'TeamOwner');
        }

        function showCallbackConditions(row){
            if(vm.myProfile){
                return true;
            } else if($localStorage.user.type === 'TeamOwner') {
                let user = $localStorage.user;
                for(let i = 0; i < user.teams.length; i++) {
                    if(user.teams[i].id === row.Team.team_id) {
                        for(let j = 0; j < user.teams[i].team_owners.length; j++) {
                            if(user.id === user.teams[i].team_owners[j].id) {
                                vm.RunsDisplayConfig.showCallback = true;
                                return true
                            }
                        }
                        return false;
                    }
                }
            } else {
                return false;
            }
        }

        function close() {
            if(vm.showNewMemberForm === true) {
                vm.showNewMemberForm = false;
            } else if(vm.showCreateTeamForm === true) {
                vm.showCreateTeamForm = false;
            } else if(vm.showEditRunModal === true) {
                vm.showEditRunModal = false;
            } else if(vm.showConfirmationDialog){
                vm.showConfirmationDialog = false;
            }else {
                let result = null;
                if(vm.user_updated === true) {
                    result = vm.user;
                }
                $uibModalInstance.close(vm.user);
            }
        }

        function save() {
            let changed = false;
            let updates = {
                id: vm.user.id
            }
            if (vm.showNewMemberForm) {
                if(vm.newMember) {
                    if (vm.newMember.first_name && vm.user.first_name !== vm.newMember.first_name) {
                        updates.first_name = vm.newMember.first_name
                        changed = true;
                    }

                    if (vm.newMember.last_name && vm.user.last_name !== vm.newMember.last_name ) {
                        updates.last_name = vm.newMember.last_name
                        changed = true;
                    }

                    if (vm.newMember.email && vm.user.email !== vm.newMember.email) {
                        updates.email = vm.newMember.email;
                        changed = true;
                    }
                    Flash.clear();
                    if(changed === true) {
                        MilesBoardApi.put('users',updates).then(function(resp) {
                            vm.user = angular.extend(vm.user, updates);
                            vm.user_updated = true;
                            let message = 'Profile Successfully Updated!'
                            Flash.create('success', message, 5000, { container: PROFILE_MODAL_FLASH}, true);
                        },
                        function(reason){
                            let message = 'Whoops... There was an error updating your profile. Please try again later';
                            Flash.create('danger', message, 5000, { container: PROFILE_MODAL_FLASH }, true);
                        });
                    }
                    vm.newMember = undefined;
                }
                vm.showNewMemberForm = false;
            } else if (vm.showCreateTeamForm) {
                vm.showCreateTeamForm = false;
            } else if(vm.showEditRunModal) {
                vm.showEditRunModal = false; 
                saveEditRun(vm.run);
                vm.run = undefined;
            } else if(vm.showConfirmationDialog === true) {
                deleteRun(vm.run);
                vm.run = undefined;
                vm.messageObj = '';
                vm.showConfirmationDialog = false;
            }
        }

        function showEditRunModalClick(row) {
            vm.run = getRunFromRow(row);
            vm.dateOptions = {
                maxDate: new Date(),
            };
            vm.showEditRunModal = true;
        }

        function saveEditRun(data) {
            let updates = {
                run_date: moment(data.run_date).format('YYYY-MM-DD'),
                distance: parseInt(data.distance),
                id: data.id
                //user_id: vm.user.id,
                //team_id: data['team id'].text
            }

            MilesBoardApi.put('runs',updates).then(function (response) {
                for(let i = 0; i < vm.user.runs.length; i++) {
                    if(updates.id === vm.user.runs[i].id) {
                        vm.user.runs[i].run_date = updates.run_date;
                        vm.user.runs[i].distance = updates.distance;
                        break;
                    }
                }
                vm.runs_board_display = setupDisplay(vm.user.runs, RunsDisplayConfig, null);
            })
        }

        function showDeleteRunConfirmation(row) {
            vm.run = getRunFromRow(row);
            vm.message = 'Delete this run?';
            vm.messageObj = vm.run.distance + ' miles on ' + moment(vm.run.run_date).format('MMMM D, YYYY') + ' with ' + row.Team.text;
            vm.showFooter = false;
            vm.showConfirmationDialog = true;
        }

        function deleteRun(run){
                MilesBoardApi.remove('runs', run).then(function(resp){
                    for(let i = 0; i < vm.user.runs.length; i++){
                        if(vm.user.runs[i].id === run.id){
                            vm.user.runs.splice(i,1);
                            break;
                        }
                    }
                    vm.runs_board_display = setupDisplay(vm.user.runs, RunsDisplayConfig, null);
                    $rootScope.$broadcast('RUN_DELETED', vm.user.id, run.distance);
                });
        }

        function getRunFromRow(row){
            return {
                    distance: parseInt(row.Distance.text),
                    run_date: new Date(row['Run Date'].text),
                    id: row.id.text
                };
        }
    }
})();