(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$localStorage','$scope', '$uibModal', 'RunsApi', 'RunsDisplayConfig', 'TeamsDisplayConfig', 'user', 'UsersDisplayConfig'];

    function UsersController($localStorage, $scope, $uibModal, RunsApi, RunsDisplayConfig, TeamsDisplayConfig, user, UsersDisplayConfig) {
            let vm = this;
            vm.user = user.user;

            vm.tabs = [
                { title: 'Teams'},
                { title: 'Runs' }
            ];

            vm.$onInit = onInit;
            vm.setTab = setTab;

            function onInit() {
                vm.tab = 0;
                vm.showCreateTeamButton = getShowCreateTeamButton();
                vm.displayObjData = buildDisplayObject(vm.user.teams, TeamsDisplayConfig)
                vm.displayConfig = TeamsDisplayConfig;
            }

            function setTab(index) {
                vm.tab = index;
                vm.showCreateTeamButton = getShowCreateTeamButton();
                switch(index) {
                    case 0:
                        vm.displayObjData = buildDisplayObject(vm.user.teams, TeamsDisplayConfig)
                        vm.displayConfig = TeamsDisplayConfig;
                        vm.displayConfig.showCallback = false;
                        vm.rowCallback = null;
                        break;
                    case 1:
                        vm.displayObjData = buildDisplayObject(vm.user.runs, RunsDisplayConfig)
                        vm.displayConfig = RunsDisplayConfig;
                        vm.displayConfig.showCallback = true;
                        vm.rowCallback = showEditRunModal;
                        break;
                    default:
                        vm.displayObjData = buildDisplayObject(vm.user.teams, TeamsDisplayConfig)
                        vm.displayConfig = TeamsDisplayConfig;
                        vm.displayConfig.showCallback = false;
                        vm.rowCallback = null;
                        break;
                }
            }

            function getShowCreateTeamButton() {
                return vm.tab === 0 && vm.user.id === $localStorage.user.id && $localStorage.user.type === 'TeamOwner'
            }

            function buildDisplayObject(obj, config) {
                let displayObj = {};
                for (let j = 0; j < obj.length; j++) {
                    for (let i = 0; i < config.headers.length; i++) {
                        if (!displayObj.hasOwnProperty(j)) {
                            displayObj[j] = {};
                        }
                        if (!displayObj[j].hasOwnProperty(config.headers[i].text)) {
                            displayObj[j][config.headers[i].text] = { text: '', hidden: false };
                        }

                        displayObj[j][config.headers[i].text].text = obj[j][(config.headers[i].text.toLowerCase()).replace(/\s/g, '_')];
                        if ((config.headers[i].text.toLowerCase()).replace(/\s/g, '_') === 'run_date') {
                            let date = moment(displayObj[j][config.headers[i].text].text);
                            displayObj[j][config.headers[i].text].text = date.isValid() ? date.format('MMMM D, YYYY') : '--';
                        } else if ((config.headers[i].text.toLowerCase()).replace(/\s/g, '_') === 'team') {
                            displayObj[j][config.headers[i].text].text = obj[j][(config.headers[i].text.toLowerCase()).replace(/\s/g, '_')].name
                            displayObj[j][config.headers[i].text].team_id = obj[j].team_id;
                        }
                        displayObj[j][config.headers[i].text].hidden = config.headers[i].hidden;

                        if (config.headers[i].uiSref) {
                            displayObj[j][config.headers[i].text].uiSref = config.headers[i].uiSref + '({' + config.paramName + ':' + obj[j].id + '})';
                        }
                    }
                }

                return displayObj;
            }

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
        }
})();