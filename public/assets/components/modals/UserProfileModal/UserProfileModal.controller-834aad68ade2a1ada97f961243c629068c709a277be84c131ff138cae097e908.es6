(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('UserProfileModalController', UserProfileModalController);

    UserProfileModalController.$inject = ['$filter','$localStorage', '$scope', 'MilesBoardApi', 'MilesBoardImages',  
                                          'RunsDisplayConfig', 'TeamDisplayConfig', '$uibModalInstance'];

    function UserProfileModalController($filter, $localStorage, $scope, MilesBoardApi, MilesBoardImages, 
                                        RunsDisplayConfig, TeamDisplayConfig, $uibModalInstance) {
        let vm = this; 
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

        function onInit() {
            vm.TeamDisplayConfig = TeamDisplayConfig;
            vm.RunsDisplayConfig = RunsDisplayConfig;

            vm.TeamDisplayConfig.showCallback = false;
            vm.TeamDisplayConfig.hideSearch = true;
            vm.TeamDisplayConfig.hideHeaderRow = true;

            vm.RunsDisplayConfig.showCallback = false;
            vm.RunsDisplayConfig.hideSearch = true;

            vm.showCreateTeamButton = getShowCreateTeamButton();
            vm.showUpdateEmailButton = vm.user.email.includes('milesboardimport') && (vm.user.id === $localStorage.user.id || $scope.owner_ids.indexOf($localStorage.user.id) !== -1)
            vm.showNewMemberForm = false;
            vm.showCreateTeamForm = false;

            if (vm.user.type === userTypes.TEAM_OWNER) {
                MilesBoardApi.TeamOwnersApi.get(vm.user.id).then(function(resp){
                    vm.user = resp.user;
                    vm.user.teams = resp.teams;
                    //vm.user.teams = owner.user.teams;
                    for (let i = 0; i < vm.TeamDisplayConfig.headers.length; i++) {
                        if (vm.TeamDisplayConfig.headers[i].text !== 'Name') {
                            vm.TeamDisplayConfig.headers[i].hidden = true;
                        }
                    }

                    vm.teams_board_display = {
                        displayObjData: buildDisplayObject(vm.user.teams, TeamDisplayConfig),
                        displayConfig: TeamDisplayConfig,
                        rowCallback: null
                    }

                    vm.runs_board_display = {
                        displayObjData: buildDisplayObject(vm.user.runs, RunsDisplayConfig),
                        displayConfig: RunsDisplayConfig,
                        rowCallback: null
                    }

                    vm.setTab(0);
                }, function(reason) {

                });
            } else {
                for (let i = 0; i < vm.TeamDisplayConfig.headers.length; i++) {
                    if (vm.TeamDisplayConfig.headers[i].text !== 'Name') {
                        vm.TeamDisplayConfig.headers[i].hidden = true;
                    }
                }

                vm.teams_board_display = {
                    displayObjData: buildDisplayObject(vm.user.teams, TeamDisplayConfig),
                    displayConfig: TeamDisplayConfig,
                    rowCallback: null
                }

                vm.runs_board_display = {
                    displayObjData: buildDisplayObject(vm.user.runs, RunsDisplayConfig),
                    displayConfig: RunsDisplayConfig,
                    rowCallback: null
                }
                vm.setTab(0);
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
            console.log(value);
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

        function close() {
            $uibModalInstance.close();
        }
    }
})();
