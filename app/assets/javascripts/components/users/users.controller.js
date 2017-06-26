(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$filter','$localStorage', '$scope', '$state', '$uibModal', 'MilesBoardImages', 'RunsApi', 'RunsDisplayConfig', 'TeamsApi', 'TeamsDisplayConfig', 'user', 'UsersDisplayConfig'];

    function UsersController($filter, $localStorage, $scope, $state, $uibModal, MilesBoardImages, RunsApi, RunsDisplayConfig, TeamsApi, TeamsDisplayConfig, user, UsersDisplayConfig) {
            let vm = this;
            const userTypes = {
                 TEAM_OWNER : 'TeamOwner',
                 USER: 'User'
            }
            vm.user = user.user;
            vm.loggedIn = $localStorage.user ? true : false;
            vm.profileImageSrc = MilesBoardImages.road_runner;

            vm.tabs = [
                { title: 'Teams'},
                { title: 'Owned Teams' }
            ];

            vm.$onInit = onInit;
            vm.setTab = setTab;
            vm.showCreateTeamModal = showCreateTeamModal;

            function onInit() {
                vm.tab = 0;
                vm.TeamsDisplayConfig = TeamsDisplayConfig;
                vm.RunsDisplayConfig = RunsDisplayConfig;

                for (let i = 0; i < vm.TeamsDisplayConfig.headers.length; i++) {
                    if (vm.TeamsDisplayConfig.headers[i].text !== 'Name') {
                        vm.TeamsDisplayConfig.headers[i].hidden = true;
                    }
                }

                
                vm.TeamsDisplayConfig.showCallback = false;
                vm.TeamsDisplayConfig.hideSearch = true;
                vm.TeamsDisplayConfig.hideHeaderRow = true;
                vm.teams_board_display = {
                    displayObjData: buildDisplayObject(vm.user.teams, TeamsDisplayConfig),
                    displayConfig: TeamsDisplayConfig,
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
                // vm.displayObjData = buildDisplayObject(vm.user.teams, TeamsDisplayConfig)
                // vm.displayConfig = TeamsDisplayConfig;

                
            }

            function setTab(index) {
                vm.tab = index;
                vm.showCreateTeamButton = getShowCreateTeamButton();
                switch(index) {
                    case 0:
                        vm.teams_board_display.displayObjData = buildDisplayObject(vm.user.teams, TeamsDisplayConfig)
                        break;
                    case 1:
                        vm.teams_board_display.displayObjData = $filter('filter')(vm.teams_board_display.displayObjData, getValueForFiltering,  isTeamOwnerComparator)
                        break;
                    default:
                        vm.teams_board_display.displayObjData = buildDisplayObject(vm.user.teams, TeamsDisplayConfig)
                        break;
                }
                // switch(index) {
                //     case 0:
                //         vm.displayObjData = buildDisplayObject(vm.user.teams, TeamsDisplayConfig)
                //         vm.displayConfig = TeamsDisplayConfig;
                //         vm.displayConfig.showCallback = false;
                //         vm.rowCallback = null;
                //         break;
                //     case 1:
                //         vm.displayObjData = buildDisplayObject(vm.user.runs, RunsDisplayConfig)
                //         vm.displayConfig = RunsDisplayConfig;
                //         vm.displayConfig.showCallback = true;
                //         vm.rowCallback = showEditRunModal;
                //         break;
                //     default:
                //         vm.displayObjData = buildDisplayObject(vm.user.teams, TeamsDisplayConfig)
                //         vm.displayConfig = TeamsDisplayConfig;
                //         vm.displayConfig.showCallback = false;
                //         vm.rowCallback = null;
                //         break;
                // }
            }

            function getShowCreateTeamButton() {
                return (vm.tab === 0 && vm.loggedIn && vm.user.id === $localStorage.user.id && $localStorage.user.type === 'TeamOwner') || 
                        ($state.params.userId && parseInt($state.params.userId) == vm.user.id && vm.user.type === userTypes.TEAM_OWNER);
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

            function getValueForFiltering(item) {
                return item.id.text;
            }

            function isTeamOwnerComparator(actual, expected) {
                 return actual === vm.user.id;
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

                    RunsApi.one('runs', result.id).customPUT(updates, result.id).then(function (response) {
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
                    TeamsApi.post(result).then(
                        function (response) {
                            vm.user.teams.push(result);
                            vm.displayObjData = buildDisplayObject(vm.user.teams, TeamsDisplayConfig)
                            vm.displayConfig = TeamsDisplayConfig;
                        },
                        function (response) {
                            console.error(response);
                        }
                    );
                }, function () { });
            }
        }
})();