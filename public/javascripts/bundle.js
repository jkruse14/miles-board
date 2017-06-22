// (function () {
//     'use strict';

//     angular
//         .module('milesBoard')
//         .config(authConfig);

//     authConfig.$inject = ['$authProvider'];

//     /** @ngInject */
//     function authConfig($authProvider) {
//         $authProvider.configure(
//             [{
//                 'default': {
//                     apiUrl: 'http://localhost:8000',
//                     emailRegistrationPath: '/users',
//                     validateOnPageLoad: true,
//                 },
//                 'user': {
//                     apiUrl: 'http://localhost:8000',
//                     emailRegistrationPath: '/users',
//                     validateOnPageLoad: true,
//                 },
//                 'team_owner': {
//                     apiUrl: 'http://localhost:8000',
//                     emailRegistrationPath: '/team_owners',
//                     validateOnPageLoad: true,
//                 }
//             }]
//         );
//     }

// })();

// (function() {
//     'use strict';

//     angular
//         .module('milesBoard')
//         .config(envConfig);

//     EnvironmentConfig.$inject = ['envServiceProvider'];

//     function EnvironmentConfig(envServiceProvider) {
//         envServiceProvider.config({
//             domains: {
//                 development: ['localhost'],
//                 production: ['miles-board.herokuapp.com']
//             },
//             vars: {
//                 development: {
//                     apiUrl: 'http://localhost:8000'
//                 },
//                 production: {
//                     apiUrl: 'https://miles-board.herokuapp.com'
//                 },
//             }
//         })

//         envServiceProvider.check();
//     }
// })();
(function(){
    'use strict';

    angular
        .module('milesBoard', [
            'environment',
            'restangular',
            'ui.router',
            'templates',
            'ui.bootstrap',
            'ng-token-auth',
            'ngStorage'
        ])
        .config(EnvironmentConfig)
        .config(authConfig);

    authConfig.$inject = ['$authProvider'];

    /** @ngInject */
    function authConfig($authProvider) {
        $authProvider.configure(
            [{
                'default': {
                    apiUrl: 'http://localhost:8000',
                    emailRegistrationPath: '/users',
                    validateOnPageLoad: true,
                },
                'user': {
                    apiUrl: 'http://localhost:8000',
                    emailRegistrationPath: '/users',
                    validateOnPageLoad: true,
                },
                'team_owner': {
                    apiUrl: 'http://localhost:8000',
                    emailRegistrationPath: '/team_owners',
                    validateOnPageLoad: true,
                }
            }]
        );
    }

    EnvironmentConfig.$inject = ['envServiceProvider'];

    /** @ngInject */
    function EnvironmentConfig(envServiceProvider) {
        envServiceProvider.config({
            domains: {
                development: ['localhost'],
                production: ['miles-board.herokuapp.com']
            },
            vars: {
                development: {
                    apiUrl: 'http://localhost:8000'
                },
                production: {
                    apiUrl: 'https://miles-board.herokuapp.com'
                },
            }
        });

        envServiceProvider.check();
    }
})();
(function() {
    'use strict';

    angular
        .module('milesBoard')
        .config(RouterConfig);

    RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    /** @ngInject */
    function RouterConfig($stateProvider, $urlRouterProvider) {

                var alphaState = {
                    name: 'index',
                    url: '/',
                    templateUrl: 'components/index/_index.html',
                    controller: 'AlphaController as vm',
                    resolve: {
                        auth: function ($auth) {
                            return $auth.validateUser();
                        }
                    }
                };

                var homeState = {
                    name: 'home',
                    url: '/home',
                    templateUrl: 'components/home/_home.html',
                    controller: 'MainController',
                };

                var loginState = {
                    name: 'login',
                    url: '/login',
                    templateUrl: 'components/login/_login.html',
                    controller: 'LoginController as vm'
                };

                var teamState = {
                    name: 'team',
                    url: '/teams/:team_id',
                    templateUrl: 'components/teams/_teams.html',
                    controller: 'TeamsController as vm',
                    resolve: {
                        team: function (TeamsApi, $stateParams) {
                            return TeamsApi.get($stateParams.team_id);
                        }
                    }
                };

                var userState = {
                    name: 'user',
                    url: '/users/:userId',
                    templateUrl: 'components/users/_users.html',
                    controller: 'UsersController as vm',
                    resolve: {
                        user: function (UsersApi, $stateParams) {
                            return UsersApi.get($stateParams.userId);
                        }
                    }
                };

                $stateProvider.state(alphaState);
                $stateProvider.state(homeState);
                $stateProvider.state(loginState);
                $stateProvider.state(teamState);
                $stateProvider.state(userState);
            }

})();
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require angular/angular
//= require angular-ui-router
//= require angular-cookie
//= require angular-rails-templates
//= require lodash/lodash.min.js
//= require angular-ui-bootstrap/dist/ui-bootstrap.js
//= require angular-ui-bootstrap/dist/ui-bootstrap-tpls.js
//= require restangular
//= require moment/min/moment.min.js
//= require ng-token-auth/dist/ng-token-auth.min.js
//= require ngstorage/ngStorage.min.js
//= require angular-environment/dist/angular-environment.min.js
//= require_tree .

// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//
//= require action_cable
//= require_self
//= require_tree ./channels

(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);

(function(){
    'use strict';

    angular
        .module('milesBoard')
        .factory('RunsApi', RunsApi);

    RunsApi.$inject = ['Restangular'];

    function RunsApi(Restangular) {
        return Restangular.service('runs');
    }
})();
(function() {
    'use strict';

    angular
        .module('milesBoard')
        .factory('TeamMemberListsApi', TeamMemberListsApi);

    TeamMemberListsApi.$inject = ['Restangular'];

    function TeamMemberListsApi(Restangular) {
            return Restangular.service('team_member_lists');
        }
})();
(function(){
    'use strict';

    angular
        .module('milesBoard')
        .factory('TeamsApi', TeamsApi);

    TeamsApi.$inject = ['Restangular'];

    function TeamsApi(Restangular) {
        return Restangular.service('teams');
    }
})();
(function() {
    'use strict';
    
    angular
    .module('milesBoard')
    .factory('UsersApi', UsersApi);

    UsersApi.$inject = ['Restangular'];

    function UsersApi(Restangular) {
        return Restangular.service('users');
    }
})();
(function () {
    'use strict';

angular
    .module('milesBoard')
    .component('board', {
        templateUrl: 'components/board/_board.html',
        controller: 'BoardController',
        controllerAs: 'vm',
        bindings: {
            displayObjData: '<',
            displayObjConfig: '<',
            rowCallback: '&'
        }
    });
})();
(function(){
    'use strict';

angular
    .module('milesBoard')
    .controller('BoardController', BoardController);

BoardController.$inject = ['$scope'];//'displayObj','displayObjConfig'];

function BoardController($scope) {
    var vm = this;
    vm.$onInit = onInit;

    vm.callback = callback;

    function onInit() {
    }

    function callback(row) {
        vm.rowCallback()(row);
    }
}
})();
(function(){
    'use strict';

    angular
        .module('milesBoard')
        .component('editableField', {
            templateUrl: 'components/editableField/_editableField.html',
            controller: 'EditableFieldController',
            bindings: {
                fieldValue: '<',
                fieldType: '@?',
                onUpdate: '&'
            }
        })
})();
(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('EditableFieldController', EditableFieldController);

    EditableFieldController.$inject = ['$scope', '$element', '$attrs'];

function EditableFieldController($scope, $element, $attrs) {
    var ctrl = this;
    ctrl.editMode = false;

    ctrl.handleModeChange = function () {
        if (ctrl.editMode) {
            ctrl.onUpdate({ value: ctrl.fieldValue });
            ctrl.fieldValueCopy = ctrl.fieldValue;
        }
        ctrl.editMode = !ctrl.editMode;
    };

    ctrl.reset = function () {
        ctrl.fieldValue = ctrl.fieldValueCopy;
    };

    ctrl.$onInit = function () {
        // Make a copy of the initial value to be able to reset it later
        ctrl.fieldValueCopy = ctrl.fieldValue;

        // Set a default fieldType
        if (!ctrl.fieldType) {
            ctrl.fieldType = 'text';
        }
    };
}
})();
(function () {
    'use strict';

    angular
        .module('milesBoard')
        .constant('ApiConfig', {
            apiUrl: 'http://localhost:8000/',
        });

})();
(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('MainController',MainController);

    MainController.$inject = []

    function MainController() {
        let vm = this;
    }
})();
(function(){
    'use strict';

    angular
    .module('milesBoard')
    .component('milesHeader',{
        templateUrl:'components/header/_header.html',
        controller: 'HeaderController'
    });

})();
(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('HeaderController',HeaderController);
    
    HeaderController.$inject = [];

    function HeaderController() {
        var ctrl = this;
        ctrl.nav = [
            { uiSref: 'home', display: 'Home' },
            { uiSref: 'teams', display: 'Teams' },
        ]
    }
})();
(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('AlphaController', AlphaController);

    AlphaController.$inject = ['$window'];

    function AlphaController($window) {
        let vm = this;

        vm.hideNav = $window.location.hash === '#/login' ? true : false;
    }
})();
(function() {
    'use strict';

    angular
        .module('milesBoard')
        .component('index', {
            templateUrl: 'components/index/_index.html',
            controller: 'AlphaController',
            bindings: {

            }
        });

})();
(function(){
    'user strict';

    angular
        .module('milesBoard')
        .component('login', {
            templateUrl: 'components/login/_login.html',
            controller: 'LoginController',
            bindings: {
                
            }
        });

})();
(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('LoginController', LoginController);
    
    LoginController.$inject = ['$auth', '$localStorage', '$scope', '$state', 'UsersApi'];

    function LoginController($auth, $localStorage, $scope, $state, UsersApi) {
        let vm = this;
        let PW_CONF_MSG = {
            MATCH: {text: 'They match!', className: 'pwMatch'},
            NO_MATCH: {text: 'Your passwords do not match...', className: 'pwNoMatch'}
        }

        let loginFormUrl = "'components/login/_loginForm.html'";
        let registerFormUrl = "'components/login/_registerForm.html'";

        vm.tabs = [{title:'Login', 
                    content: '<ng-include src="'+loginFormUrl+'"></ng-include>'}, 
                   {title: 'Register',
                    content:'<ng-include src="'+registerFormUrl+'"></ng-include>'}];

        vm.user_info = {
            first_name: '',
            last_name: '',
            password: '',
            password_confirmation: '',
            email: ''
        };

        vm.$onInit = onInit;
        vm.setTab = setTab;
        vm.handleSubmitClick = handleSubmitClick;

        function onInit(){
            vm.tab = 0;
        }

        function setTab(index) {
            vm.tab = index;
        }

        function handleSubmitClick() {
            switch(vm.tab) {
                case 0:
                    handleLogin();
                    break;
                case 1:
                    handleSubmitRegistration();
                    break;
                default:
                    handleLogin();
                    break;
            } 
        }

        function handleLogin() {
            
            $auth.submitLogin(vm.user_info)
                .then(loginSuccess, loginFail)
        }

        function loginSuccess(resp) {
            UsersApi.get(resp.id).then(function(response) {
                $localStorage.user = response.user;
            });
            $state.go('user',{userId: resp.id})
        }

        function loginFail(resp) {

        }

        function handleSubmitRegistration() {
            let new_user = {
                first_name: vm.user_info.first_name,
                last_name: vm.user_info.last_name,
                password: vm.user_info.password,
                password_confirmation: vm.user_info.password_confirmation,
                email: vm.user_info.email
            }
            $auth.submitRegistration(new_user)
                .then(registraionSuccess, registrationFail);
        }

        function registraionSuccess(resp) {

        }

        function registrationFail(resp) {

        }

    }

})();
(function(){
    'use strict';
    
    angular
    .module('milesBoard')
    .value('RunsDisplayConfig', {
        'objcode': 'RUN',
        'paramName': 'runId',
        "headers": [{text:'id', hidden:true},
                    {text:'Run Date', hidden:false} , 
                    {text:'Distance', hidden:false}, 
                    {text:'Team', hidden:false, uiSref:'team'}],
        'rowCallbackText': 'Edit Run'
    });
})();
(function(){
    'use strict';

    angular
        .module('milesBoard')
        .component('teams', {
            templateUrl: 'components/teams/_teams.html',
            controller: 'TeamsController',
            bindings: {
                team: '<'
        }
    });
})();
(function(){
    'use strict';

angular
    .module('milesBoard')
    .controller('TeamsController', TeamsController);

TeamsController.$inject = ['$scope','$stateParams', 'RunsApi' , 'team','TeamsApi', 'TeamMemberListsApi', '$uibModal' ,'UsersApi','UsersDisplayConfig'];

    function TeamsController($scope, $stateParams, RunsApi, team, TeamsApi, TeamMemberListsApi, $uibModal , UsersApi, UsersDisplayConfig) {
        var vm = this;
        vm.team = team;
        vm.displayConfig = UsersDisplayConfig;

        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        vm.showAddRunToUser = showAddRunToUser;
        vm.showAddTeamMemberModal = showAddTeamMemberModal;
        vm.showUserProfileModal = showUserProfileModal;

        function onInit() {
            vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig)
        }

        function onChanges(changes) {
            vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig)
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
                displayObj[j]['Name'].text = obj[j].first_name + ' ' +obj[j].last_name
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
                UsersApi.get('',{email:result.email}).then(function(response){
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

                        UsersApi.post(newUser).then(function(result){
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
angular
    .module('milesBoard')
    .value('TeamsDisplayConfig',{
        'objcode': 'TEAM',
        'paramName': 'team_id',
        'headers': [{text:'id',hidden:true},
                    {text:'name', hidden:false, uiSref:'team'}, 
                    {text:'location', hidden: false},
                    {text:'contact email', hidden:false}],
        'title': 'Teams',
        'rowCallbackText':'Add Run',
        'showCallback': true
    });
(function(){
    'use strict';
    angular
        .module('milesBoard')
        .component('users', {
            templateUrl: '',
            controller: 'UsersController',
            controllerAs: 'vm',
            bindings: {
                user:'<'
            }
        });
})();
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
                            displayObj[j][config.headers[i].text].uiSref = config.headers[i].uiSref + '({' + 'team_id:' + obj[j].team_id + '})';
                        }
                        displayObj[j][config.headers[i].text].hidden = config.headers[i].hidden;

                        if (config.headers[i].uiSref && !displayObj[j][config.headers[i].text].uiSref) {
                            displayObj[j][config.headers[i].text].uiSref = config.headers[i].uiSref + '({' + config.headers[i].uiSref + '_id:' + obj[j].id + '})';
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
(function(){
    'use strict';

    angular
    .module('milesBoard')
    .value('UsersDisplayConfig', {
        'objcode': 'USER',
        'paramName': 'userId',
        'headers': [{text: 'id', hidden: true},
                    {text: 'Name', hidden: false, uiSref:'user'}, 
                    {text: 'Team Distance', hidden: false}, 
                    {text: 'Team Run Count', hidden: false}],
        'showCallback':true,
        'rowCallbackText': 'Add Run'
    });
})();
(function () {
    'use strict';

    angular
        .module('milesBoard')
        .controller('AddRunToUserController', AddRunToUserController);

    AddRunToUserController.$inject = ['$scope', '$uibModalInstance'];

    function AddRunToUserController($scope, $uibModalInstance) {
        let vm = this;
        vm.run = {
            user_id: '',
            distance: 0,
            run_date: '',
        };

        vm.save = save;
        vm.cancel = cancel;

        function save(user_id) {
            vm.run.user_id = user_id;
            $uibModalInstance.close(vm.run);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

    }

})();

(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('EditRunModalController', EditRunModalController);

    EditRunModalController.$inject = ['$scope', '$uibModalInstance'];

    function EditRunModalController($scope, $uibModalInstance) {
        let vm = this;

        vm.$onInit = onInit;
        vm.save = save;
        vm.cancel = cancel;

        function save() {
            $uibModalInstance.close({id:parseInt($scope.editing_run.id.text),
                                     team_id: parseInt($scope.editing_run.Team.team_id),
                                     distance: vm.distance,
                                     run_date: vm.run_date});
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
        
        function onInit() {
            vm.distance = parseInt($scope.editing_run.Distance.text);
            vm.run_date = $scope.editing_run['Run Date'].text === '--' ? moment() : moment($scope.editing_run['Run Date'].text);

            vm.today = moment();
            vm.dateOptions = {
                maxDate: new Date(),
            };
        }
    }
})();
(function(){
    angular
        .module('milesBoard')
        .controller('NewMemberModalController', NewMemberModalController);

    NewMemberModalController.$inject = ['$scope','$uibModalInstance'];

    function NewMemberModalController($scope, $uibModalInstance) {
        let vm = this;
        vm.newMember = {
            first_name:'',
            last_name:'',
            email:''
        };

        vm.save = save;
        vm.cancel = cancel;

        function save() {
            $uibModalInstance.close(vm.newMember);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }

    }

})();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5hdXRoLmNvbmZpZy5qcyIsImFwcC5lbnYuY29uZmlnLmpzIiwiYXBwLmpzIiwiYXBwLnJvdXRlcy5qcyIsImFwcGxpY2F0aW9uLmpzIiwiY2FibGUuanMiLCJzZXJ2aWNlcy9SdW5zQXBpLnNlcnZpY2UuanMiLCJzZXJ2aWNlcy9UZWFtTWVtYmVyTGlzdHNBcGkuc2VydmljZS5qcyIsInNlcnZpY2VzL1RlYW1zQXBpLnNlcnZpY2UuanMiLCJzZXJ2aWNlcy9Vc2Vyc0FwaS5zZXJ2aWNlLmpzIiwiY29tcG9uZW50cy9ib2FyZC9ib2FyZC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2JvYXJkL2JvYXJkLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL2VkaXRhYmxlRmllbGQvZWRpdGFibGVGaWVsZC5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2VkaXRhYmxlRmllbGQvZWRpdGFibGVGaWVsZC5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy9jb25zdGFudHMvQXBpQ29uZmlnLmpzIiwiY29tcG9uZW50cy9ob21lL21haW4uY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvaGVhZGVyL2hlYWRlci5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2hlYWRlci9oZWFkZXIuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvaW5kZXgvYWxwaGEuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvaW5kZXgvaW5kZXguY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy9sb2dpbi9sb2dpbi5jb21wb25lbnQuanMiLCJjb21wb25lbnRzL2xvZ2luL2xvZ2luLmNvbnRyb2xsZXIuanMiLCJjb21wb25lbnRzL3J1bnMvcnVuc0Rpc3BsYXlDb25maWdWYWx1ZS5qcyIsImNvbXBvbmVudHMvdGVhbXMvdGVhbXMuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy90ZWFtcy90ZWFtcy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy90ZWFtcy90ZWFtc0Rpc3BsYXlDb25maWdWYWx1ZS5qcyIsImNvbXBvbmVudHMvdXNlcnMvdXNlcnMuY29tcG9uZW50LmpzIiwiY29tcG9uZW50cy91c2Vycy91c2Vycy5jb250cm9sbGVyLmpzIiwiY29tcG9uZW50cy91c2Vycy91c2Vyc0Rpc3BsYXlDb25maWdWYWx1ZS5qcyIsImNvbXBvbmVudHMvbW9kYWxzL0FkZFJ1blRvVXNlci9BZGRSdW5Ub1VzZXIuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvbW9kYWxzL0NyZWF0ZVRlYW1Nb2RhbC9jcmVhdGVUZWFtTW9kYWwuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvbW9kYWxzL0VkaXRSdW5Nb2RhbC9lZGl0UnVuTW9kYWwuY29udHJvbGxlci5qcyIsImNvbXBvbmVudHMvbW9kYWxzL25ld01lbWJlck1vZGFsL25ld01lbWJlck1vZGFsLmNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDOURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvQkE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gKGZ1bmN0aW9uICgpIHtcbi8vICAgICAndXNlIHN0cmljdCc7XG5cbi8vICAgICBhbmd1bGFyXG4vLyAgICAgICAgIC5tb2R1bGUoJ21pbGVzQm9hcmQnKVxuLy8gICAgICAgICAuY29uZmlnKGF1dGhDb25maWcpO1xuXG4vLyAgICAgYXV0aENvbmZpZy4kaW5qZWN0ID0gWyckYXV0aFByb3ZpZGVyJ107XG5cbi8vICAgICAvKiogQG5nSW5qZWN0ICovXG4vLyAgICAgZnVuY3Rpb24gYXV0aENvbmZpZygkYXV0aFByb3ZpZGVyKSB7XG4vLyAgICAgICAgICRhdXRoUHJvdmlkZXIuY29uZmlndXJlKFxuLy8gICAgICAgICAgICAgW3tcbi8vICAgICAgICAgICAgICAgICAnZGVmYXVsdCc6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgYXBpVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcbi8vICAgICAgICAgICAgICAgICAgICAgZW1haWxSZWdpc3RyYXRpb25QYXRoOiAnL3VzZXJzJyxcbi8vICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVPblBhZ2VMb2FkOiB0cnVlLFxuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgJ3VzZXInOiB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGFwaVVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMCcsXG4vLyAgICAgICAgICAgICAgICAgICAgIGVtYWlsUmVnaXN0cmF0aW9uUGF0aDogJy91c2VycycsXG4vLyAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlT25QYWdlTG9hZDogdHJ1ZSxcbi8vICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgICd0ZWFtX293bmVyJzoge1xuLy8gICAgICAgICAgICAgICAgICAgICBhcGlVcmw6ICdodHRwOi8vbG9jYWxob3N0OjgwMDAnLFxuLy8gICAgICAgICAgICAgICAgICAgICBlbWFpbFJlZ2lzdHJhdGlvblBhdGg6ICcvdGVhbV9vd25lcnMnLFxuLy8gICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZU9uUGFnZUxvYWQ6IHRydWUsXG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfV1cbi8vICAgICAgICAgKTtcbi8vICAgICB9XG5cbi8vIH0pKCk7XG4iLCIvLyAoZnVuY3Rpb24oKSB7XG4vLyAgICAgJ3VzZSBzdHJpY3QnO1xuXG4vLyAgICAgYW5ndWxhclxuLy8gICAgICAgICAubW9kdWxlKCdtaWxlc0JvYXJkJylcbi8vICAgICAgICAgLmNvbmZpZyhlbnZDb25maWcpO1xuXG4vLyAgICAgRW52aXJvbm1lbnRDb25maWcuJGluamVjdCA9IFsnZW52U2VydmljZVByb3ZpZGVyJ107XG5cbi8vICAgICBmdW5jdGlvbiBFbnZpcm9ubWVudENvbmZpZyhlbnZTZXJ2aWNlUHJvdmlkZXIpIHtcbi8vICAgICAgICAgZW52U2VydmljZVByb3ZpZGVyLmNvbmZpZyh7XG4vLyAgICAgICAgICAgICBkb21haW5zOiB7XG4vLyAgICAgICAgICAgICAgICAgZGV2ZWxvcG1lbnQ6IFsnbG9jYWxob3N0J10sXG4vLyAgICAgICAgICAgICAgICAgcHJvZHVjdGlvbjogWydtaWxlcy1ib2FyZC5oZXJva3VhcHAuY29tJ11cbi8vICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICB2YXJzOiB7XG4vLyAgICAgICAgICAgICAgICAgZGV2ZWxvcG1lbnQ6IHtcbi8vICAgICAgICAgICAgICAgICAgICAgYXBpVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwJ1xuLy8gICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgcHJvZHVjdGlvbjoge1xuLy8gICAgICAgICAgICAgICAgICAgICBhcGlVcmw6ICdodHRwczovL21pbGVzLWJvYXJkLmhlcm9rdWFwcC5jb20nXG4vLyAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSlcblxuLy8gICAgICAgICBlbnZTZXJ2aWNlUHJvdmlkZXIuY2hlY2soKTtcbi8vICAgICB9XG4vLyB9KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbWlsZXNCb2FyZCcsIFtcbiAgICAgICAgICAgICdlbnZpcm9ubWVudCcsXG4gICAgICAgICAgICAncmVzdGFuZ3VsYXInLFxuICAgICAgICAgICAgJ3VpLnJvdXRlcicsXG4gICAgICAgICAgICAndGVtcGxhdGVzJyxcbiAgICAgICAgICAgICd1aS5ib290c3RyYXAnLFxuICAgICAgICAgICAgJ25nLXRva2VuLWF1dGgnLFxuICAgICAgICAgICAgJ25nU3RvcmFnZSdcbiAgICAgICAgXSlcbiAgICAgICAgLmNvbmZpZyhFbnZpcm9ubWVudENvbmZpZylcbiAgICAgICAgLmNvbmZpZyhhdXRoQ29uZmlnKTtcblxuICAgIGF1dGhDb25maWcuJGluamVjdCA9IFsnJGF1dGhQcm92aWRlciddO1xuXG4gICAgLyoqIEBuZ0luamVjdCAqL1xuICAgIGZ1bmN0aW9uIGF1dGhDb25maWcoJGF1dGhQcm92aWRlcikge1xuICAgICAgICAkYXV0aFByb3ZpZGVyLmNvbmZpZ3VyZShcbiAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgICAgJ2RlZmF1bHQnOiB7XG4gICAgICAgICAgICAgICAgICAgIGFwaVVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMCcsXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsUmVnaXN0cmF0aW9uUGF0aDogJy91c2VycycsXG4gICAgICAgICAgICAgICAgICAgIHZhbGlkYXRlT25QYWdlTG9hZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICd1c2VyJzoge1xuICAgICAgICAgICAgICAgICAgICBhcGlVcmw6ICdodHRwOi8vbG9jYWxob3N0OjgwMDAnLFxuICAgICAgICAgICAgICAgICAgICBlbWFpbFJlZ2lzdHJhdGlvblBhdGg6ICcvdXNlcnMnLFxuICAgICAgICAgICAgICAgICAgICB2YWxpZGF0ZU9uUGFnZUxvYWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAndGVhbV9vd25lcic6IHtcbiAgICAgICAgICAgICAgICAgICAgYXBpVXJsOiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcbiAgICAgICAgICAgICAgICAgICAgZW1haWxSZWdpc3RyYXRpb25QYXRoOiAnL3RlYW1fb3duZXJzJyxcbiAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGVPblBhZ2VMb2FkOiB0cnVlLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1dXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgRW52aXJvbm1lbnRDb25maWcuJGluamVjdCA9IFsnZW52U2VydmljZVByb3ZpZGVyJ107XG5cbiAgICAvKiogQG5nSW5qZWN0ICovXG4gICAgZnVuY3Rpb24gRW52aXJvbm1lbnRDb25maWcoZW52U2VydmljZVByb3ZpZGVyKSB7XG4gICAgICAgIGVudlNlcnZpY2VQcm92aWRlci5jb25maWcoe1xuICAgICAgICAgICAgZG9tYWluczoge1xuICAgICAgICAgICAgICAgIGRldmVsb3BtZW50OiBbJ2xvY2FsaG9zdCddLFxuICAgICAgICAgICAgICAgIHByb2R1Y3Rpb246IFsnbWlsZXMtYm9hcmQuaGVyb2t1YXBwLmNvbSddXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmFyczoge1xuICAgICAgICAgICAgICAgIGRldmVsb3BtZW50OiB7XG4gICAgICAgICAgICAgICAgICAgIGFwaVVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByb2R1Y3Rpb246IHtcbiAgICAgICAgICAgICAgICAgICAgYXBpVXJsOiAnaHR0cHM6Ly9taWxlcy1ib2FyZC5oZXJva3VhcHAuY29tJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVudlNlcnZpY2VQcm92aWRlci5jaGVjaygpO1xuICAgIH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbWlsZXNCb2FyZCcpXG4gICAgICAgIC5jb25maWcoUm91dGVyQ29uZmlnKTtcblxuICAgIFJvdXRlckNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInXTtcblxuICAgIC8qKiBAbmdJbmplY3QgKi9cbiAgICBmdW5jdGlvbiBSb3V0ZXJDb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgICAgICAgICAgICAgdmFyIGFscGhhU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdpbmRleCcsXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvaW5kZXgvX2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnQWxwaGFDb250cm9sbGVyIGFzIHZtJyxcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0aDogZnVuY3Rpb24gKCRhdXRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICRhdXRoLnZhbGlkYXRlVXNlcigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciBob21lU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdob21lJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL2hvbWUnLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvaG9tZS9faG9tZS5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ01haW5Db250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdmFyIGxvZ2luU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdsb2dpbicsXG4gICAgICAgICAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9sb2dpbi9fbG9naW4uaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdMb2dpbkNvbnRyb2xsZXIgYXMgdm0nXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciB0ZWFtU3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICd0ZWFtJyxcbiAgICAgICAgICAgICAgICAgICAgdXJsOiAnL3RlYW1zLzp0ZWFtX2lkJyxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL3RlYW1zL190ZWFtcy5odG1sJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlcjogJ1RlYW1zQ29udHJvbGxlciBhcyB2bScsXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlYW06IGZ1bmN0aW9uIChUZWFtc0FwaSwgJHN0YXRlUGFyYW1zKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRlYW1zQXBpLmdldCgkc3RhdGVQYXJhbXMudGVhbV9pZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdmFyIHVzZXJTdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogJ3VzZXInLFxuICAgICAgICAgICAgICAgICAgICB1cmw6ICcvdXNlcnMvOnVzZXJJZCcsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy91c2Vycy9fdXNlcnMuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdVc2Vyc0NvbnRyb2xsZXIgYXMgdm0nLFxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1c2VyOiBmdW5jdGlvbiAoVXNlcnNBcGksICRzdGF0ZVBhcmFtcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBVc2Vyc0FwaS5nZXQoJHN0YXRlUGFyYW1zLnVzZXJJZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoYWxwaGFTdGF0ZSk7XG4gICAgICAgICAgICAgICAgJHN0YXRlUHJvdmlkZXIuc3RhdGUoaG9tZVN0YXRlKTtcbiAgICAgICAgICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZShsb2dpblN0YXRlKTtcbiAgICAgICAgICAgICAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSh0ZWFtU3RhdGUpO1xuICAgICAgICAgICAgICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKHVzZXJTdGF0ZSk7XG4gICAgICAgICAgICB9XG5cbn0pKCk7IiwiLy8gVGhpcyBpcyBhIG1hbmlmZXN0IGZpbGUgdGhhdCdsbCBiZSBjb21waWxlZCBpbnRvIGFwcGxpY2F0aW9uLmpzLCB3aGljaCB3aWxsIGluY2x1ZGUgYWxsIHRoZSBmaWxlc1xuLy8gbGlzdGVkIGJlbG93LlxuLy9cbi8vIEFueSBKYXZhU2NyaXB0L0NvZmZlZSBmaWxlIHdpdGhpbiB0aGlzIGRpcmVjdG9yeSwgbGliL2Fzc2V0cy9qYXZhc2NyaXB0cywgdmVuZG9yL2Fzc2V0cy9qYXZhc2NyaXB0cyxcbi8vIG9yIGFueSBwbHVnaW4ncyB2ZW5kb3IvYXNzZXRzL2phdmFzY3JpcHRzIGRpcmVjdG9yeSBjYW4gYmUgcmVmZXJlbmNlZCBoZXJlIHVzaW5nIGEgcmVsYXRpdmUgcGF0aC5cbi8vXG4vLyBJdCdzIG5vdCBhZHZpc2FibGUgdG8gYWRkIGNvZGUgZGlyZWN0bHkgaGVyZSwgYnV0IGlmIHlvdSBkbywgaXQnbGwgYXBwZWFyIGF0IHRoZSBib3R0b20gb2YgdGhlXG4vLyBjb21waWxlZCBmaWxlLiBKYXZhU2NyaXB0IGNvZGUgaW4gdGhpcyBmaWxlIHNob3VsZCBiZSBhZGRlZCBhZnRlciB0aGUgbGFzdCByZXF1aXJlXyogc3RhdGVtZW50LlxuLy9cbi8vIFJlYWQgU3Byb2NrZXRzIFJFQURNRSAoaHR0cHM6Ly9naXRodWIuY29tL3JhaWxzL3Nwcm9ja2V0cyNzcHJvY2tldHMtZGlyZWN0aXZlcykgZm9yIGRldGFpbHNcbi8vIGFib3V0IHN1cHBvcnRlZCBkaXJlY3RpdmVzLlxuLy9cbi8vPSByZXF1aXJlIGpxdWVyeVxuLy89IHJlcXVpcmUganF1ZXJ5X3Vqc1xuLy89IHJlcXVpcmUgdHdpdHRlci9ib290c3RyYXBcbi8vPSByZXF1aXJlIGFuZ3VsYXIvYW5ndWxhclxuLy89IHJlcXVpcmUgYW5ndWxhci11aS1yb3V0ZXJcbi8vPSByZXF1aXJlIGFuZ3VsYXItY29va2llXG4vLz0gcmVxdWlyZSBhbmd1bGFyLXJhaWxzLXRlbXBsYXRlc1xuLy89IHJlcXVpcmUgbG9kYXNoL2xvZGFzaC5taW4uanNcbi8vPSByZXF1aXJlIGFuZ3VsYXItdWktYm9vdHN0cmFwL2Rpc3QvdWktYm9vdHN0cmFwLmpzXG4vLz0gcmVxdWlyZSBhbmd1bGFyLXVpLWJvb3RzdHJhcC9kaXN0L3VpLWJvb3RzdHJhcC10cGxzLmpzXG4vLz0gcmVxdWlyZSByZXN0YW5ndWxhclxuLy89IHJlcXVpcmUgbW9tZW50L21pbi9tb21lbnQubWluLmpzXG4vLz0gcmVxdWlyZSBuZy10b2tlbi1hdXRoL2Rpc3QvbmctdG9rZW4tYXV0aC5taW4uanNcbi8vPSByZXF1aXJlIG5nc3RvcmFnZS9uZ1N0b3JhZ2UubWluLmpzXG4vLz0gcmVxdWlyZSBhbmd1bGFyLWVudmlyb25tZW50L2Rpc3QvYW5ndWxhci1lbnZpcm9ubWVudC5taW4uanNcbi8vPSByZXF1aXJlX3RyZWUgLlxuIiwiLy8gQWN0aW9uIENhYmxlIHByb3ZpZGVzIHRoZSBmcmFtZXdvcmsgdG8gZGVhbCB3aXRoIFdlYlNvY2tldHMgaW4gUmFpbHMuXG4vLyBZb3UgY2FuIGdlbmVyYXRlIG5ldyBjaGFubmVscyB3aGVyZSBXZWJTb2NrZXQgZmVhdHVyZXMgbGl2ZSB1c2luZyB0aGUgcmFpbHMgZ2VuZXJhdGUgY2hhbm5lbCBjb21tYW5kLlxuLy9cbi8vPSByZXF1aXJlIGFjdGlvbl9jYWJsZVxuLy89IHJlcXVpcmVfc2VsZlxuLy89IHJlcXVpcmVfdHJlZSAuL2NoYW5uZWxzXG5cbihmdW5jdGlvbigpIHtcbiAgdGhpcy5BcHAgfHwgKHRoaXMuQXBwID0ge30pO1xuXG4gIEFwcC5jYWJsZSA9IEFjdGlvbkNhYmxlLmNyZWF0ZUNvbnN1bWVyKCk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCIoZnVuY3Rpb24oKXtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ21pbGVzQm9hcmQnKVxuICAgICAgICAuZmFjdG9yeSgnUnVuc0FwaScsIFJ1bnNBcGkpO1xuXG4gICAgUnVuc0FwaS4kaW5qZWN0ID0gWydSZXN0YW5ndWxhciddO1xuXG4gICAgZnVuY3Rpb24gUnVuc0FwaShSZXN0YW5ndWxhcikge1xuICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIuc2VydmljZSgncnVucycpO1xuICAgIH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbWlsZXNCb2FyZCcpXG4gICAgICAgIC5mYWN0b3J5KCdUZWFtTWVtYmVyTGlzdHNBcGknLCBUZWFtTWVtYmVyTGlzdHNBcGkpO1xuXG4gICAgVGVhbU1lbWJlckxpc3RzQXBpLiRpbmplY3QgPSBbJ1Jlc3Rhbmd1bGFyJ107XG5cbiAgICBmdW5jdGlvbiBUZWFtTWVtYmVyTGlzdHNBcGkoUmVzdGFuZ3VsYXIpIHtcbiAgICAgICAgICAgIHJldHVybiBSZXN0YW5ndWxhci5zZXJ2aWNlKCd0ZWFtX21lbWJlcl9saXN0cycpO1xuICAgICAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbWlsZXNCb2FyZCcpXG4gICAgICAgIC5mYWN0b3J5KCdUZWFtc0FwaScsIFRlYW1zQXBpKTtcblxuICAgIFRlYW1zQXBpLiRpbmplY3QgPSBbJ1Jlc3Rhbmd1bGFyJ107XG5cbiAgICBmdW5jdGlvbiBUZWFtc0FwaShSZXN0YW5ndWxhcikge1xuICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIuc2VydmljZSgndGVhbXMnKTtcbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG4gICAgXG4gICAgYW5ndWxhclxuICAgIC5tb2R1bGUoJ21pbGVzQm9hcmQnKVxuICAgIC5mYWN0b3J5KCdVc2Vyc0FwaScsIFVzZXJzQXBpKTtcblxuICAgIFVzZXJzQXBpLiRpbmplY3QgPSBbJ1Jlc3Rhbmd1bGFyJ107XG5cbiAgICBmdW5jdGlvbiBVc2Vyc0FwaShSZXN0YW5ndWxhcikge1xuICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIuc2VydmljZSgndXNlcnMnKTtcbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4gICAgLm1vZHVsZSgnbWlsZXNCb2FyZCcpXG4gICAgLmNvbXBvbmVudCgnYm9hcmQnLCB7XG4gICAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9ib2FyZC9fYm9hcmQuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdCb2FyZENvbnRyb2xsZXInLFxuICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgIGJpbmRpbmdzOiB7XG4gICAgICAgICAgICBkaXNwbGF5T2JqRGF0YTogJzwnLFxuICAgICAgICAgICAgZGlzcGxheU9iakNvbmZpZzogJzwnLFxuICAgICAgICAgICAgcm93Q2FsbGJhY2s6ICcmJ1xuICAgICAgICB9XG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuICAgIC5tb2R1bGUoJ21pbGVzQm9hcmQnKVxuICAgIC5jb250cm9sbGVyKCdCb2FyZENvbnRyb2xsZXInLCBCb2FyZENvbnRyb2xsZXIpO1xuXG5Cb2FyZENvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJ107Ly8nZGlzcGxheU9iaicsJ2Rpc3BsYXlPYmpDb25maWcnXTtcblxuZnVuY3Rpb24gQm9hcmRDb250cm9sbGVyKCRzY29wZSkge1xuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgdm0uJG9uSW5pdCA9IG9uSW5pdDtcblxuICAgIHZtLmNhbGxiYWNrID0gY2FsbGJhY2s7XG5cbiAgICBmdW5jdGlvbiBvbkluaXQoKSB7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsbGJhY2socm93KSB7XG4gICAgICAgIHZtLnJvd0NhbGxiYWNrKCkocm93KTtcbiAgICB9XG59XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbWlsZXNCb2FyZCcpXG4gICAgICAgIC5jb21wb25lbnQoJ2VkaXRhYmxlRmllbGQnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvZWRpdGFibGVGaWVsZC9fZWRpdGFibGVGaWVsZC5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdFZGl0YWJsZUZpZWxkQ29udHJvbGxlcicsXG4gICAgICAgICAgICBiaW5kaW5nczoge1xuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWU6ICc8JyxcbiAgICAgICAgICAgICAgICBmaWVsZFR5cGU6ICdAPycsXG4gICAgICAgICAgICAgICAgb25VcGRhdGU6ICcmJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ21pbGVzQm9hcmQnKVxuICAgICAgICAuY29udHJvbGxlcignRWRpdGFibGVGaWVsZENvbnRyb2xsZXInLCBFZGl0YWJsZUZpZWxkQ29udHJvbGxlcik7XG5cbiAgICBFZGl0YWJsZUZpZWxkQ29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGVsZW1lbnQnLCAnJGF0dHJzJ107XG5cbmZ1bmN0aW9uIEVkaXRhYmxlRmllbGRDb250cm9sbGVyKCRzY29wZSwgJGVsZW1lbnQsICRhdHRycykge1xuICAgIHZhciBjdHJsID0gdGhpcztcbiAgICBjdHJsLmVkaXRNb2RlID0gZmFsc2U7XG5cbiAgICBjdHJsLmhhbmRsZU1vZGVDaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChjdHJsLmVkaXRNb2RlKSB7XG4gICAgICAgICAgICBjdHJsLm9uVXBkYXRlKHsgdmFsdWU6IGN0cmwuZmllbGRWYWx1ZSB9KTtcbiAgICAgICAgICAgIGN0cmwuZmllbGRWYWx1ZUNvcHkgPSBjdHJsLmZpZWxkVmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgY3RybC5lZGl0TW9kZSA9ICFjdHJsLmVkaXRNb2RlO1xuICAgIH07XG5cbiAgICBjdHJsLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjdHJsLmZpZWxkVmFsdWUgPSBjdHJsLmZpZWxkVmFsdWVDb3B5O1xuICAgIH07XG5cbiAgICBjdHJsLiRvbkluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIE1ha2UgYSBjb3B5IG9mIHRoZSBpbml0aWFsIHZhbHVlIHRvIGJlIGFibGUgdG8gcmVzZXQgaXQgbGF0ZXJcbiAgICAgICAgY3RybC5maWVsZFZhbHVlQ29weSA9IGN0cmwuZmllbGRWYWx1ZTtcblxuICAgICAgICAvLyBTZXQgYSBkZWZhdWx0IGZpZWxkVHlwZVxuICAgICAgICBpZiAoIWN0cmwuZmllbGRUeXBlKSB7XG4gICAgICAgICAgICBjdHJsLmZpZWxkVHlwZSA9ICd0ZXh0JztcbiAgICAgICAgfVxuICAgIH07XG59XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdtaWxlc0JvYXJkJylcbiAgICAgICAgLmNvbnN0YW50KCdBcGlDb25maWcnLCB7XG4gICAgICAgICAgICBhcGlVcmw6ICdodHRwOi8vbG9jYWxob3N0OjgwMDAvJyxcbiAgICAgICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbWlsZXNCb2FyZCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdNYWluQ29udHJvbGxlcicsTWFpbkNvbnRyb2xsZXIpO1xuXG4gICAgTWFpbkNvbnRyb2xsZXIuJGluamVjdCA9IFtdXG5cbiAgICBmdW5jdGlvbiBNYWluQ29udHJvbGxlcigpIHtcbiAgICAgICAgbGV0IHZtID0gdGhpcztcbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdtaWxlc0JvYXJkJylcbiAgICAuY29tcG9uZW50KCdtaWxlc0hlYWRlcicse1xuICAgICAgICB0ZW1wbGF0ZVVybDonY29tcG9uZW50cy9oZWFkZXIvX2hlYWRlci5odG1sJyxcbiAgICAgICAgY29udHJvbGxlcjogJ0hlYWRlckNvbnRyb2xsZXInXG4gICAgfSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdtaWxlc0JvYXJkJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0hlYWRlckNvbnRyb2xsZXInLEhlYWRlckNvbnRyb2xsZXIpO1xuICAgIFxuICAgIEhlYWRlckNvbnRyb2xsZXIuJGluamVjdCA9IFtdO1xuXG4gICAgZnVuY3Rpb24gSGVhZGVyQ29udHJvbGxlcigpIHtcbiAgICAgICAgdmFyIGN0cmwgPSB0aGlzO1xuICAgICAgICBjdHJsLm5hdiA9IFtcbiAgICAgICAgICAgIHsgdWlTcmVmOiAnaG9tZScsIGRpc3BsYXk6ICdIb21lJyB9LFxuICAgICAgICAgICAgeyB1aVNyZWY6ICd0ZWFtcycsIGRpc3BsYXk6ICdUZWFtcycgfSxcbiAgICAgICAgXVxuICAgIH1cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdtaWxlc0JvYXJkJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0FscGhhQ29udHJvbGxlcicsIEFscGhhQ29udHJvbGxlcik7XG5cbiAgICBBbHBoYUNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHdpbmRvdyddO1xuXG4gICAgZnVuY3Rpb24gQWxwaGFDb250cm9sbGVyKCR3aW5kb3cpIHtcbiAgICAgICAgbGV0IHZtID0gdGhpcztcblxuICAgICAgICB2bS5oaWRlTmF2ID0gJHdpbmRvdy5sb2NhdGlvbi5oYXNoID09PSAnIy9sb2dpbicgPyB0cnVlIDogZmFsc2U7XG4gICAgfVxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdtaWxlc0JvYXJkJylcbiAgICAgICAgLmNvbXBvbmVudCgnaW5kZXgnLCB7XG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvaW5kZXgvX2luZGV4Lmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ0FscGhhQ29udHJvbGxlcicsXG4gICAgICAgICAgICBiaW5kaW5nczoge1xuXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICd1c2VyIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ21pbGVzQm9hcmQnKVxuICAgICAgICAuY29tcG9uZW50KCdsb2dpbicsIHtcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9sb2dpbi9fbG9naW4uaHRtbCcsXG4gICAgICAgICAgICBjb250cm9sbGVyOiAnTG9naW5Db250cm9sbGVyJyxcbiAgICAgICAgICAgIGJpbmRpbmdzOiB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCc7XG5cbiAgICBhbmd1bGFyXG4gICAgICAgIC5tb2R1bGUoJ21pbGVzQm9hcmQnKVxuICAgICAgICAuY29udHJvbGxlcignTG9naW5Db250cm9sbGVyJywgTG9naW5Db250cm9sbGVyKTtcbiAgICBcbiAgICBMb2dpbkNvbnRyb2xsZXIuJGluamVjdCA9IFsnJGF1dGgnLCAnJGxvY2FsU3RvcmFnZScsICckc2NvcGUnLCAnJHN0YXRlJywgJ1VzZXJzQXBpJ107XG5cbiAgICBmdW5jdGlvbiBMb2dpbkNvbnRyb2xsZXIoJGF1dGgsICRsb2NhbFN0b3JhZ2UsICRzY29wZSwgJHN0YXRlLCBVc2Vyc0FwaSkge1xuICAgICAgICBsZXQgdm0gPSB0aGlzO1xuICAgICAgICBsZXQgUFdfQ09ORl9NU0cgPSB7XG4gICAgICAgICAgICBNQVRDSDoge3RleHQ6ICdUaGV5IG1hdGNoIScsIGNsYXNzTmFtZTogJ3B3TWF0Y2gnfSxcbiAgICAgICAgICAgIE5PX01BVENIOiB7dGV4dDogJ1lvdXIgcGFzc3dvcmRzIGRvIG5vdCBtYXRjaC4uLicsIGNsYXNzTmFtZTogJ3B3Tm9NYXRjaCd9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbG9naW5Gb3JtVXJsID0gXCInY29tcG9uZW50cy9sb2dpbi9fbG9naW5Gb3JtLmh0bWwnXCI7XG4gICAgICAgIGxldCByZWdpc3RlckZvcm1VcmwgPSBcIidjb21wb25lbnRzL2xvZ2luL19yZWdpc3RlckZvcm0uaHRtbCdcIjtcblxuICAgICAgICB2bS50YWJzID0gW3t0aXRsZTonTG9naW4nLCBcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDogJzxuZy1pbmNsdWRlIHNyYz1cIicrbG9naW5Gb3JtVXJsKydcIj48L25nLWluY2x1ZGU+J30sIFxuICAgICAgICAgICAgICAgICAgIHt0aXRsZTogJ1JlZ2lzdGVyJyxcbiAgICAgICAgICAgICAgICAgICAgY29udGVudDonPG5nLWluY2x1ZGUgc3JjPVwiJytyZWdpc3RlckZvcm1VcmwrJ1wiPjwvbmctaW5jbHVkZT4nfV07XG5cbiAgICAgICAgdm0udXNlcl9pbmZvID0ge1xuICAgICAgICAgICAgZmlyc3RfbmFtZTogJycsXG4gICAgICAgICAgICBsYXN0X25hbWU6ICcnLFxuICAgICAgICAgICAgcGFzc3dvcmQ6ICcnLFxuICAgICAgICAgICAgcGFzc3dvcmRfY29uZmlybWF0aW9uOiAnJyxcbiAgICAgICAgICAgIGVtYWlsOiAnJ1xuICAgICAgICB9O1xuXG4gICAgICAgIHZtLiRvbkluaXQgPSBvbkluaXQ7XG4gICAgICAgIHZtLnNldFRhYiA9IHNldFRhYjtcbiAgICAgICAgdm0uaGFuZGxlU3VibWl0Q2xpY2sgPSBoYW5kbGVTdWJtaXRDbGljaztcblxuICAgICAgICBmdW5jdGlvbiBvbkluaXQoKXtcbiAgICAgICAgICAgIHZtLnRhYiA9IDA7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXRUYWIoaW5kZXgpIHtcbiAgICAgICAgICAgIHZtLnRhYiA9IGluZGV4O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlU3VibWl0Q2xpY2soKSB7XG4gICAgICAgICAgICBzd2l0Y2godm0udGFiKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVMb2dpbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVN1Ym1pdFJlZ2lzdHJhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVMb2dpbigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVMb2dpbigpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJGF1dGguc3VibWl0TG9naW4odm0udXNlcl9pbmZvKVxuICAgICAgICAgICAgICAgIC50aGVuKGxvZ2luU3VjY2VzcywgbG9naW5GYWlsKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbG9naW5TdWNjZXNzKHJlc3ApIHtcbiAgICAgICAgICAgIFVzZXJzQXBpLmdldChyZXNwLmlkKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgJGxvY2FsU3RvcmFnZS51c2VyID0gcmVzcG9uc2UudXNlcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHN0YXRlLmdvKCd1c2VyJyx7dXNlcklkOiByZXNwLmlkfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGxvZ2luRmFpbChyZXNwKSB7XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZVN1Ym1pdFJlZ2lzdHJhdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBuZXdfdXNlciA9IHtcbiAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiB2bS51c2VyX2luZm8uZmlyc3RfbmFtZSxcbiAgICAgICAgICAgICAgICBsYXN0X25hbWU6IHZtLnVzZXJfaW5mby5sYXN0X25hbWUsXG4gICAgICAgICAgICAgICAgcGFzc3dvcmQ6IHZtLnVzZXJfaW5mby5wYXNzd29yZCxcbiAgICAgICAgICAgICAgICBwYXNzd29yZF9jb25maXJtYXRpb246IHZtLnVzZXJfaW5mby5wYXNzd29yZF9jb25maXJtYXRpb24sXG4gICAgICAgICAgICAgICAgZW1haWw6IHZtLnVzZXJfaW5mby5lbWFpbFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGF1dGguc3VibWl0UmVnaXN0cmF0aW9uKG5ld191c2VyKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlZ2lzdHJhaW9uU3VjY2VzcywgcmVnaXN0cmF0aW9uRmFpbCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZWdpc3RyYWlvblN1Y2Nlc3MocmVzcCkge1xuXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiByZWdpc3RyYXRpb25GYWlsKHJlc3ApIHtcblxuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIFxuICAgIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdtaWxlc0JvYXJkJylcbiAgICAudmFsdWUoJ1J1bnNEaXNwbGF5Q29uZmlnJywge1xuICAgICAgICAnb2JqY29kZSc6ICdSVU4nLFxuICAgICAgICAncGFyYW1OYW1lJzogJ3J1bklkJyxcbiAgICAgICAgXCJoZWFkZXJzXCI6IFt7dGV4dDonaWQnLCBoaWRkZW46dHJ1ZX0sXG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0OidSdW4gRGF0ZScsIGhpZGRlbjpmYWxzZX0gLCBcbiAgICAgICAgICAgICAgICAgICAge3RleHQ6J0Rpc3RhbmNlJywgaGlkZGVuOmZhbHNlfSwgXG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0OidUZWFtJywgaGlkZGVuOmZhbHNlLCB1aVNyZWY6J3RlYW0nfV0sXG4gICAgICAgICdyb3dDYWxsYmFja1RleHQnOiAnRWRpdCBSdW4nXG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbWlsZXNCb2FyZCcpXG4gICAgICAgIC5jb21wb25lbnQoJ3RlYW1zJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICdjb21wb25lbnRzL3RlYW1zL190ZWFtcy5odG1sJyxcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdUZWFtc0NvbnRyb2xsZXInLFxuICAgICAgICAgICAgYmluZGluZ3M6IHtcbiAgICAgICAgICAgICAgICB0ZWFtOiAnPCdcbiAgICAgICAgfVxuICAgIH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICAndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbiAgICAubW9kdWxlKCdtaWxlc0JvYXJkJylcbiAgICAuY29udHJvbGxlcignVGVhbXNDb250cm9sbGVyJywgVGVhbXNDb250cm9sbGVyKTtcblxuVGVhbXNDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsJyRzdGF0ZVBhcmFtcycsICdSdW5zQXBpJyAsICd0ZWFtJywnVGVhbXNBcGknLCAnVGVhbU1lbWJlckxpc3RzQXBpJywgJyR1aWJNb2RhbCcgLCdVc2Vyc0FwaScsJ1VzZXJzRGlzcGxheUNvbmZpZyddO1xuXG4gICAgZnVuY3Rpb24gVGVhbXNDb250cm9sbGVyKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBSdW5zQXBpLCB0ZWFtLCBUZWFtc0FwaSwgVGVhbU1lbWJlckxpc3RzQXBpLCAkdWliTW9kYWwgLCBVc2Vyc0FwaSwgVXNlcnNEaXNwbGF5Q29uZmlnKSB7XG4gICAgICAgIHZhciB2bSA9IHRoaXM7XG4gICAgICAgIHZtLnRlYW0gPSB0ZWFtO1xuICAgICAgICB2bS5kaXNwbGF5Q29uZmlnID0gVXNlcnNEaXNwbGF5Q29uZmlnO1xuXG4gICAgICAgIHZtLiRvbkluaXQgPSBvbkluaXQ7XG4gICAgICAgIHZtLiRvbkNoYW5nZXMgPSBvbkNoYW5nZXM7XG4gICAgICAgIHZtLnNob3dBZGRSdW5Ub1VzZXIgPSBzaG93QWRkUnVuVG9Vc2VyO1xuICAgICAgICB2bS5zaG93QWRkVGVhbU1lbWJlck1vZGFsID0gc2hvd0FkZFRlYW1NZW1iZXJNb2RhbDtcbiAgICAgICAgdm0uc2hvd1VzZXJQcm9maWxlTW9kYWwgPSBzaG93VXNlclByb2ZpbGVNb2RhbDtcblxuICAgICAgICBmdW5jdGlvbiBvbkluaXQoKSB7XG4gICAgICAgICAgICB2bS5kaXNwbGF5T2JqRGF0YSA9IGJ1aWxkRGlzcGxheU9iamVjdCh2bS50ZWFtLnVzZXJzLCBVc2Vyc0Rpc3BsYXlDb25maWcpXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbkNoYW5nZXMoY2hhbmdlcykge1xuICAgICAgICAgICAgdm0uZGlzcGxheU9iakRhdGEgPSBidWlsZERpc3BsYXlPYmplY3Qodm0udGVhbS51c2VycywgVXNlcnNEaXNwbGF5Q29uZmlnKVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYnVpbGREaXNwbGF5T2JqZWN0KG9iaiwgY29uZmlnKSB7XG4gICAgICAgICAgICBsZXQgZGlzcGxheU9iaiA9IHt9O1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBvYmoubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5oZWFkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZGlzcGxheU9iai5oYXNPd25Qcm9wZXJ0eShqKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU9ialtqXSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKCFkaXNwbGF5T2JqW2pdLmhhc093blByb3BlcnR5KGNvbmZpZy5oZWFkZXJzW2ldLnRleHQpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlPYmpbal1bY29uZmlnLmhlYWRlcnNbaV0udGV4dF0gPSB7IHRleHQ6ICcnLCBoaWRkZW46IGZhbHNlIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlPYmpbal1bY29uZmlnLmhlYWRlcnNbaV0udGV4dF0udGV4dCA9IG9ialtqXVsoY29uZmlnLmhlYWRlcnNbaV0udGV4dC50b0xvd2VyQ2FzZSgpKS5yZXBsYWNlKC9cXHMvZywgJ18nKV07XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXlPYmpbal1bY29uZmlnLmhlYWRlcnNbaV0udGV4dF0uaGlkZGVuID0gY29uZmlnLmhlYWRlcnNbaV0uaGlkZGVuO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuaGVhZGVyc1tpXS51aVNyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXlPYmpbal1bY29uZmlnLmhlYWRlcnNbaV0udGV4dF0udWlTcmVmID0gY29uZmlnLmhlYWRlcnNbaV0udWlTcmVmICsgJyh7JyArIGNvbmZpZy5wYXJhbU5hbWUgKyAnOicgKyBvYmpbal0uaWQgKyAnfSknO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRpc3BsYXlPYmpbal1bJ05hbWUnXS50ZXh0ID0gb2JqW2pdLmZpcnN0X25hbWUgKyAnICcgK29ialtqXS5sYXN0X25hbWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRpc3BsYXlPYmo7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzaG93QWRkVGVhbU1lbWJlck1vZGFsKHBhcmVudFNlbGVjdG9yKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50RWxlbSA9IHBhcmVudFNlbGVjdG9yID9cbiAgICAgICAgICAgICAgICBhbmd1bGFyLmVsZW1lbnQoJGRvY3VtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWNvbnRhaW5lciAnICsgcGFyZW50U2VsZWN0b3IpKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhcmlhTGFiZWxsZWRCeTogJ21vZGFsLXRpdGxlJyxcbiAgICAgICAgICAgICAgICBhcmlhRGVzY3JpYmVkQnk6ICdtb2RhbC1ib2R5JyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvbW9kYWxzL25ld01lbWJlck1vZGFsL19uZXdNZW1iZXJNb2RhbC5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnTmV3TWVtYmVyTW9kYWxDb250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgICAgICAgICAgc2l6ZTogJ21kJyxcbiAgICAgICAgICAgICAgICBhcHBlbmRUbzogcGFyZW50RWxlbSxcbiAgICAgICAgICAgICAgICAvLyByZXNvbHZlOiB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGl0ZW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICByZXR1cm4gdm0uaXRlbXM7XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgbW9kYWxJbnN0YW5jZS5yZXN1bHQudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgVXNlcnNBcGkuZ2V0KCcnLHtlbWFpbDpyZXN1bHQuZW1haWx9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgICAgICAgICAgaWYocmVzcG9uc2UuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1c2VyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiByZXNwb25zZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiByZXNwb25zZS5maXJzdF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogcmVzcG9uc2UubGFzdF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlYW1fZGlzdGFuY2U6IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVhbV9ydW5fY291bnQ6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFRlYW1NZW1iZXJMaXN0c0FwaS5wb3N0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOiByZXNwb25zZS5pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWFtX2lkOiAkc3RhdGVQYXJhbXMudGVhbV9pZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocG9zdF9yZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnRlYW0udXNlcnMucHVzaCh1c2VyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5kaXNwbGF5T2JqRGF0YSA9IGJ1aWxkRGlzcGxheU9iamVjdCh2bS50ZWFtLnVzZXJzLCBVc2Vyc0Rpc3BsYXlDb25maWcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5ld1VzZXIgPSB7IFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVzZXI6e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdF9uYW1lIDogcmVzdWx0LmZpcnN0X25hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxhc3RfbmFtZTogcmVzdWx0Lmxhc3RfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW1haWwgOiByZXN1bHQuZW1haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlYW1faWQ6ICRzdGF0ZVBhcmFtcy50ZWFtX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXNzd29yZCA6ICd0ZXN0MTIzNCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3N3b3JkX2NvbmZpcm1hdGlvbjogJ3Rlc3QxMjM0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90eXBlOiAndXNlcidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIFVzZXJzQXBpLnBvc3QobmV3VXNlcikudGhlbihmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCB1c2VyID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogcmVzdWx0LmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdF9uYW1lOiBuZXdVc2VyLnVzZXIuZmlyc3RfbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGFzdF9uYW1lOiBuZXdVc2VyLnVzZXIubGFzdF9uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWFtX2Rpc3RhbmNlOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWFtX3J1bl9jb3VudDogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS50ZWFtLnVzZXJzLnB1c2godXNlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0uZGlzcGxheU9iakRhdGEgPSBidWlsZERpc3BsYXlPYmplY3Qodm0udGVhbS51c2VycywgVXNlcnNEaXNwbGF5Q29uZmlnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7fSk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIHNob3dBZGRSdW5Ub1VzZXIoaW5wdXQpIHtcbiAgICAgICAgICAgIC8vIHZhciBwYXJlbnRFbGVtID0gcGFyZW50U2VsZWN0b3IgP1xuICAgICAgICAgICAgLy8gICAgIGFuZ3VsYXIuZWxlbWVudCgkZG9jdW1lbnRbMF0ucXVlcnlTZWxlY3RvcignLnBhZ2UtY29udGFpbmVyICcgKyBwYXJlbnRTZWxlY3RvcikpIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgbGV0IHVzZXJfaWQgPSBpbnB1dC5pZC50ZXh0OyAvL2NvbnRhaW5zIHVzZXIgaWRcbiAgICAgICAgICAgIHZhciBtb2RhbEluc3RhbmNlID0gJHVpYk1vZGFsLm9wZW4oe1xuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBhcmlhTGFiZWxsZWRCeTogJ21vZGFsLXRpdGxlJyxcbiAgICAgICAgICAgICAgICBhcmlhRGVzY3JpYmVkQnk6ICdtb2RhbC1ib2R5JyxcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2NvbXBvbmVudHMvbW9kYWxzL0FkZFJ1blRvVXNlci9fYWRkUnVuVG9Vc2VyLmh0bWwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdBZGRSdW5Ub1VzZXJDb250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgICAgICAgICAgc2l6ZTogJ21kJyxcbiAgICAgICAgICAgICAgICAvLyBhcHBlbmRUbzogcGFyZW50RWxlbSxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICBsZXQgbmV3UnVuID0ge1xuICAgICAgICAgICAgICAgICAgICBydW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RhbmNlOiByZXN1bHQuZGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBydW5fZGF0ZTogcmVzdWx0LnJ1bl9kYXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVhbV9pZDogICRzdGF0ZVBhcmFtcy50ZWFtX2lkLFxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlcl9pZDogIHVzZXJfaWRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIFJ1bnNBcGkucG9zdChuZXdSdW4pLnRoZW4oZnVuY3Rpb24gKGFwaV9yZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHZtLnRlYW0udXNlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZtLnRlYW0udXNlcnNbaV0uaWQgPT09IHBhcnNlSW50KHVzZXJfaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0udGVhbS51c2Vyc1tpXS50ZWFtX2Rpc3RhbmNlID0gcGFyc2VJbnQodm0udGVhbS51c2Vyc1tpXS50ZWFtX2Rpc3RhbmNlKSArIHBhcnNlSW50KHJlc3VsdC5kaXN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdm0udGVhbS51c2Vyc1tpXS50ZWFtX3J1bl9jb3VudCA9IHBhcnNlSW50KHZtLnRlYW0udXNlcnNbaV0udGVhbV9ydW5fY291bnQpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS5kaXNwbGF5T2JqRGF0YSA9IGJ1aWxkRGlzcGxheU9iamVjdCh2bS50ZWFtLnVzZXJzLCBVc2Vyc0Rpc3BsYXlDb25maWcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZWFzb24pIHtcbiAgICAgICAgICAgICAgICBpZihyZWFzb24gIT09ICdjYW5jZWwnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IocmVhc29uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2hvd1VzZXJQcm9maWxlTW9kYWwodXNlcl9pZCkge1xuXG4gICAgfVxuXG59KSgpOyIsImFuZ3VsYXJcbiAgICAubW9kdWxlKCdtaWxlc0JvYXJkJylcbiAgICAudmFsdWUoJ1RlYW1zRGlzcGxheUNvbmZpZycse1xuICAgICAgICAnb2JqY29kZSc6ICdURUFNJyxcbiAgICAgICAgJ3BhcmFtTmFtZSc6ICd0ZWFtX2lkJyxcbiAgICAgICAgJ2hlYWRlcnMnOiBbe3RleHQ6J2lkJyxoaWRkZW46dHJ1ZX0sXG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0OiduYW1lJywgaGlkZGVuOmZhbHNlLCB1aVNyZWY6J3RlYW0nfSwgXG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0Oidsb2NhdGlvbicsIGhpZGRlbjogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICB7dGV4dDonY29udGFjdCBlbWFpbCcsIGhpZGRlbjpmYWxzZX1dLFxuICAgICAgICAndGl0bGUnOiAnVGVhbXMnLFxuICAgICAgICAncm93Q2FsbGJhY2tUZXh0JzonQWRkIFJ1bicsXG4gICAgICAgICdzaG93Q2FsbGJhY2snOiB0cnVlXG4gICAgfSk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbWlsZXNCb2FyZCcpXG4gICAgICAgIC5jb21wb25lbnQoJ3VzZXJzJywge1xuICAgICAgICAgICAgdGVtcGxhdGVVcmw6ICcnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ1VzZXJzQ29udHJvbGxlcicsXG4gICAgICAgICAgICBjb250cm9sbGVyQXM6ICd2bScsXG4gICAgICAgICAgICBiaW5kaW5nczoge1xuICAgICAgICAgICAgICAgIHVzZXI6JzwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdtaWxlc0JvYXJkJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ1VzZXJzQ29udHJvbGxlcicsIFVzZXJzQ29udHJvbGxlcik7XG5cbiAgICBVc2Vyc0NvbnRyb2xsZXIuJGluamVjdCA9IFsnJGxvY2FsU3RvcmFnZScsJyRzY29wZScsICckdWliTW9kYWwnLCAnUnVuc0FwaScsICdSdW5zRGlzcGxheUNvbmZpZycsICdUZWFtc0Rpc3BsYXlDb25maWcnLCAndXNlcicsICdVc2Vyc0Rpc3BsYXlDb25maWcnXTtcblxuICAgIGZ1bmN0aW9uIFVzZXJzQ29udHJvbGxlcigkbG9jYWxTdG9yYWdlLCAkc2NvcGUsICR1aWJNb2RhbCwgUnVuc0FwaSwgUnVuc0Rpc3BsYXlDb25maWcsIFRlYW1zRGlzcGxheUNvbmZpZywgdXNlciwgVXNlcnNEaXNwbGF5Q29uZmlnKSB7XG4gICAgICAgICAgICBsZXQgdm0gPSB0aGlzO1xuICAgICAgICAgICAgdm0udXNlciA9IHVzZXIudXNlcjtcblxuICAgICAgICAgICAgdm0udGFicyA9IFtcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiAnVGVhbXMnfSxcbiAgICAgICAgICAgICAgICB7IHRpdGxlOiAnUnVucycgfVxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgdm0uJG9uSW5pdCA9IG9uSW5pdDtcbiAgICAgICAgICAgIHZtLnNldFRhYiA9IHNldFRhYjtcblxuICAgICAgICAgICAgZnVuY3Rpb24gb25Jbml0KCkge1xuICAgICAgICAgICAgICAgIHZtLnRhYiA9IDA7XG4gICAgICAgICAgICAgICAgdm0uc2hvd0NyZWF0ZVRlYW1CdXR0b24gPSBnZXRTaG93Q3JlYXRlVGVhbUJ1dHRvbigpO1xuICAgICAgICAgICAgICAgIHZtLmRpc3BsYXlPYmpEYXRhID0gYnVpbGREaXNwbGF5T2JqZWN0KHZtLnVzZXIudGVhbXMsIFRlYW1zRGlzcGxheUNvbmZpZylcbiAgICAgICAgICAgICAgICB2bS5kaXNwbGF5Q29uZmlnID0gVGVhbXNEaXNwbGF5Q29uZmlnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzZXRUYWIoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICB2bS50YWIgPSBpbmRleDtcbiAgICAgICAgICAgICAgICB2bS5zaG93Q3JlYXRlVGVhbUJ1dHRvbiA9IGdldFNob3dDcmVhdGVUZWFtQnV0dG9uKCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmRpc3BsYXlPYmpEYXRhID0gYnVpbGREaXNwbGF5T2JqZWN0KHZtLnVzZXIudGVhbXMsIFRlYW1zRGlzcGxheUNvbmZpZylcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmRpc3BsYXlDb25maWcgPSBUZWFtc0Rpc3BsYXlDb25maWc7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5kaXNwbGF5Q29uZmlnLnNob3dDYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0ucm93Q2FsbGJhY2sgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmRpc3BsYXlPYmpEYXRhID0gYnVpbGREaXNwbGF5T2JqZWN0KHZtLnVzZXIucnVucywgUnVuc0Rpc3BsYXlDb25maWcpXG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5kaXNwbGF5Q29uZmlnID0gUnVuc0Rpc3BsYXlDb25maWc7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5kaXNwbGF5Q29uZmlnLnNob3dDYWxsYmFjayA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5yb3dDYWxsYmFjayA9IHNob3dFZGl0UnVuTW9kYWw7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmRpc3BsYXlPYmpEYXRhID0gYnVpbGREaXNwbGF5T2JqZWN0KHZtLnVzZXIudGVhbXMsIFRlYW1zRGlzcGxheUNvbmZpZylcbiAgICAgICAgICAgICAgICAgICAgICAgIHZtLmRpc3BsYXlDb25maWcgPSBUZWFtc0Rpc3BsYXlDb25maWc7XG4gICAgICAgICAgICAgICAgICAgICAgICB2bS5kaXNwbGF5Q29uZmlnLnNob3dDYWxsYmFjayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdm0ucm93Q2FsbGJhY2sgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRTaG93Q3JlYXRlVGVhbUJ1dHRvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdm0udGFiID09PSAwICYmIHZtLnVzZXIuaWQgPT09ICRsb2NhbFN0b3JhZ2UudXNlci5pZCAmJiAkbG9jYWxTdG9yYWdlLnVzZXIudHlwZSA9PT0gJ1RlYW1Pd25lcidcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gYnVpbGREaXNwbGF5T2JqZWN0KG9iaiwgY29uZmlnKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRpc3BsYXlPYmogPSB7fTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IG9iai5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5oZWFkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRpc3BsYXlPYmouaGFzT3duUHJvcGVydHkoaikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5T2JqW2pdID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRpc3BsYXlPYmpbal0uaGFzT3duUHJvcGVydHkoY29uZmlnLmhlYWRlcnNbaV0udGV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5T2JqW2pdW2NvbmZpZy5oZWFkZXJzW2ldLnRleHRdID0geyB0ZXh0OiAnJywgaGlkZGVuOiBmYWxzZSB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5T2JqW2pdW2NvbmZpZy5oZWFkZXJzW2ldLnRleHRdLnRleHQgPSBvYmpbal1bKGNvbmZpZy5oZWFkZXJzW2ldLnRleHQudG9Mb3dlckNhc2UoKSkucmVwbGFjZSgvXFxzL2csICdfJyldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChjb25maWcuaGVhZGVyc1tpXS50ZXh0LnRvTG93ZXJDYXNlKCkpLnJlcGxhY2UoL1xccy9nLCAnXycpID09PSAncnVuX2RhdGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGUgPSBtb21lbnQoZGlzcGxheU9ialtqXVtjb25maWcuaGVhZGVyc1tpXS50ZXh0XS50ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5T2JqW2pdW2NvbmZpZy5oZWFkZXJzW2ldLnRleHRdLnRleHQgPSBkYXRlLmlzVmFsaWQoKSA/IGRhdGUuZm9ybWF0KCdNTU1NIEQsIFlZWVknKSA6ICctLSc7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKChjb25maWcuaGVhZGVyc1tpXS50ZXh0LnRvTG93ZXJDYXNlKCkpLnJlcGxhY2UoL1xccy9nLCAnXycpID09PSAndGVhbScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5T2JqW2pdW2NvbmZpZy5oZWFkZXJzW2ldLnRleHRdLnRleHQgPSBvYmpbal1bKGNvbmZpZy5oZWFkZXJzW2ldLnRleHQudG9Mb3dlckNhc2UoKSkucmVwbGFjZSgvXFxzL2csICdfJyldLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5T2JqW2pdW2NvbmZpZy5oZWFkZXJzW2ldLnRleHRdLnRlYW1faWQgPSBvYmpbal0udGVhbV9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5T2JqW2pdW2NvbmZpZy5oZWFkZXJzW2ldLnRleHRdLnVpU3JlZiA9IGNvbmZpZy5oZWFkZXJzW2ldLnVpU3JlZiArICcoeycgKyAndGVhbV9pZDonICsgb2JqW2pdLnRlYW1faWQgKyAnfSknO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU9ialtqXVtjb25maWcuaGVhZGVyc1tpXS50ZXh0XS5oaWRkZW4gPSBjb25maWcuaGVhZGVyc1tpXS5oaWRkZW47XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuaGVhZGVyc1tpXS51aVNyZWYgJiYgIWRpc3BsYXlPYmpbal1bY29uZmlnLmhlYWRlcnNbaV0udGV4dF0udWlTcmVmKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheU9ialtqXVtjb25maWcuaGVhZGVyc1tpXS50ZXh0XS51aVNyZWYgPSBjb25maWcuaGVhZGVyc1tpXS51aVNyZWYgKyAnKHsnICsgY29uZmlnLmhlYWRlcnNbaV0udWlTcmVmICsgJ19pZDonICsgb2JqW2pdLmlkICsgJ30pJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBkaXNwbGF5T2JqO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzaG93RWRpdFJ1bk1vZGFsKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZWRpdGluZ19ydW4gPSBkYXRhO1xuICAgICAgICAgICAgICAgIC8vIHZhciBwYXJlbnRFbGVtID0gcGFyZW50U2VsZWN0b3IgP1xuICAgICAgICAgICAgICAgIC8vICAgICBhbmd1bGFyLmVsZW1lbnQoJGRvY3VtZW50WzBdLnF1ZXJ5U2VsZWN0b3IoJy5wYWdlLWNvbnRhaW5lciAnICsgcGFyZW50U2VsZWN0b3IpKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB2YXIgbW9kYWxJbnN0YW5jZSA9ICR1aWJNb2RhbC5vcGVuKHtcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBhcmlhTGFiZWxsZWRCeTogJ21vZGFsLXRpdGxlJyxcbiAgICAgICAgICAgICAgICAgICAgYXJpYURlc2NyaWJlZEJ5OiAnbW9kYWwtYm9keScsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnY29tcG9uZW50cy9tb2RhbHMvRWRpdFJ1bk1vZGFsL19lZGl0UnVuTW9kYWwuaHRtbCcsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdFZGl0UnVuTW9kYWxDb250cm9sbGVyJyxcbiAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlckFzOiAndm0nLFxuICAgICAgICAgICAgICAgICAgICBzaXplOiAnbWQnLFxuICAgICAgICAgICAgICAgICAgICAvL2FwcGVuZFRvOiBwYXJlbnRFbGVtLFxuICAgICAgICAgICAgICAgICAgICBzY29wZTogJHNjb3BlXG4gICAgICAgICAgICAgICAgICAgIC8vIHJlc29sdmU6IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGl0ZW1zOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgcmV0dXJuIHZtLml0ZW1zO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBtb2RhbEluc3RhbmNlLnJlc3VsdC50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHVwZGF0ZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBydW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBydW5fZGF0ZTogcmVzdWx0LmRhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdGFuY2U6IHJlc3VsdC5kaXN0YW5jZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VyX2lkOiB2bS51c2VyLmlkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlYW1faWQ6IHJlc3VsdC50ZWFtX2lkXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBSdW5zQXBpLm9uZSgncnVucycsIHJlc3VsdC5pZCkuY3VzdG9tUFVUKHVwZGF0ZXMsIHJlc3VsdC5pZCkudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB2bS51c2VyLnJ1bnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihyZXN1bHQuaWQgPT09IHZtLnVzZXIucnVuc1tpXS5pZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2bS51c2VyLnJ1bnNbaV0ucnVuX2RhdGUgPSByZXN1bHQucnVuX2RhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZtLnVzZXIucnVuc1tpXS5kaXN0YW5jZSA9IHJlc3VsdC5kaXN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdm0uZGlzcGxheU9iakRhdGEgPSBidWlsZERpc3BsYXlPYmplY3Qodm0udXNlci5ydW5zLCBSdW5zRGlzcGxheUNvbmZpZylcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9LCBmdW5jdGlvbiAoKSB7IH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAubW9kdWxlKCdtaWxlc0JvYXJkJylcbiAgICAudmFsdWUoJ1VzZXJzRGlzcGxheUNvbmZpZycsIHtcbiAgICAgICAgJ29iamNvZGUnOiAnVVNFUicsXG4gICAgICAgICdwYXJhbU5hbWUnOiAndXNlcklkJyxcbiAgICAgICAgJ2hlYWRlcnMnOiBbe3RleHQ6ICdpZCcsIGhpZGRlbjogdHJ1ZX0sXG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0OiAnTmFtZScsIGhpZGRlbjogZmFsc2UsIHVpU3JlZjondXNlcid9LCBcbiAgICAgICAgICAgICAgICAgICAge3RleHQ6ICdUZWFtIERpc3RhbmNlJywgaGlkZGVuOiBmYWxzZX0sIFxuICAgICAgICAgICAgICAgICAgICB7dGV4dDogJ1RlYW0gUnVuIENvdW50JywgaGlkZGVuOiBmYWxzZX1dLFxuICAgICAgICAnc2hvd0NhbGxiYWNrJzp0cnVlLFxuICAgICAgICAncm93Q2FsbGJhY2tUZXh0JzogJ0FkZCBSdW4nXG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgYW5ndWxhclxuICAgICAgICAubW9kdWxlKCdtaWxlc0JvYXJkJylcbiAgICAgICAgLmNvbnRyb2xsZXIoJ0FkZFJ1blRvVXNlckNvbnRyb2xsZXInLCBBZGRSdW5Ub1VzZXJDb250cm9sbGVyKTtcblxuICAgIEFkZFJ1blRvVXNlckNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyR1aWJNb2RhbEluc3RhbmNlJ107XG5cbiAgICBmdW5jdGlvbiBBZGRSdW5Ub1VzZXJDb250cm9sbGVyKCRzY29wZSwgJHVpYk1vZGFsSW5zdGFuY2UpIHtcbiAgICAgICAgbGV0IHZtID0gdGhpcztcbiAgICAgICAgdm0ucnVuID0ge1xuICAgICAgICAgICAgdXNlcl9pZDogJycsXG4gICAgICAgICAgICBkaXN0YW5jZTogMCxcbiAgICAgICAgICAgIHJ1bl9kYXRlOiAnJyxcbiAgICAgICAgfTtcblxuICAgICAgICB2bS5zYXZlID0gc2F2ZTtcbiAgICAgICAgdm0uY2FuY2VsID0gY2FuY2VsO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNhdmUodXNlcl9pZCkge1xuICAgICAgICAgICAgdm0ucnVuLnVzZXJfaWQgPSB1c2VyX2lkO1xuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2Uodm0ucnVuKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICAgICAgICAgICR1aWJNb2RhbEluc3RhbmNlLmRpc21pc3MoJ2NhbmNlbCcpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbn0pKCk7IiwiIiwiKGZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0JztcblxuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbWlsZXNCb2FyZCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdFZGl0UnVuTW9kYWxDb250cm9sbGVyJywgRWRpdFJ1bk1vZGFsQ29udHJvbGxlcik7XG5cbiAgICBFZGl0UnVuTW9kYWxDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckdWliTW9kYWxJbnN0YW5jZSddO1xuXG4gICAgZnVuY3Rpb24gRWRpdFJ1bk1vZGFsQ29udHJvbGxlcigkc2NvcGUsICR1aWJNb2RhbEluc3RhbmNlKSB7XG4gICAgICAgIGxldCB2bSA9IHRoaXM7XG5cbiAgICAgICAgdm0uJG9uSW5pdCA9IG9uSW5pdDtcbiAgICAgICAgdm0uc2F2ZSA9IHNhdmU7XG4gICAgICAgIHZtLmNhbmNlbCA9IGNhbmNlbDtcblxuICAgICAgICBmdW5jdGlvbiBzYXZlKCkge1xuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuY2xvc2Uoe2lkOnBhcnNlSW50KCRzY29wZS5lZGl0aW5nX3J1bi5pZC50ZXh0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZWFtX2lkOiBwYXJzZUludCgkc2NvcGUuZWRpdGluZ19ydW4uVGVhbS50ZWFtX2lkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXN0YW5jZTogdm0uZGlzdGFuY2UsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcnVuX2RhdGU6IHZtLnJ1bl9kYXRlfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5kaXNtaXNzKCdjYW5jZWwnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZnVuY3Rpb24gb25Jbml0KCkge1xuICAgICAgICAgICAgdm0uZGlzdGFuY2UgPSBwYXJzZUludCgkc2NvcGUuZWRpdGluZ19ydW4uRGlzdGFuY2UudGV4dCk7XG4gICAgICAgICAgICB2bS5ydW5fZGF0ZSA9ICRzY29wZS5lZGl0aW5nX3J1blsnUnVuIERhdGUnXS50ZXh0ID09PSAnLS0nID8gbW9tZW50KCkgOiBtb21lbnQoJHNjb3BlLmVkaXRpbmdfcnVuWydSdW4gRGF0ZSddLnRleHQpO1xuXG4gICAgICAgICAgICB2bS50b2RheSA9IG1vbWVudCgpO1xuICAgICAgICAgICAgdm0uZGF0ZU9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgbWF4RGF0ZTogbmV3IERhdGUoKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIGFuZ3VsYXJcbiAgICAgICAgLm1vZHVsZSgnbWlsZXNCb2FyZCcpXG4gICAgICAgIC5jb250cm9sbGVyKCdOZXdNZW1iZXJNb2RhbENvbnRyb2xsZXInLCBOZXdNZW1iZXJNb2RhbENvbnRyb2xsZXIpO1xuXG4gICAgTmV3TWVtYmVyTW9kYWxDb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsJyR1aWJNb2RhbEluc3RhbmNlJ107XG5cbiAgICBmdW5jdGlvbiBOZXdNZW1iZXJNb2RhbENvbnRyb2xsZXIoJHNjb3BlLCAkdWliTW9kYWxJbnN0YW5jZSkge1xuICAgICAgICBsZXQgdm0gPSB0aGlzO1xuICAgICAgICB2bS5uZXdNZW1iZXIgPSB7XG4gICAgICAgICAgICBmaXJzdF9uYW1lOicnLFxuICAgICAgICAgICAgbGFzdF9uYW1lOicnLFxuICAgICAgICAgICAgZW1haWw6JydcbiAgICAgICAgfTtcblxuICAgICAgICB2bS5zYXZlID0gc2F2ZTtcbiAgICAgICAgdm0uY2FuY2VsID0gY2FuY2VsO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNhdmUoKSB7XG4gICAgICAgICAgICAkdWliTW9kYWxJbnN0YW5jZS5jbG9zZSh2bS5uZXdNZW1iZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgICAgICAgICAgJHVpYk1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgICAgIH1cblxuICAgIH1cblxufSkoKTsiXX0=
