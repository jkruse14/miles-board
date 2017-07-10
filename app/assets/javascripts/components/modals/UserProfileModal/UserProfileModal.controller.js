(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('UserProfileModalController', UserProfileModalController);

    UserProfileModalController.$inject = ['$filter','$localStorage', '$scope', '$uibModalInstance', 'MilesBoardImages', 'RunsDisplayConfig', 'TeamDisplayConfig'];

    function UserProfileModalController($filter, $localStorage, $scope, $uibModalInstance, MilesBoardImages, RunsDisplayConfig, TeamDisplayConfig) {
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
        //vm.showUpdateEmailModal = showUpdateEmailModal;
        vm.close = close;

        function onInit() {
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


            vm.RunsDisplayConfig.showCallback = false;
            vm.RunsDisplayConfig.hideSearch = true;
            vm.runs_board_display = {
                displayObjData: buildDisplayObject(vm.user.runs, RunsDisplayConfig),
                displayConfig: RunsDisplayConfig,
                rowCallback: null
            }

            vm.showUpdateEmailButton = vm.user.email.includes('milesboardimport') && (vm.user.id === $localStorage.user.id || $scope.owner_ids.indexOf($localStorage.user.id) !== -1)

            vm.setTab(0);
        }

        function setTab(index) {
            vm.tab = index;

            let displayObjData = buildDisplayObject(vm.user.teams, TeamDisplayConfig);
            if (!vm.myProfile) {
                displayObjData = $filter('filter')(displayObjData, getValueForFiltering, sharedTeamComparator)
            }
            switch (index) {
                case 0: //all teams user is on
                    vm.teams_board_display.displayObjData = displayObjData;
                    break;
                case 1: //user owned teams
                    vm.teams_board_display.displayObjData = $filter('filter')(vm.teams_board_display.displayObjData, getValueForFiltering, isTeamOwnerComparator);
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
            console.log(actual, expected)
            return parseInt(actual) === parseInt(expected);
        }

        function sharedTeamComparator(actual, expected) {
            for (let i = 0; i < $localStorage.user.teams; i++) {
                if ($localStorage.user.teams[i] === actual) {
                    return true;
                }
            }
            return false;
        }

        function close() {
            $uibModalInstance.close();
        }
    }
})();