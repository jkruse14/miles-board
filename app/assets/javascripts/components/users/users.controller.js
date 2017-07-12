(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$auth','$filter', '$localStorage', '$scope', '$state', '$uibModal', 
                                'Flash', 'MilesBoardApi', 'MilesBoardImages', 'owner', 'RunsDisplayConfig', 
                                'TeamDisplayConfig', 'user', 'UsersDisplayConfig', 'Restangular'];

    function UsersController($auth, $filter, $localStorage, $scope, $state, $uibModal, 
                            Flash, MilesBoardApi, MilesBoardImages, owner, RunsDisplayConfig, 
                             TeamDisplayConfig, user, UsersDisplayConfig, Restangular) {
            let vm = this;
            const userTypes = {
                 TEAM_OWNER : 'TeamOwner',
                 USER: 'User'
            }

            vm.user = user.user ? user.user : MilesBoardApi.UsersApi.get($state.params['userId']);

            vm.loggedIn = $localStorage.user ? true : false;
            vm.profileImageSrc = MilesBoardImages.road_runner;
            vm.myProfile = (vm.loggedIn && vm.user.id === $localStorage.user.id);
           

            vm.tabs = [
                { title: 'Teams', hidden: false},
                { title: 'Owned Teams', hidden: vm.user.type !== userTypes.TEAM_OWNER }
            ];

            vm.$onInit = onInit;
            vm.setTab = setTab;
            vm.showCreateTeamModal = showCreateTeamModal;
            vm.showUpdateEmailModal = showUpdateEmailModal;

            function onInit() {
                if($state.params['reset']) {
                    let message = 'Password successfully reset!';
                    Flash.create('success', message, 5000, { container: 'profile_flash' }, true)
                }

                if(vm.user.type === userTypes.TEAM_OWNER) {
                    vm.user = owner.user;
                    vm.user.teams = owner.teams;
                }

                vm.TeamDisplayConfig = TeamDisplayConfig;
                vm.RunsDisplayConfig = RunsDisplayConfig;
                
                for (let i = 0; i < vm.TeamDisplayConfig.headers.length; i++) {
                    if (vm.TeamDisplayConfig.headers[i].text !== 'Name') {
                        vm.TeamDisplayConfig.headers[i].hidden = true;
                    }
                }

                
                vm.TeamDisplayConfig.showCallback = false;
                vm.TeamDisplayConfig.hideSearch = true;
                vm.TeamDisplayConfig.hideHeaderRow = true;
                vm.teams_board_display = {
                    displayObjData: buildDisplayObject(vm.user.teams, TeamDisplayConfig),
                    displayConfig: TeamDisplayConfig,
                    rowCallback: null
                }

                
                vm.RunsDisplayConfig.showCallback = true;
                vm.RunsDisplayConfig.hideSearch = true;
                vm.runs_board_display = {
                    displayObjData: buildDisplayObject(vm.user.runs, RunsDisplayConfig),
                    displayConfig: RunsDisplayConfig,
                    rowCallback: showEditRunModal
                }

                 vm.showCreateTeamButton = getShowCreateTeamButton();
                // vm.displayObjData = buildDisplayObject(vm.user.teams, TeamDisplayConfig)
                // vm.displayConfig = TeamDisplayConfig;

                 vm.setTab(0);
            }

            function setTab(index) {
                vm.tab = index;
                vm.showCreateTeamButton = getShowCreateTeamButton();
                let displayObjData = buildDisplayObject(vm.user.teams, TeamDisplayConfig);
                if (!vm.myProfile) {
                    displayObjData = $filter('filter')(displayObjData, getValueForFiltering, sharedTeamComparator)
                }
                switch(index) {
                    case 0: //all teams user is on
                        vm.teams_board_display.displayObjData = displayObjData;
                        break;
                    case 1: //user owned teams
                        vm.teams_board_display.displayObjData = $filter('filter')(displayObjData, {team_owner_id:{text: vm.user.id}}, isTeamOwnerComparator);
                        break;
                    default:
                        vm.tab = 0;
                        vm.teams_board_display.displayObjData = displayObjData;
                        break;
                }
            }

            function getShowCreateTeamButton() {
                return (vm.loggedIn && vm.user.id === $localStorage.user.id && $localStorage.user.type === 'TeamOwner');
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

                        if (config.headers[i].uiSref && !item[config.headers[i].text].uiSref) {
                            item[config.headers[i].text].uiSref = config.headers[i].uiSref + '({' + config.headers[i].uiSref + '_id:' + obj[j].id + '})';
                        }
                    }
                    displayObj.push(item);
                }

                return displayObj;
            }

            function getValueForFiltering(value, index, array) {
                console.log(value);
                return value;
            }

            function isTeamOwnerComparator(actual, expected) {
                let inOwnerArr = false;
                for(let i = 0; i < vm.user.teams[i].length; i++) {
                    if(vm.user.teams[i].id === expected.Team.id.text){
                        if (vm.user.teams[i].owner_ids && vm.user.teams[i].owner_ids.indexOf(expected) !== -1 ) {
                                inOwnerArr = true;
                        }
                    }
                }
                return parseInt(actual) === parseInt(expected) || inOwnerArr;
            }

            function sharedTeamComparator(actual,expected) {
                for(let i = 0; i < $localStorage.user.teams; i++) {
                    if($localStorage.user.teams[i] === actual) {
                        return true;
                    }
                }
                return false;
            }

            ///// MODALS /////
            function showEditRunModal(data) {
                $scope.editing_run = data;
                // var parentElem = parentSelector ?
                //     angular.element($document[0].querySelector('.page-container ' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'components/modals/EditRunModal/_editRunModal.html',
                    controller: 'EditRunModalController',
                    controllerAs: 'vm',
                    size: 'md',
                    //appendTo: parentElem,
                    scope: $scope
                    // resolve: {
                    //     items: function () {
                    //         return vm.items;
                    //     }
                    // }
                });

                modalInstance.result.then(function (result) {
                    let updates = {
                        run: {
                            run_date: result.date,
                            distance: result.distance,
                            user_id: vm.user.id,
                            team_id: result.team_id
                        }
                    }

                    MilesBoardApi.RunsApi.one('runs', result.id).customPUT(updates, result.id).then(function (response) {
                        for(let i = 0; i < vm.user.runs.length; i++) {
                            if(result.id === vm.user.runs[i].id) {
                                vm.user.runs[i].run_date = result.run_date;
                                vm.user.runs[i].distance = result.distance;
                                break;
                            }
                        }
                        vm.displayObjData = buildDisplayObject(vm.user.runs, RunsDisplayConfig)
                    })
                }, function () { });
            }

            function showCreateTeamModal(data) {
                $scope.editing_run = data;
                // var parentElem = parentSelector ?
                //     angular.element($document[0].querySelector('.page-container ' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'components/modals/CreateTeamModal/_createTeamModal.html',
                    controller: 'CreateTeamModalController',
                    controllerAs: 'vm',
                    size: 'md',
                    //appendTo: parentElem,
                    scope: $scope
                    // resolve: {
                    //     items: function () {
                    //         return vm.items;
                    //     }
                    // }
                });

                modalInstance.result.then(function (result) {
                    if(result) {
                        MilesBoardApi.TeamsApi.post(result).then(
                            function (response) {
                                vm.user.teams.push(result);
                                vm.displayObjData = buildDisplayObject(vm.user.teams, TeamDisplayConfig)
                                vm.displayConfig = TeamDisplayConfig;
                            },
                            function (response) {
                                console.error(response);
                            }
                        );
                    }
                }, function () { });
            }

            function showUpdateEmailModal() {
                $scope.profileAction = 'edit';
                $scope.user_for_modal = vm.user;
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'components/modals/newMemberModal/_newMemberModal.html',
                    controller: 'NewMemberModalController',
                    controllerAs: 'vm',
                    size: 'md',
                    scope: $scope
                });

                modalInstance.result.then(function (result) {
                    vm.user.imported_user_id = vm.user.id;

                    Restangular.all('update_imported_user').customPATCH(vm.user).then(function (response) {
                        let message = 'Account Successfully Updated!'
                        Flash.create('success', message, 5000, {container: 'index_flash'}, true)                      
                    }, function (error) {
                        let message = 'There were errors updating your accout:<br />';
                        message += MilesBoardImages.errorReader(error);
                        Flash.create('danger', messsage, 0, {container: 'index_flash'}, true)
                     });
                })
            }
        }
})();