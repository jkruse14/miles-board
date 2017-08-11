/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var path = '/components/main/_main.html';
var html = "<div id='index-container'>\n    <flash-message id='index_flash' name='index_flash'></flash-message>\n    <div id=\"nav-container\" ng-hide=\"$ctrl.hideNav\" >\n        <miles-header></miles-header>\n    </div>\n    <div class=\"page-container\">\n        <ui-view></ui-view>\n    </div>\n</div>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

var path = '/components/teams/_teams.html';
var html = "<div id=\"all_teams\">\n    <div id=\"team_header\" class=\"board-title\">\n        <span>All Teams</span>\n    </div>\n    <board display-obj-data=\"vm.displayObjData\" display-obj-config=\"vm.displayConfig\" \n            row-callback=\"vm.joinTeam\" \n            show-callback-conditions=\"vm.showJoinTeamButton\"\n            is-owner=\"vm.isTeamOwner\"></board>\n</div>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var path = '/components/modals/newMemberModal/_newMemberForm.html';
var html = "<form id=\"newMemberForm\" name=\"newMemberForm\" novalidate>\n    <div class=\"form-group\">\n        <label for=\"first_name\">First Name *</label>\n        <input type=\"text\" id=\"first_name\" name=\"first_name\" class=\"form-control\" ng-class=\"{'field-invalid': !newMemberForm.first_name.$pristine && newMemberForm.first_name.$invalid}\"\n            ng-model=\"vm.newMember.first_name\" ng-change='vm.handleFieldUpate()' placeholder=\"{{vm.user && vm.user.first_name? vm.user.first_name : 'Enter first name'}}\" required>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"last_name\" >Last Name *</label>\n        <input type=\"text\" class=\"form-control\" id=\"last_name\" ng-model=\"vm.newMember.last_name\" ng-change='vm.handleFieldUpate()' placeholder=\"{{vm.user && vm.user.last_name ? vm.user.last_name : 'Enter last name'}}\" required>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"email\">Email address</label>\n        <input type=\"email\" class=\"form-control\" id=\"email\" aria-describedby=\"emailHelp\" ng-model=\"vm.newMember.email\" placeholder=\"Enter email\"\n            required>\n        <small id=\"emailHelp\" class=\"form-text text-muted\"><em>Optional</em>Your email will only be shared with the team owner for team related information</small>\n    </div>\n    <div class=\"form-group\" ng-if=\"vm.showPasswordFields\">\n        <label for=\"password\">Password</label>\n        <div class=\"form-group input-and-message\">\n            <input type=\"password\" class=\"form-control\" id=\"password\" name=\"password\" aria-describedby=\"passwordHelp\" ng-focus=\"vm.setFocusedField('newMemberForm', 'password')\"\n                ng-blur=\"vm.resetFocusedField()\" ng-class=\"[{'field-invalid': newMemberForm.password.$invalid\n                                                                && (!newMemberForm.password.$pristine || newMemberForm.password.$touched)\n                                                                && vm.focused_field['newMemberForm']['password'] === false}]\"\n                ng-model=\"vm.newMember.password\" placeholder=\"Enter Password\" required>\n            <small id=\"passwordError\" class=\"form-text text-error\" ng-show=\"newMemberForm.password.$invalid && \n                                            (!newMemberForm.password.$pristine || newMemberForm.password.$touched) && \n                                            vm.focused_field['newMemberForm']['password'] === false\">\n                                    Invalid Password\n                            </small>\n        </div>\n        <small id=\"passwordHelp\" class=\"form-text text-muted\">Minimum of 6 characters</small>\n    </div>\n    <div class=\"form-group\" ng-if=\"vm.showPasswordFields\">\n        <label for=\"password_confirmation\">Password Confirmation</label>\n        <div class=\"form-group input-and-message\">\n            <input type=\"password\" class=\"form-control\" id=\"password_confirmation\" name=\"password_confirmation\" ng-focus=\"vm.setFocusedField('newMemberForm', 'password_confirmation')\"\n                ng-blur=\"vm.resetFocusedField()\" ng-class=\"[{'field-invalid': newMemberForm.password_confirmation.$invalid\n                                                              && (!newMemberForm.password_confirmation.$pristine || newMemberForm.password_confirmation.$touched)\n                                                              && vm.focused_field['newMemberForm']['password_confirmation'] === false}]\"\n                ng-model=\"vm.newMember.password_confirmation\" placeholder=\"Confirm Password\" required>\n            <small id=\"pwConfError\" class=\"form-text text-error\" ng-show=\"(newMemberForm.password_confirmation.$invalid || vm.newMember.password !== vm.newMember.password_confirmation)\n                                    && (!newMemberForm.password_confirmation.$pristine || newMemberForm.password_confirmation.$touched) && \n                                            vm.focused_field['newMemberForm']['password_confirmation'] === false\">\n                                    Invalid Password Confirmation or Password and Confirmation do not Match\n                            </small>\n        </div>\n        <!--<small id=\"passwordConfHelp\" class=\"form-text text-muted\">{{vm.passwordConfMessage}}</small>-->\n    </div>\n    <div class=\"form-group\">\n        <input id=\"add_email\" type=\"checkbox\" ng-model=\"vm.showEmailAndPasswordFields\" ng-change=\"vm.showPasswordFieldsChange()/>\n        <label for=\"add_email\">Add a password to login from anywhere <em>(optional)</em></label>\n    </div>\n        <div ng-if=\"vm.updating === false\" id=\"waiver-container\">\n            <div id=\"waiver\">\n                <p ng-include ng-show=\"vm.showWaiver\" src=\"vm.waiverUrl\"></p>\n                <a ng-model=\"vm.showWaiver\" ng-click=\"vm.showWaiver = !vm.showWaiver\">{{vm.showWaiver === true ? 'Hide Waiver' : 'View Waiver'}}</a>\n            </div>\n            <div class=\"form-group\">\n                <input id=\"waiver_check\" type=\"checkbox\" ng-model=\"vm.waiverAgree\" ng-change='vm.handleFieldUpate()' required/>\n                <label for=\"waiver_check\">I have read and agree to the above waiver</label>\n            </div>\n    </div>\n</form>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(5);

__webpack_require__(6);

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(13);

__webpack_require__(16);

__webpack_require__(19);

__webpack_require__(33);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard', ['environment', 'restangular', 'ui.router', 'templates', 'ngAnimate', 'ui.bootstrap', 'ng-token-auth', 'ngStorage', 'ngFlash']).config(EnvironmentConfig).config(authConfig)
    //.config(ApiConfig)
    .run();

    authConfig.$inject = ['$authProvider', 'envServiceProvider'];

    /** @ngInject */
    function authConfig($authProvider, envServiceProvider) {
        var url = envServiceProvider.is('development') ? 'http://localhost:8000' : 'https://miles-board.herokuapp.com';

        $authProvider.configure([{
            'default': {
                apiUrl: url,
                emailRegistrationPath: '/users',
                confirmationSuccessUrl: window.location.href,
                validateOnPageLoad: false,
                passwordResetSuccessUrl: url + '/#!/login'
            } }, { 'user': {
                apiUrl: url,
                emailRegistrationPath: '/users',
                confirmationSuccessUrl: window.location.href,
                validateOnPageLoad: false,
                passwordResetSuccessUrl: url + '/#!/login'
            } }, { 'team_owner': {
                apiUrl: url,
                emailRegistrationPath: '/team_owners',
                confirmationSuccessUrl: window.location.href,
                validateOnPageLoad: false,
                passwordResetSuccessUrl: url + '/#!/login'
            }
        }]);
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
                }
            }
        });

        envServiceProvider.check();
    }

    ApiConfig.$inject = ['RestangularProvider'];

    function ApiConfig(RestangularProvider) {
        RestangularProvider.setDefaultHttpFields({ cache: true });

        RestangularProvider.addRequestInterceptor(function (elem, operation, what, url) {
            if (operation === "remove") {
                // url = url + '/' + elem.id;
            }
            return elem;
        });
    }
})();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(0);

var _main2 = _interopRequireDefault(_main);

var _home = __webpack_require__(7);

var _home2 = _interopRequireDefault(_home);

var _teams = __webpack_require__(1);

var _teams2 = _interopRequireDefault(_teams);

var _team = __webpack_require__(8);

var _team2 = _interopRequireDefault(_team);

var _users = __webpack_require__(9);

var _users2 = _interopRequireDefault(_users);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    'use strict';

    angular.module('milesBoard').config(RouterConfig);

    RouterConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    /** @ngInject */
    function RouterConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/', '/home');
        var alphaState = {
            name: 'index',
            abstract: true,
            url: '/',
            templateUrl: _main2.default,
            controller: 'AlphaController as vm'
        };

        var homeState = {
            name: 'home',
            url: '/home',
            templateUrl: _home2.default,
            controller: 'MainController'
        };

        var loginState = {
            name: 'login',
            url: '/login?reset_token',
            template: 'components/login/_login.html',
            controller: 'LoginController as vm'
        };

        var teamsState = {
            name: 'teams',
            url: '/teams',
            templateUrl: _teams2.default,
            controller: 'TeamsController as vm',
            resolve: {
                team: [function () {
                    return [];
                }],
                teams: ['TeamsApi', '$stateParams', function (TeamsApi, $stateParams) {
                    return TeamsApi.get('');
                }]
            }
        };

        var teamState = {
            name: 'team',
            url: '/teams/{team_id}',
            templateUrl: _team2.default,
            controller: 'TeamsController as vm',
            resolve: {
                team: ['TeamsApi', '$stateParams', function (TeamsApi, $stateParams) {
                    return TeamsApi.get($stateParams.team_id);
                }],
                teams: ['TeamsApi', '$stateParams', function (TeamsApi, $stateParams) {
                    return TeamsApi.get('');
                }]
            }
        };

        var userState = {
            name: 'user',
            url: '/users/{userId}?reset',
            templateUrl: _users2.default,
            controller: 'UsersController as vm',
            resolve: {
                user: ['UsersApi', '$stateParams', function (UsersApi, $stateParams) {
                    return UsersApi.get($stateParams.userId);
                }],
                owner: ['TeamOwnersApi', '$stateParams', function (TeamOwnersApi, $stateParams) {
                    return TeamOwnersApi.get($stateParams.userId);
                }],
                auth: ['$auth', function ($auth) {
                    return $auth.validateUser();
                }]
            }
        };

        $stateProvider.state(alphaState);
        $stateProvider.state(homeState);
        $stateProvider.state(loginState);
        $stateProvider.state(teamsState);
        $stateProvider.state(teamState);
        $stateProvider.state(userState);
    }
})();

/***/ }),
/* 7 */
/***/ (function(module, exports) {

var path = '/components/home/_home.html';
var html = "<div>\n    <flash-message name=\"home_flash\"></flash-message>\n    Future:\n    <ul>\n        <li>Show Teams and their events</li>\n        <li>Show local races and running events</li>\n        <li>Show popular local running routes</li>\n        <li>Community/Team stories blog</li>\n    </ul>\n</div>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var path = '/components/teams/_team.html';
var html = "<div id=\"team\">\n    <flash-message name=\"team_flash\"></flash-message>\n    <div id=\"team_header\" class=\"board-title\">\n        <span ng-show=\"vm.logoSrc === null\">{{vm.team.name}}</span>\n        <div id='logo_img_container'>\n            <img id='logo_img'  no-image-src='vm.setLogo()' ng-src=\"{{vm.logoSrc}}\" ng-hide=\"!vm.logoSrc\"/>\n        </div>\n        <div class='board-header-btn-container'>\n            <div class=\"btn-group\">\n                <button type=\"button\" class=\"btn btn-primary addMemberBtn\" ng-click=\"vm.showAddTeamMemberModal()\" ng-show='vm.isTeamOwner'>\n                    Add Team Member\n                </button>\n                <button type=\"button\" class=\"btn btn-primary addMemberBtn\" ng-click=\"vm.showAddTeamOwnerModal()\" ng-show='vm.isTeamOwner'>\n                    Add Team Owner\n                </button> \n            </div>\n        </div>\n    </div>\n    <uib-tabset>\n        <uib-tab index=\"0\" heading=\"All\" ng-click=\"vm.showFilteredTable(0)\" ng-show=\"vm.team.custom_tabs.length > 0\"></uib-tab>\n        <uib-tab index=\"$index+1\" ng-repeat=\"tab in vm.team.custom_tabs\" heading=\"{{tab.heading}}\" ng-click=\"vm.showFilteredTable($index+1)\"></uib-tab>\n        <uib-tab index=\"vm.team.custom_tabs.length+2\" heading=\"Add Tab\" ng-click=\"vm.showCustomTabsModal('add')\" ng-if=\"vm.isTeamOwner\" class=\"action-tab\"></uib-tab>\n        <uib-tab index=\"vm.team.custom_tabs.length+3\" heading=\"Edit Tabs\" ng-click=\"vm.showCustomTabsModal('edit')\" ng-if=\"vm.isTeamOwner\" ng-show=\"vm.team.custom_tabs.length > 0\" class=\"action-tab\"></uib-tab>\n    </uib-tabset>\n    <board display-obj-data=\"vm.displayObjData\" display-obj-config=\"vm.displayConfig\" \n           row-callback=\"[vm.showAddRunToUser, vm.showUserProfileModal]\" is-owner=\"vm.isTeamOwner\"\n           show-callback-conditions=\"vm.showAddRunButton\"></board>\n</div>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var path = '/components/users/_users.html';
var html = "<div id=\"userProfile\" class=\"row\">\n    <flash-message name=\"profile_flash\"></flash-message>\n    <div class=\"board-title\" class=\"col-sm-12\">\n        <span>{{vm.user.first_name + ' ' + vm.user.last_name}}</span>\n    </div>\n    <section id=\"user-info\" class=\"col-sm-3\">\n        <div id='profile_image'>\n            <img ng-src=\"{{vm.profileImageSrc}}\" />\n        </div>\n        <span id=\"createTeamButton\" class=\"btn btn-primary profileActionButton\" ng-click=\"vm.showCreateTeamModal()\" ng-show=\"vm.showCreateTeamButton\">\n            Create Team\n        </span>\n        <span id=\"updateProfileButton\" class=\"btn btn-primary profileActionButton\" ng-click=\"vm.showUpdateProfileModal()\" >\n            Update Profile\n        </span>\n        <uib-tabset>\n            <uib-tab ng-repeat=\"tab in vm.tabs\" ng-click=\"vm.setTab($index)\" heading=\"{{tab.title}}\" ng-hide='tab.hidden'></uib-tab>\n            <board class=\"small\" display-obj-data=\"vm.teams_board_display.displayObjData\" \n                                display-obj-config=\"vm.teams_board_display.displayConfig\" row-callback=\"vm.rowCallback\">\n        </uib-tab>\n    </section>\n    <section id='user-runs-board' class=\"col-sm-9\">\n        <board display-obj-data=\"vm.runs_board_display.displayObjData\" \n               display-obj-config=\"vm.runs_board_display.displayConfig\" \n               row-callback=\"[vm.showEditRunModal, vm.showDeleteRunConfirmation]\"\n             show-callback-conditions=\"true\">\n    </section>\n</div>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').run(runBlock);

    runBlock.$inject = ['$log', '$auth', '$rootScope', '$localStorage', '$location', '$state', '$cacheFactory', '$window'];

    function runBlock($log, $auth, $rootScope, $localStorage, $location, $state, $cacheFactory, $window) {
        $rootScope.$on('$stateChangeError', console.log.bind(console));

        $rootScope.$on('auth:password-reset-confirm-success', function () {
            $state.go('login?reset_token');
        });

        $rootScope.$on('auth:login-success', function (ev, user) {
            $state.go('home');
        });

        $rootScope.$on('auth:invalid', function (ev, reason) {
            $localStorage.$reset();
            $state.go('home', {}, { reload: true });
            console.error('Invalid token', ev);
        });

        $rootScope.$on('auth:session-expired', function (ev, reason) {
            console.error('session-expired', ev, reason[0]);
        });

        $rootScope.$on('auth:validation-success', function (ev, user) {
            if ($location.path() == '') {
                getNextPath();
            }
        });

        $rootScope.$on('auth:login-error', function (ev, reason) {
            console.error('login error:' + reason[0]);
        });

        $rootScope.$on('auth:validation-error', function (ev, reason) {
            var nextPath = '/login';
            $location.path(nextPath);
            console.error('validation-error', ev, reason);
        });

        function getNextPath() {
            var nextPath = '/home';
            if ($localStorage.user) {
                nextPath = '/home';
                $location.path(nextPath);
            } else {
                nextPath = '/login';
                $location.path(nextPath);
            }
        }
    }
})();

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(12);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').constant('ApiConfig', {
        apiUrl: 'http://localhost:8000/'
    });
})();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(14);

__webpack_require__(15);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').directive('noImageSrc', noImage);

    noImage.$inject = ['$parse', 'settingsFactory'];

    function noImage($parse, settingsFactory) {
        function setDefaultImage(el) {
            if (el) {
                el.attr('src', settingsFactory.noImageUrl);
            }
        }

        return {
            restrict: 'A',
            priority: 99,
            link: function link($scope, el, attr) {
                $scope.$watch(function () {
                    return attr.ngSrc;
                }, function () {
                    var src = attr.ngSrc;

                    if (!src) {
                        setDefaultImage(el);
                    }
                });

                el.bind('error', function () {
                    var cb = $parse(attr.noImageSrc);
                    if (el.attr('src') !== settingsFactory.noImageUrl) {
                        el.attr('src', settingsFactory.noImageUrl);
                        if (typeof cb === 'function') {
                            $scope.$apply(function () {
                                cb($scope);
                            });
                        }
                    }
                });
            }
        };
    }
})();

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').directive('elementReady', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            priority: 1,
            link: function link($scope, elem, attrs) {
                elem.ready(function () {
                    $scope.$apply(function () {
                        var cb = $parse(attrs.elementReady);
                        cb($scope);
                    });
                });
            }
        };
    }]);
})();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(17);

__webpack_require__(18);

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').filter('boardFilter', function () {
        return boardFilter;
    });

    boardFilter.$inject = ['items', 'filter'];

    function boardFilter(items, filter) {
        var filtered = [];
        var keys = Object.keys(items);
        for (var i = 0; i < keys.length; i++) {
            var item = items[keys[i]];
            switch (filter.comparator) {
                case 'lt':
                    if (item[filter.filter_field].text < parseInt(filter.filter_value)) {
                        filtered.push(item);
                    }
                    break;
                case 'lte':
                    if (item[filter.filter_field].text <= parseInt(filter.filter_value)) {
                        filtered.push(item);
                    }
                    break;
                case 'gt':
                    if (item[filter.filter_field].text > parseInt(filter.filter_value)) {
                        filtered.push(item);
                    }
                    break;
                case 'gte':
                    if (item[filter.filter_field].text >= parseInt(filter.filter_value)) {
                        filtered.push(item);
                    }
                    break;
                case 'eq':
                    if (item[filter.filter_field].text == parseInt(filter.filter_value)) {
                        filtered.push(item);
                    }
                    break;
            }
        }

        return filtered;
    }
})();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').filter('namesFilter', function () {
        return namesFilter;
    });

    namesFilter.$inject = [];

    function namesFilter(items, inp) {
        var filtered = [];
        if (items) {
            var keys = Object.keys(items);
            for (var i = 0; i < keys.length; i++) {
                var item = items[keys[i]];
                var query = new RegExp(inp, 'i');
                var text_to_test = item['Name'] ? item['Name'].text : item.first_name + ' ' + item.last_name;
                if (inp === undefined || text_to_test && query.test(text_to_test.substring(0))) {
                    filtered.push(item);
                }
            }
        }
        return filtered;
    }
})();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(20);

__webpack_require__(21);

__webpack_require__(22);

__webpack_require__(23);

__webpack_require__(24);

__webpack_require__(25);

__webpack_require__(26);

__webpack_require__(27);

__webpack_require__(28);

__webpack_require__(29);

__webpack_require__(30);

__webpack_require__(31);

__webpack_require__(32);

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').factory('settingsFactory', settings);

    settings.$inject = [];

    function settings() {
        return {
            noImageUrl: ''
        };
    }
})();

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').factory('CustomFiltersApi', CustomFiltersApi);

    CustomFiltersApi.$inject = ['Restangular'];

    function CustomFiltersApi(Restangular) {
        return Restangular.service('custom_filters');
    }
})();

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').factory('InvitationCodesApi', InvitationCodesApi);

    InvitationCodesApi.$inject = ['Restangular'];

    function InvitationCodesApi(Restangular) {
        return Restangular.service('invitation_codes');
    }
})();

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').factory('TeamMemberListsApi', TeamMemberListsApi);

    TeamMemberListsApi.$inject = ['Restangular'];

    function TeamMemberListsApi(Restangular) {
        return Restangular.service('team_member_lists');
    }
})();

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').factory('TeamsApi', TeamsApi);

    TeamsApi.$inject = ['Restangular'];

    function TeamsApi(Restangular) {
        return Restangular.service('teams');
    }
})();

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').factory('CustomTabsApi', CustomTabsApi);

    CustomTabsApi.$inject = ['Restangular'];

    function CustomTabsApi(Restangular) {
        return Restangular.service('custom_tabs');
    }
})();

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').service('MilesBoardApi', MilesBoardApi);

    MilesBoardApi.$inject = ['CustomFiltersApi', 'CustomTabsApi', 'Restangular', 'RunsApi', 'TeamsApi', 'TeamMemberListsApi', 'TeamOwnersApi', 'TeamOwnerListsApi', 'UsersApi'];

    function MilesBoardApi(CustomFiltersApi, CustomTabsApi, Restangular, RunsApi, TeamsApi, TeamMemberListsApi, TeamOwnersApi, TeamOwnerListsApi, UsersApi) {
        var self = this;

        self.CustomFiltersApi = CustomFiltersApi;
        self.CustomTabsApi = CustomTabsApi;
        self.RunsApi = RunsApi;
        self.TeamsApi = TeamsApi;
        self.TeamOwnersApi = TeamOwnersApi;
        self.TeamMemberListsApi = TeamMemberListsApi;
        self.TeamOwnerListsApi = TeamOwnerListsApi;
        self.UsersApi = UsersApi;

        self.errorReader = errorReader;
        self.put = put;
        self.remove = remove;

        function errorReader(errors) {
            var keys = Object.keys(errors);
            var message = '<br />';
            for (var i = 0; i < keys.length; i++) {
                var error = errors[keys[i]];
                message += keys[i] + ': <ul>';
                for (var j = 0; j < error.length; j++) {
                    message += '<li>' + error[i] + '</li>';
                }
                message += '</ul><br />';
            }

            return message;
        }

        function put(obj_type, obj) {
            return Restangular.one(obj_type, obj.id).customPUT(obj);
        }

        function remove(obj_type, obj_id) {
            return Restangular.one(obj_type, obj_id).remove();
        }

        return self;
    }
})();

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').factory('TeamOwnerListsApi', TeamOwnerListsApi);

    TeamOwnerListsApi.$inject = ['Restangular'];

    function TeamOwnerListsApi(Restangular) {
        var self = Restangular.service('team_owner_lists');
        self.updateOwners = updateOwners;

        function updateOwners(list) {
            return Restangular.all('team_owner_lists/update_owners').customPOST(list);
        }
        return self;
    }
})();

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').factory('UsersApi', UsersApi);

    UsersApi.$inject = ['Restangular'];

    function UsersApi(Restangular) {
        return Restangular.service('users');
    }
})();

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').factory('HTTPCache', HTTPCache);

    HTTPCache.$inject = ['Restangular', '$cacheFactory'];

    function HTTPCache(Restangular, $cacheFactory) {
        var service = {};
        var cache;

        // Creates the cache
        service.init = function () {
            cache = $cacheFactory('http');
            Restangular.setDefaultHttpFields({ cache: cache });

            Restangular.setResponseInterceptor(function (response, operation) {
                if (operation === 'put' || operation === 'post' || operation === 'remove') {
                    cache.removeAll();
                }
                return response;
            });
        };

        return service;
    }
})();

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').factory('RunsApi', RunsApi);

    RunsApi.$inject = ['Restangular'];

    function RunsApi(Restangular) {
        return Restangular.service('runs');
    }
})();

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').factory('TeamOwnersApi', TeamOwnersApi);

    TeamOwnersApi.$inject = ['Restangular'];

    function TeamOwnersApi(Restangular) {
        return Restangular.service('team_owners');
    }
})();

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').factory('LoginFactory', LoginFactory);

    LoginFactory.$inject = ['$auth', '$localStorage', '$state', '$window', 'Flash', 'InvitationCodesApi', 'Restangular', 'UsersApi'];

    function LoginFactory($auth, $localStorage, $state, $window, Flash, InvitationCodesApi, Restangular, UsersApi) {
        var self = this;

        self.PW_CONF_MSG = {
            MATCH: { text: 'They match!', className: 'pwMatch' },
            NO_MATCH: { text: 'Your passwords do not match...', className: 'pwNoMatch' }
        };

        self.templateUrls = {
            loginForm: "'components/login/_loginForm.html'",
            registerForm: "'components/login/_registerForm.html'",
            resentConfirmationEmail: "'components/login/_resentConfirmationEmail.html'",
            resetPassword: "'components/login/_resetPassword.html'"
        };

        self.handleLogin = handleLogin;
        self.handleSubmitRegistration = handleSubmitRegistration;
        self.resendEmailConfirmation = resendEmailConfirmation;
        self.resetFocusedField = resetFocusedField;
        self.setFocusedField = setFocusedField;
        self.resetPassword = resetPassword;
        self.updatePassword = updatePassword;

        function handleLogin(user_info, success, fail) {
            Flash.clear();
            $auth.submitLogin(user_info).then(success, fail);
        }

        function handleSubmitRegistration(user_info, isOwner, registrationSuccess, registrationFail) {
            Flash.clear();
            var new_user = {
                first_name: user_info.first_name,
                last_name: user_info.last_name,
                password: user_info.password,
                password_confirmation: user_info.password_confirmation,
                email: user_info.email
            };

            var auth_config = isOwner ? 'team_owner' : 'user';
            if (isOwner) {
                InvitationCodesApi.get(user_info.owner_confirmation_code).then(function (response) {
                    response = response.plain();
                    if (response.email === user_info.email && response.used === false) {
                        user_info.code_id = response.id;
                        $auth.submitRegistration(new_user, { config: auth_config }).then(registrationSuccess, registrationFail);
                    } else {
                        var message = 'There was an error with your code: </br>';
                        if (user_info.email !== response.email) {
                            message += 'email associated with code does not match above';
                        } else if (response.used === true) {
                            message += 'this code was already used';
                        }

                        Flash.create('warning', message, 0, { container: 'index_flash' }, true);
                    }
                });
            } else {
                $auth.submitRegistration(new_user, { config: auth_config }).then(registrationSuccess, registrationFail);
            }
        }

        function resendEmailConfirmation(user_info) {
            Restangular.all('users').customGET('resend_confirmation', { email: user_info.email }).then(registrationSuccess(resp), function (resp) {
                var message = 'Whoops... something went wrong while sending your confirmation email';
                Flash.create('danger', message, 0, { container: 'regform_flash' }, true);
                vm.registered = true;
            });
        }

        function resetUserInfo(email) {
            email !== undefined ? email : '';

            return {
                first_name: '',
                last_name: '',
                password: '',
                password_confirmation: '',
                email: email
            };
        }

        function setFocusedField(form, field, fields) {
            fields[form][field] = true;
            return fields;
        }

        function resetFocusedField() {
            return {
                loginForm: {
                    email: false,
                    password: false
                },
                newMemberForm: {
                    email: false,
                    first_name: false,
                    last_name: false,
                    password: false,
                    password_confirmation: false
                },
                resendEmailForm: {
                    email: false
                },
                resetPasswordForm: {
                    email: false
                },
                updatePasswordForm: {
                    email: false,
                    password: false,
                    password_confirmation: false
                }
            };
        }

        function resetPassword(user) {
            Flash.clear();
            var u = { email: user.email };
            $auth.requestPasswordReset(u).then(function (resp) {
                var message = "Success!<br />An email has been sent to reset your password";
                Flash.create('success', message, 0, { container: 'profile_flash' }, true);
            }).catch(function (resp) {
                // handle error response
                MilesBoardApi.errorReader(error);
            });
        }

        function updatePassword(user_info, loginSuccess, loginFail) {
            Flash.clear();
            var message = 'Updating...';
            Flash.create('info', message, 0, { container: 'reset_form' }, true);
            $auth.updatePassword({
                password: user_info.password,
                password_confirmation: user_info.password_confirmation,
                email: user_info.email,
                reset_password_token: $state.params['reset_token']
            }).then(function (resp) {
                // handle success response
                Flash.clear();
                $auth.submitLogin(user_info).then(loginSuccess, loginFail);
            }).catch(function (resp) {
                // handle error response
                Flash.clear();
                var message = "Whoops... There seems to have been an error updating your password. <br />Please try again or request a new email to be sent";
                Flash.create('danger', message, 0, { container: 'reset_form' }, true);
            });
        }

        return self;
    }
})();

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(34);

__webpack_require__(37);

__webpack_require__(41);

__webpack_require__(45);

__webpack_require__(49);

__webpack_require__(51);

__webpack_require__(54);

__webpack_require__(67);

__webpack_require__(69);

__webpack_require__(80);

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(35);

__webpack_require__(36);

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').run().controller('AlphaController', AlphaController);

    AlphaController.$inject = ['$localStorage', '$state', '$rootScope', 'Flash'];

    function AlphaController($localStorage, $state, $rootScope, Flash) {
        var vm = this;

        $rootScope.$on('auth:logout-success', function () {
            $localStorage.$reset();
            $localStorage.user_nav = 'show-login';
            $state.go($state.current, {}, { reload: true });
        });

        $rootScope.$on('auth.validation-error', function () {
            $localStorage.$reset();
            $localStorage.user_nav = 'show-login';
        });
    }
})();

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _main = __webpack_require__(0);

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    'use strict';

    angular.module('milesBoard').component('main', {
        templateUrl: _main2.default,
        controller: 'AlphaController',
        bindings: {}
    });
})();

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(38);

__webpack_require__(40);

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _board = __webpack_require__(39);

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    'use strict';

    angular.module('milesBoard').component('board', {
        templateUrl: _board2.default,
        controller: 'BoardController',
        controllerAs: 'vm',
        bindings: {
            displayObjData: '<',
            displayObjConfig: '<',
            isOwner: '<',
            rowCallback: '&',
            showCallbackConditions: '&'
        }
    });
})();

/***/ }),
/* 39 */
/***/ (function(module, exports) {

var path = '/components/board/_board.html';
var html = "<div id=\"board-container\">\n    <input id=\"table_filter\" type='text' \n                             placeholder=\"Search By Name...\"\n                             ng-hide=\"vm.displayObjConfig.hideSearch\"\n                             ng-model=\"query\" \n                             ng-model-options=\"{ debounce: 200 }\"\n                             ng-click=\"query = ''\"/>\n    <table id=\"board\" class=\"table table-responsive table-striped\">\n        <tr ng-hide=\"vm.displayObjConfig.hideHeaderRow === true\">\n            <th ng-repeat-start=\"header in vm.displayObjConfig.headers\" ng-click=\"vm.setOrdering(header.text)\" ng-hide=\"header.hidden\">\n                {{::header.text}}<i class=\"fa\" ng-class=\"[{'fa-sort-up':vm.ordering.dir !== vm.DSC && vm.ordering.col === header.text, \n                                                         'fa-sort-down': vm.ordering.dir === vm.DSC && vm.ordering.col === header.text,\n                                                         'fa-sort': vm.ordering.col !== header.text}]\" aria-hidden=\"true\"></i>\n            </th>\n            <th ng-repeat-end ng-if=\"$last && \n                                    vm.displayObjConfig.showCallback\">\n            </th>\n        </tr>\n        <tr ng-repeat=\"row in vm.displayObjData | namesFilter:query | orderBy:vm.getValueForOrdering:vm.ordering.dir === vm.DSC track by row.id.text\"\n            ng-if=\"$index >= vm.maxPageSize * (vm.currentPage - 1) && $index < (vm.maxPageSize * (vm.currentPage - 1)) + vm.maxPageSize\">\n            <td ng-repeat-start=\"item in row\" ng-hide=\"item.hidden\">\n                <a ng-if=\"item.uiSref\" ui-sref=\"{{item.uiSref}}\" ui-sref-acitve=\"active\">{{item.text}}</a>\n                <span ng-if=\"!item.uiSref\">{{item.text}}</span>\n            </td>\n            <td ng-repeat-end ng-if=\"$last\" >\n                <div ng-class=\"[{'btn-group': vm.rowCallback().length > 1}]\">\n                    <button class=\"btn btn-primary btn-success\" ng-repeat=\"cb in vm.rowCallback()\" \n                            ng-click=\"vm.callback(row, $index)\" \n                            ng-show=\"vm.showCallbackConditions()(row) && vm.showActions\">\n                        {{::vm.displayObjConfig.rowCallbackText[$index]}}\n                    </button>\n                </div>\n            </td>\n        </tr>\n    </table>\n    <ul uib-pagination total-items=\"vm.displayObjData.length\"\n                       boundary-link-numbers=\"true\"\n                       max-size=\"vm.maxSize\"\n                       ng-model=\"vm.currentPage\"  \n                       class=\"pagination-sm\" \n                       rotate=\"true\"\n                       ng-show=\"vm.displayObjData.length > vm.maxPageSize\"></ul>\n</div>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').controller('BoardController', BoardController);

    BoardController.$inject = ['$localStorage', '$scope'];

    function BoardController($localStorage, $scope) {
        var vm = this;

        var ASC = 'asc';
        var DSC = 'dsc';

        vm.$onInit = onInit;

        function onInit() {

            vm.maxPageSize = 50;
            vm.maxSize = 10;
            vm.currentPage = 1;

            vm.DSC = DSC;

            vm.ordering = {
                col: 'Name',
                dir: ASC
            };

            vm.showActions = $localStorage.user ? true : false;
            vm.loggedInUserId = $localStorage.user ? $localStorage.user.id : null;
            vm.setOrdering = setOrdering;
            vm.getValueForOrdering = getValueForOrdering;

            if (vm.rowCallback instanceof Array) {
                vm.callbacks = vm.rowCallback;
            } else {
                vm.callbacks = [vm.rowCallback];
            }
            vm.callback = callback;
        }

        function callback(row, index) {
            vm.callbacks[0]()[index](row);
        }

        function setOrdering(col) {
            vm.ordering.col = col;
            switch (vm.ordering.dir) {
                case ASC:
                    vm.ordering.dir = DSC;
                    break;
                case DSC:
                    vm.ordering.dir = ASC;
                    break;
                default:
                    vm.ordering.dir = ASC;
                    break;
            }
        }

        function getValueForOrdering(item) {
            return item[vm.ordering.col];
        }
    }
})();

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(42);

__webpack_require__(43);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').controller('CustomFilterController', CustomFilterController);

    CustomFilterController.$inject = [];

    function CustomFilterController() {
        var vm = this;

        vm.filter_fields = ['Team Distance', 'Team Runs Count'];
        vm.comparators = ['less than', 'less than or equal to', 'greater than', 'greater than or equal to', 'equal to'];
        vm.comparators_display = {
            lt: 'less than',
            lte: 'less than or equal to',
            gt: 'greater than',
            gte: 'greater than or equal to',
            eq: 'equal to'
        };

        vm.$onInit = onInit;
        vm.onFilterFieldChange = onFilterFieldChange;
        vm.onComparatorChange = onComparatorChange;
        vm.onValueChange = onValueChange;

        function onInit() {
            vm.selectedField = vm.initialField || '(select field)';
            vm.selectedComparator = vm.comparators_display[vm.initialComparator] || '(select comparison)';
            vm.filter = {
                filter_field: vm.selectedField,
                filter_value: parseInt(vm.initialValue),
                comparator: vm.selectedComparator
            };
        }

        function onFilterFieldChange(field) {
            vm.selectedField = field;
            vm.fieldChange()(vm.index, vm.filterIndex, field);
        }

        function onComparatorChange(comp) {
            vm.selectedComparator = comp;
            vm.comparatorChange()(vm.index, vm.filterIndex, comp);
        }

        function onValueChange(v) {
            vm.valueChange()(vm.index, vm.filterIndex, v);
        }
    }
})();

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _customFilter = __webpack_require__(44);

var _customFilter2 = _interopRequireDefault(_customFilter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    'use strict';

    angular.module('milesBoard').component('customFilter', {
        templateUrl: _customFilter2.default,
        controller: 'CustomFilterController',
        controllerAs: 'vm',
        bindings: {
            index: '<',
            filterIndex: '<',
            objectType: '<',
            showFilterField: '<',
            fieldChange: '&',
            comparatorChange: '&',
            valueChange: '&',
            initialField: '<',
            initialComparator: '<',
            initialValue: '<'
        }
    });
})();

/***/ }),
/* 44 */
/***/ (function(module, exports) {

var path = '/components/CustomFilters/_customFilter.html';
var html = "<span uib-dropdown is-open=\"status.field_isopen\" ng-show='vm.showFilterField'>\n    <a href id=\"filter-dropdown\" uib-dropdown-toggle>\n        {{vm.selectedField}}<span class=\"caret\"></span>\n    </a>\n    <ul class=\"dropdown-menu\" uib-dropdown-menu aria-labelledby=\"filter-dropdown\">\n        <li ng-repeat=\"field in vm.filter_fields\">\n            <a ng-click=\"vm.onFilterFieldChange(field)\">{{field}}</a>\n        </li>\n    </ul>\n</span>\n<span uib-dropdown is-open=\"status.comparator1_isopen\">\n    <a href id=\"filter-dropdown\" uib-dropdown-toggle>\n        {{vm.comparators_display[vm.selectedComparator] ? vm.comparators_display[vm.selectedComparator] : vm.selectedComparator}}<span class=\"caret\"></span>\n    </a>\n    <ul class=\"dropdown-menu\" uib-dropdown-menu aria-labelledby=\"filter-dropdown\">\n        <li ng-repeat=\"op in vm.comparators\">\n            <a ng-click=\"vm.onComparatorChange(op)\">{{op}}</a>\n        </li>\n    </ul>\n</span>\n<div class=\"cf-input\">\n    <input id=\"filter_value\" type=\"number\" min=\"0\" name=\"filter_value\" class=\"form-control\" \n        ng-class=\"\" \n        ng-model=\"vm.filter.filter_value\" \n        ng-change=\"vm.onValueChange(vm.filter.filter_value)\"\n        ng-model-options=\"{ debounce: 200 }\"\n        placeholder=\"Enter amount to filter by\" required>\n</div>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(46);

__webpack_require__(48);

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _header = __webpack_require__(47);

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    'use strict';

    angular.module('milesBoard').component('milesHeader', {
        templateUrl: _header2.default,
        controller: 'HeaderController',
        controllerAs: 'vm'
    });
})();

/***/ }),
/* 47 */
/***/ (function(module, exports) {

var path = '/components/header/_header.html';
var html = "<div class=\"site-header\">\n    <nav class=\"navbar navbar-default\" role=\"navigation\">\n        <div class=\"navbar-header\" id=\"navbarNav\">\n            \n            <button type=\"button\" class=\"navbar-toggle\" ng-click=\"vm.isNavCollapsed = !vm.isNavCollapsed\">\n\t\t\t\t<span class=\"sr-only\">Toggle navigation</span>\n\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t\t<span class=\"icon-bar\"></span>\n\t\t\t</button>\n            <a class=\"navbar-brand\" href=\"#\">Miles Board</a>\n        </div>\n        <div class=\"collapse navbar-collapse\" uib-collapse=\"vm.isNavCollapsed\">\n            <ul class=\"nav navbar-nav\">\n                <li class=\"nav-item\" ng-repeat=\"elt in vm.site_nav\">\n                    <a class=\"nav-link\" ui-sref=\"{{elt.uiSref}}\"  ui-sref-active=\"active\">\n                        {{elt.display}}\n                        <i class=\"fa\" ng-class=\"[{'{{elt.icon}}': elt.icon !== undefined}]\" ng-if=\"elt.icon\" aria-hidden=\"true\"></i>\n                    </a>\n                    \n                </li>\n            </ul>\n\n            <ul class=\"nav navbar-nav user-nav\">\n                <li class=\"nav-item\" ng-show=\"vm.showLogoutLink && vm.user_id\">\n                    <a class=\"nav-link\" ui-sref=\"user({userId:{{vm.user_id || -1}}})\" ng-click=\"vm.onProfileClick()\"  ui-sref-active=\"active\">\n                        Profile\n                        <i class=\"fa fa-user-circle-o\" aria-hidden=\"true\"></i>\n                    </a>\n                </li>\n                <li class=\"nav-item\">\n                    <a class=\"nav-link\" ng-click=\"vm.showLogoutLink === true ? vm.logout() : vm.showLoginModal()\" ui-sref-active=\"active\">\n                        {{vm.showLogoutLink ? 'Log Out' : 'Login'}}\n                        <i class=\"fa\" ng-class=\"[{'fa-sign-in': vm.user_id == false,\n                                                  'fa-sign-out': vm.user_d != undefined}]\" aria-hidden=\"true\"></i>\n                    </a>\n                </li>\n            </ul>\n        </div>\n    </nav>\n</div>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$auth', '$document', '$localStorage', '$rootScope', '$scope', '$state', '$uibModal', '$window'];

    function HeaderController($auth, $document, $localStorage, $rootScope, $scope, $state, $uibModal, $window) {
        var vm = this;

        vm.site_nav = [{ uiSref: 'home', display: 'Home', icon: 'fa-road' }, { uiSref: 'teams', display: 'Teams', icon: 'fa-group' }];

        vm.$onInit = onInit;
        vm.showLoginModal = showLoginModal;
        vm.logout = logout;
        vm.onProfileClick = onProfileClick;

        $rootScope.$on('auth:login-success', function () {
            $localStorage.user_nav = 'show-logout';
            vm.showLogoutLink = true;
            vm.user_id = $localStorage.user ? $localStorage.user.id : null;
        });

        $rootScope.$on('auth:logout-success', function () {
            vm.showLogoutLink = false;
            vm.user_id = null;
        });

        $rootScope.$on('auth.validation-success', function () {
            vm.user_id = $localStorage.user.id;
        });

        function onInit() {
            vm.showLogoutLink = $localStorage.user ? true : false;

            vm.user_id = $localStorage.user ? $localStorage.user.id : null;
        }

        function onProfileClick() {
            $state.go('user', { 'userId': $localStorage.user.id });
        }

        function showLoginModal(parentSelector) {
            var parentElem = parentSelector ? angular.element($document[0].querySelector('.page-container ' + parentSelector)) : undefined;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modals/LoginModal/_loginModal.html',
                controller: 'LoginModalController',
                controllerAs: 'vm',
                size: 'lg',
                appendTo: parentElem
                // resolve: {
                //     items: function () {
                //         return vm.items;
                //     }
                // }
            });

            modalInstance.result.then(function (result) {});
        };

        function logout() {
            $auth.signOut().then(function (resp) {
                $localStorage.$reset();
                $state.go('home');
                $window.location.reload();
            }, function (resp) {
                $localStorage.$reset();
                $state.go('home', {}, { reload: true });
                $window.location.reload();
                console.error(resp);
            });
        }
    }
})();

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(50);

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').controller('MainController', MainController);

    MainController.$inject = [];

    function MainController() {
        var vm = this;

        vm.$onInit = onInit;

        function onInit() {}
    }
})();

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(52);

__webpack_require__(53);

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'user strict';

    angular.module('milesBoard').component('login', {
        templateUrl: 'components/login/_login.html',
        controller: 'LoginController',
        bindings: {}
    });
})();

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').run().controller('LoginController', LoginController);

    LoginController.$inject = ['$state', '$localStorage', '$window', 'Flash', 'LoginFactory', 'MilesBoardApi'];

    function LoginController($state, $localStorage, $window, Flash, LoginFactory, MilesBoardApi) {
        var vm = this;

        var PW_CONF_MSG = {
            MATCH: { text: 'They match!', className: 'pwMatch' },
            NO_MATCH: { text: 'Your passwords do not match...', className: 'pwNoMatch' }
        };

        var loginFormUrl = "'components/login/_loginForm.html'";
        var registerFormUrl = "'components/login/_registerForm.html'";

        vm.tabs = [{ title: 'Login',
            content: '<ng-include src="' + loginFormUrl + '"></ng-include>' }, { title: 'Register',
            content: '<ng-include src="' + registerFormUrl + '"></ng-include>' }];

        vm.$onInit = onInit;
        vm.setTab = setTab;
        vm.handleSubmitClick = handleSubmitClick;
        vm.resetFocusedField = resetFocusedField;
        vm.setFocusedField = setFocusedField;
        vm.updatePassword = updatePassword;

        function onInit() {
            vm.inModal = false;
            vm.submitting = false;
            vm.registered = false;
            resetUserInfo();

            vm.tab = 0;
            vm.isOwner = false;

            if ($state.params['reset_token']) {
                setTab(4);
                vm.hideAllTabs = true;
                var message = "Please complete the below to reset your password";
                Flash.create('info', message, 0, { container: 'login_flash' }, false);
            }

            vm.focused_field = LoginFactory.resetFocusedField();
        }

        function handleSubmitClick() {
            vm.submitting = true;
            switch (vm.tab) {
                case 0:
                    LoginFactory.handleLogin(vm.user_info, loginSuccess, loginFail);
                    break;
                case 1:
                    LoginFactory.handleSubmitRegistration(vm.user_info, vm.isOwner, registrationSuccess, registrationFail);
                    break;
                case 2:
                    LoginFactory.resendEmailConfirmation(vm.user_info);
                    break;
                case 3:
                    LoginFactory.resetPassword(user_info);
                    break;
                default:
                    LoginFactory.handleLogin();
                    break;
            }
        }

        function setTab(index) {
            Flash.clear();
            vm.tab = index;
            vm.user_info = {
                first_name: '',
                last_name: '',
                password: '',
                password_confirmation: '',
                email: vm.user_info.email
            };
        }

        function resetUserInfo(email) {
            email !== undefined ? email : '';

            vm.user_info = {
                first_name: '',
                last_name: '',
                password: '',
                password_confirmation: '',
                email: email
            };
        }

        function setFocusedField(form, field) {
            vm.focused_field = LoginFactory.setFocusedField(form, field, vm.focused_field);
        }

        function resetFocusedField() {
            vm.focused_field = LoginFactory.resetFocusedField();
        }

        function loginSuccess(resp) {
            MilesBoardApi.UsersApi.get(resp.id).then(function (response) {
                $localStorage.user = response.user;
                $localStorage.user.team_ids = [];
                for (var i = 0; i < $localStorage.user.teams.length; i++) {
                    $localStorage.user.team_ids.push($localStorage.user.teams[i].id);
                }
                vm.submitting = false;
            });
            $state.go('user', { userId: resp.id, reset: true });
            $window.location.reload();
        }

        function updatePassword() {
            LoginFactory.updatePassword(vm.user_info, loginSuccess, loginFail);
        }

        function loginFail(resp) {
            Flash.create('danger', 'Login Error: ' + resp.errors, 0, { container: 'login_flash' }, true);
        }

        function registrationSuccess(resp) {
            var email = vm.user_info.email;
            var message = 'Success!<br /> A confirmation email has been sent to ' + vm.user_info.email;
            var container = 'regform_flash';
            if (vm.tab === 2) {
                container = 'resendform_flash';
            }
            Flash.create('success', message, 0, { container: container }, true);
            vm.registered = true;
            vm.submitting = false;

            InvitationCodesApi.put(vm.user_info.code_id, { used: true });
        }

        function registrationFail(resp) {
            var message = 'Whoops... something went wrong while submitting your registration';
            message += MilesBoardApi.errorReader(resp.data);
            Flash.create('danger', message, 0, { container: 'regform_flash' }, true);
            vm.submitting = false;
        }
    }
})();

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(55);

__webpack_require__(56);

__webpack_require__(57);

__webpack_require__(58);

__webpack_require__(59);

__webpack_require__(60);

__webpack_require__(61);

__webpack_require__(62);

__webpack_require__(63);

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').controller('AddOwnerModalController', AddOwnerModalController);

    AddOwnerModalController.$inject = ['$scope', '$uibModalInstance'];

    function AddOwnerModalController($scope, $uibModalInstance) {
        var vm = this;
        vm.users = $scope.$parent.vm.team.users;
        vm.owner_ids = $scope.$parent.vm.owner_ids;

        vm.$onInit = onInit;
        vm.$onChanges = onChanges;
        vm.updateOwnersList = updateOwnersList;
        vm.save = save;
        vm.close = close;

        function onInit() {}

        function onChanges() {
            if ($scope.query === '') {
                vm.users = $scope.$parent.vm.team.users;
            }
        }

        function updateOwnersList(user) {
            var index = vm.owner_ids.indexOf(user.id);
            if (index === -1) {
                vm.owner_ids.push(user.id);
            } else {
                vm.owner_ids.splice(index, 1);
            }
        }

        function save() {
            $uibModalInstance.close(vm.owner_ids);
        }

        function close() {
            $uibModalInstance.close(null);
        }
    }
})();

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').controller('AddRunToUserController', AddRunToUserController);

    AddRunToUserController.$inject = ['$scope', '$uibModalInstance'];

    function AddRunToUserController($scope, $uibModalInstance) {
        var vm = this;

        vm.$onInit = onInit;
        vm.save = save;
        vm.cancel = cancel;

        function onInit() {
            vm.cal_opened = false;
            vm.run = {
                user_id: '',
                distance: '',
                run_date: new Date()
            };
            vm.dateOptions = {
                maxDate: new Date()
            };
        }

        function save(user_id) {
            vm.run.user_id = user_id;
            $uibModalInstance.close(vm.run);
        }

        function cancel() {
            $uibModalInstance.close(null);
        }
    }
})();

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').controller('confirmationController', confirmationController);

    confirmationController.$inject = ['$scope', '$uibModalInstance'];

    function confirmationController($scope, $uibModalInstance) {
        var vm = this;
        vm.message = $scope.message;
        vm.messageObj = $scope.messageObj;
        vm.showFooter = true;

        vm.close = close;

        function close(ans) {
            $uibModalInstance.close(ans);
        }
    }
})();

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').controller('CreateTeamModalController', CreateTeamModalController);

    CreateTeamModalController.$inject = ['$localStorage', '$uibModalInstance'];

    function CreateTeamModalController($localStorage, $uibModalInstance) {
        var vm = this;

        vm.newTeam = {
            name: '',
            location: '',
            contact_email: ''
        };

        vm.cancel = cancel;
        vm.save = save;

        function save() {
            if ($localStorage.user && $localStorage.user.id) {
                vm.newTeam.team_owner_id = $localStorage.user.id;
                $uibModalInstance.close(vm.newTeam);
            }
        }

        function cancel() {
            $uibModalInstance.close(null);
        }
    }
})();

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').controller('CustomTabsController', CustomTabsController);

    CustomTabsController.$inject = ['$scope', '$uibModalInstance', 'Flash', 'Restangular'];

    function CustomTabsController($scope, $uibModalInstance, Flash, Restangular) {
        var vm = this;
        vm.filter_fields = ['Team Distance', 'Team Run Count'];
        vm.comparators = ['less than', 'less than or equal to', 'greater than', 'greater than or equal to', 'equal to'];
        vm.comparators_display = {
            lt: 'less than',
            lte: 'less than or equal to',
            gt: 'greater than',
            gte: 'greater than or equal to',
            eq: 'equal to'
        };

        vm.newTab = {
            heading: '',
            custom_filters: []
        };

        vm.$onInit = onInit;
        vm.cancel = cancel;
        vm.save = save;
        vm.setFilterField = setFilterField;
        vm.setComparator = setComparator;
        vm.setValue = setValue;
        vm.deleteTab = deleteTab;

        function onInit() {
            vm.tabs = [];
            switch ($scope.$parent.tabAction) {
                case 'add':
                    var filter1 = {
                        filter_field: '(select field)',
                        filter_value: '',
                        comparator: '(select comparison)'
                    };

                    var filter2 = {
                        filter_field: filter1.filter_field,
                        filter_value: '',
                        comparator: '(select comparison)'
                    };

                    vm.newTab.custom_filters = [filter1, filter2];
                    vm.showSecondCondition = false;
                    break;
                case 'edit':
                    vm.tabs = $scope.$parent.tabs;
                    for (var i = 0; i < vm.tabs.length; i++) {
                        vm.tabs[i].is_open = false;
                        vm.tabs[i].disableSubmit = false;
                        if (vm.tabs[i].custom_filters[1].comparator === 'gte' && parseInt(vm.tabs[i].custom_filters[1].filter_value) === 0) {
                            vm.tabs[i].showSecondCondition = false;
                        } else {
                            vm.tabs[i].showSecondCondition = true;
                        }
                    }
                    break;
            }
            vm.updatedFilters = [];
            vm.delete_first_click = false;
        }

        function validateTab() {
            var valid = false;
            switch ($scope.$parent.tabAction) {
                case 'add':
                    //check that each filter is valid before being able to submit
                    var filter1_valid = vm.filter_fields.indexOf(vm.newTab.custom_filters[0].filter_field) !== -1 && vm.comparators.indexOf(vm.comparators_display[vm.newTab.custom_filters[0].comparator]) !== -1 && !isNaN(vm.newTab.custom_filters[0].filter_value) && vm.newTab.custom_filters[0].filter_value >= 0;

                    var filter2_valid = vm.showSecondCondition === false || vm.showSecondCondition === true && vm.filter_fields.indexOf(vm.newTab.custom_filters[1].filter_field) !== -1 && vm.comparators.indexOf(vm.comparators_display[vm.newTab.custom_filters[1].comparator]) !== -1 && !isNaN(vm.newTab.custom_filters[1].filter_value) && vm.newTab.custom_filters[1].filter_value >= 0;

                    valid = filter1_valid && filter2_valid && vm.newTab.heading !== '' && vm.newTab.heading !== undefined;
                    break;
                case 'edit':
                    break;
            }

            return valid;
        }

        function save() {
            var result = {};
            if ($scope.$parent.tabAction === 'add') {
                var dbf = vm.newTab.custom_filters[0].filter_field;
                vm.newTab.custom_filters[0].filter_field = dbf;
                vm.newTab.custom_filters[1].filter_field = dbf;
                if (validateTab()) {
                    if (vm.showSecondCondition === false) {
                        vm.newTab.custom_filters[1].filter_value = 0;
                        vm.newTab.custom_filters[1].comparator = 'gte';
                    }
                    result = vm.newTab;
                } else {
                    var message = 'Invalid Filter Inputs';
                    Flash.clear();
                    Flash.create('warning', message, 5000, { container: 'createTab_flash' }, true);
                    return;
                }
            } else if ($scope.$parent.tabAction === 'edit') {
                for (var i = 0; i < vm.tabs.length; i++) {
                    if (vm.tabs[i].showSecondCondition === false) {
                        vm.tabs[i].custom_filters[1].comparator = 'gte';
                        vm.tabs[i].custom_filters[1].filter_value = 0;
                    }
                }
                result = vm.tabs;
            }
            $uibModalInstance.close(result);
        }

        function cancel() {
            $uibModalInstance.close(null);
        }

        function setFilterField(tab, filter, field) {
            if (vm.updatedFilters.indexOf(filter) === -1) {
                vm.updatedFilters.push(filter);
            }

            if ($scope.$parent.tabAction === 'add') {
                vm.newTab.custom_filters[filter].filter_field = field;
            } else {
                vm.tabs[tab].custom_filters[filter].filter_field = field;
            }
        }

        function setComparator(tab, filter, comp) {
            if (vm.updatedFilters.indexOf(filter) === -1) {
                vm.updatedFilters.push(filter);
            }

            var parsed = '';
            switch (comp) {
                case 'less than':
                    parsed = 'lt';
                    break;
                case 'less than or equal to':
                    parsed = 'lte';
                    break;
                case 'greater than':
                    parsed = 'gt';
                    break;
                case 'greater than or equal to':
                    parsed = 'gte';
                    break;
                case 'equal to':
                    parsed = 'eq';
                    break;
                default:
                    parsed = 'gte';
                    break;
            }

            if ($scope.$parent.tabAction === 'add') {
                vm.newTab.custom_filters[filter].comparator = parsed;
            } else {
                vm.tabs[tab].custom_filters[filter].comparator = comp;
            }
        }

        function setValue(tab, filter, val) {
            if (vm.updatedFilters.indexOf(filter) === -1) {
                vm.updatedFilters.push(filter);
            }

            if ($scope.$parent.tabAction === 'add') {
                vm.newTab.custom_filters[filter].filter_value = val;
            } else {
                if (val >= 0) {
                    vm.tabs[tab].custom_filters[filter].filter_value = val;
                    Flash.clear();
                } else {
                    vm.tabs[tab].custom_filters[filter].filter_value = 0;
                    var message = 'The filter value must be at least 0';
                    Flash.clear();
                    Flash.create('warning', message, 0, { container: 'editTab_flash' }, true);
                }
            }
        }

        function deleteTab(tab) {
            vm.delete_first_click = false;
            Restangular.all('custom_tabs').customDELETE(vm.tabs[tab].id).then(function (resp) {
                ;
                vm.tabs.splice(tab, 1);
                var message = 'Tab successfully deleted';
                Flash.clear();
                Flash.create('success', message, 0, { container: 'editTab_flash' }, true);
            });
        }
    }
})();

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').controller('EditRunModalController', EditRunModalController);

    EditRunModalController.$inject = ['$scope', '$uibModalInstance'];

    function EditRunModalController($scope, $uibModalInstance) {
        var vm = this;

        vm.$onInit = onInit;
        vm.save = save;
        vm.cancel = cancel;

        function save() {
            $uibModalInstance.close({ id: parseInt($scope.editing_run.id.text),
                team_id: parseInt($scope.editing_run.Team.team_id),
                distance: vm.run.distance,
                run_date: vm.run.run_date });
        }

        function cancel() {
            $uibModalInstance.close('cancel');
        }

        function onInit() {
            vm.run = {
                distance: parseInt($scope.editing_run.Distance.text),
                run_date: $scope.editing_run['Run Date'].text === '--' ? new Date() : new Date($scope.editing_run['Run Date'].text)
            };

            vm.today = moment();
            vm.dateOptions = {
                maxDate: new Date()
            };
        }
    }
})();

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').controller('LoginModalController', LoginModalController);

    LoginModalController.$inject = ['$state', '$localStorage', '$uibModal', '$uibModalInstance', '$window', 'Flash', 'LoginFactory', 'MilesBoardApi'];

    function LoginModalController($state, $localStorage, $uibModal, $uibModalInstance, $window, Flash, LoginFactory, MilesBoardApi) {
        var vm = this;
        vm.inModal = true;
        vm.submitting = false;

        resetFocusedField();
        resetUserInfo();

        vm.setTab = setTab;
        vm.handleSubmitClick = handleSubmitClick;
        vm.handleCancel = handleCancel;
        vm.resetFocusedField = resetFocusedField;
        vm.setFocusedField = setFocusedField;

        function handleSubmitClick() {
            vm.submitting = true;
            switch (vm.tab) {
                case 0:
                    LoginFactory.handleLogin(vm.user_info, loginSuccess, loginFail);
                    break;
                case 1:
                    LoginFactory.handleSubmitRegistration(vm.user_info, vm.isOwner, registrationSuccess, registrationFail);
                    break;
                case 2:
                    LoginFactory.resendEmailConfirmation(vm.user_info);
                    break;
                case 3:
                    LoginFactory.resetPassword(user_info);
                    break;
                default:
                    handleLogin();
                    break;
            }
        }

        function setTab(index) {
            Flash.clear();
            vm.tab = index;
            vm.user_info = {
                first_name: '',
                last_name: '',
                password: '',
                password_confirmation: '',
                email: vm.user_info.email
            };
        }

        function loginSuccess(resp) {
            MilesBoardApi.UsersApi.get(resp.id).then(function (response) {
                $localStorage.user = response.user;
                $localStorage.user.team_ids = [];
                for (var i = 0; i < $localStorage.user.teams.length; i++) {
                    $localStorage.user.team_ids.push($localStorage.user.teams[i].id);
                }
                vm.submitting = false;
                $uibModalInstance.close();
            });
            $state.go('user', { userId: resp.id }, { reload: true });
            $window.location.reload();
        }

        function loginFail(reason) {

            Flash.create('danger', 'Login Error: ' + reason.errors, 0, { container: 'loginModal_flash' }, true);
        }

        function handleCancel() {
            $uibModalInstance.close('cancel');
        }

        function registrationSuccess(resp) {
            var email = vm.user_info.email;
            var message = 'Success!<br /> A confirmation email has been sent to ' + vm.user_info.email;
            var container = 'regform_flash';
            if (vm.tab === 2) {
                container = 'resendform_flash';
            }
            Flash.create('success', message, 5000, { container: container });
            vm.registered = true;
            vm.submitting = false;

            if (vm.user_info.code_id) {
                Restangular.all('invitation_codes').customPUT({ code: vm.user_info.owner_confirmation_code, used: true });
            }
        }

        function registrationFail(resp) {
            var message = 'Whoops... something went wrong while submitting your registration';
            message += MilesBoardApi.errorReader(resp.data);
            Flash.create('danger', message, 0, { container: 'index_flash' }, true);
            vm.submitting = false;
        }

        function setFocusedField(form, field) {
            vm.focused_field = LoginFactory.setFocusedField(form, field, vm.focused_field);
        }

        function resetFocusedField() {
            vm.focused_field = LoginFactory.resetFocusedField();
        }

        function resetUserInfo(email) {
            email !== undefined ? email : '';

            vm.user_info = {
                first_name: '',
                last_name: '',
                password: '',
                password_confirmation: '',
                email: email
            };
        }
    }
})();

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _newMemberForm = __webpack_require__(2);

var _newMemberForm2 = _interopRequireDefault(_newMemberForm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    angular.module('milesBoard').controller('NewMemberModalController', NewMemberModalController);

    NewMemberModalController.$inject = ['$scope', '$uibModalInstance', 'Flash', 'MilesBoardApi'];

    function NewMemberModalController($scope, $uibModalInstance, Flash, MilesBoardApi) {
        var vm = this;
        vm.teamMemberForm = _newMemberForm2.default;
        vm.showPasswordFields = false;
        vm.waiverUrl = 'teams/' + $scope.team_id + '/waiver.txt';
        vm.showWaiver = false;
        vm.waiverAgree = false;
        vm.updating = $scope.$parent.profileAction === 'edit';
        vm.newMember = $scope.$parent.profileAction !== 'edit' ? {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: ''
        } : $scope.user_for_modal;

        vm.disableSubmit = !vm.newMember.first_name || !vm.newMember.last_name || !vm.waiverAgree;

        vm.showPasswordForm = $scope.$parent.profileAction;

        vm.save = save;
        vm.cancel = cancel;
        vm.handleFieldUpate = handleFieldUpate;

        function showPasswordFieldsChange() {
            if (!vm.showPasswordFields) {
                vm.newMember.password = '';
                vm.newMember.password_confirmation = '';
            }
        }

        function save() {
            if (vm.newMember.email) {
                MilesBoardApi.UsersApi.get('', { email: vm.newMember.email }).then(function (response) {
                    response = response.plain();
                    if (response.user && response.user.id) {
                        var found = false;
                        for (var i = 0; i < response.user.teams.length; i++) {
                            if (response.user.teams[i].id === parseInt($scope.team_id)) {
                                found = true;
                                break;
                            }
                        }

                        if (!found) {
                            var user = {
                                id: response.user.id,
                                first_name: response.user.first_name,
                                last_name: response.user.last_name,
                                team_distance: 0,
                                team_run_count: 0
                            };
                            if ($scope.team_id) {
                                MilesBoardApi.TeamMemberListsApi.post({
                                    user_id: response.user.id,
                                    team_id: parseInt($scope.team_id)
                                }).then(function (post_result) {
                                    $uibModalInstance.close(user);
                                }, function (reason) {
                                    $uibModalInstance.close(reason);
                                });
                            } else {
                                $uibModalInstance.close(user);
                            }
                        } else {
                            var message = 'A user with that email is already on this team (' + response.user.first_name + ' ' + response.user.last_name + ')';
                            Flash.create('warning', message, 5000, { container: 'newmember-flash' }, true);
                        }
                    } else {
                        createNewUser(vm.newMember).then(function (result) {
                            var user = {
                                id: result.id,
                                first_name: vm.newMember.first_name,
                                last_name: vm.newMember.last_name,
                                team_distance: 0,
                                team_run_count: 0
                            };
                            $uibModalInstance.close(user);
                        }, function (reason) {
                            $uibModalInstance.close(reason);
                        });
                    }
                }, function () {});
            } else {
                createNewUser(vm.newMember).then(function (result) {
                    var user = {
                        id: result.id,
                        first_name: vm.newMember.first_name,
                        last_name: vm.newMember.last_name,
                        team_distance: 0,
                        team_run_count: 0
                    };
                    $uibModalInstance.close(user);
                }, function (reason) {
                    $uibModalInstance.close(reason);
                });
            }
        }

        function cancel() {
            $uibModalInstance.close(null);
        }

        function createNewUser(user) {
            var newUser = {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                team_id: user.team_id,
                password: user.password,
                password_confirmation: user.password_confirmation
            };

            if ($scope.team_id) {
                user.team_id = $scope.team_id;
            }

            return MilesBoardApi.UsersApi.post(newUser);
        }

        function handleFieldUpate() {
            vm.disableSubmit = !vm.newMember.first_name || !vm.newMember.last_name || !vm.waiverAgree;
        }
    }
})();

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _newMemberForm = __webpack_require__(2);

var _newMemberForm2 = _interopRequireDefault(_newMemberForm);

var _createTeamModal = __webpack_require__(64);

var _createTeamModal2 = _interopRequireDefault(_createTeamModal);

var _editRunForm = __webpack_require__(65);

var _editRunForm2 = _interopRequireDefault(_editRunForm);

var _confirmationModal = __webpack_require__(66);

var _confirmationModal2 = _interopRequireDefault(_confirmationModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    'use strict';

    angular.module('milesBoard').controller('UserProfileModalController', UserProfileModalController);

    UserProfileModalController.$inject = ['$filter', '$localStorage', '$q', '$scope', 'Flash', 'MilesBoardApi', 'MilesBoardImages', 'RunsDisplayConfig', 'TeamDisplayConfig', '$uibModalInstance', '$rootScope'];

    function UserProfileModalController($filter, $localStorage, $q, $scope, Flash, MilesBoardApi, MilesBoardImages, RunsDisplayConfig, TeamDisplayConfig, $uibModalInstance, $rootScope) {
        var vm = this;
        var PROFILE_MODAL_FLASH = 'profile-modal-flash';
        vm.user = $scope.user.user;

        var userTypes = {
            TEAM_OWNER: 'TeamOwner',
            USER: 'User'
        };

        vm.loggedIn = $localStorage.user ? true : false;
        vm.profileImageSrc = MilesBoardImages.road_runner;
        vm.myProfile = vm.loggedIn && vm.user.id === $localStorage.user.id;

        vm.tabs = [{ title: 'Teams', hidden: false }, { title: 'Owned Teams', hidden: vm.user.type !== userTypes.TEAM_OWNER }];

        vm.$onInit = onInit;
        vm.setTab = setTab;
        vm.close = close;
        vm.save = save;
        vm.showCallbackConditions = showCallbackConditions;
        vm.showEditRunModalClick = showEditRunModalClick;
        vm.showDeleteRunConfirmation = showDeleteRunConfirmation;

        function onInit() {
            vm.newMemberForm = _newMemberForm2.default;
            vm.createTeamFrom = _createTeamModal2.default;
            vm.editRunForm = _editRunForm2.default;
            vm.confirmationModal = _confirmationModal2.default;

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
            var message = 'Whoops... something went wrong while finding the user\'s profile. Please try again later.';
            Flash.create('danger', message, 5000, { container: 'index_flash' }, true);
        }

        function setupDisplay(obj, config, rowcallback) {
            return {
                displayObjData: buildDisplayObject(obj, config),
                displayConfig: config,
                rowCallback: rowcallback
            };
        }

        function setTab(index) {
            vm.tab = index;
            vm.showCreateTeamButton = getShowCreateTeamButton();
            var displayObjData = buildDisplayObject(vm.user.teams, TeamDisplayConfig);
            if (!vm.myProfile) {
                displayObjData = $filter('filter')(displayObjData, getValueForFiltering, sharedTeamComparator);
            }
            switch (index) {
                case 0:
                    //all teams user is on
                    vm.teams_board_display.displayObjData = displayObjData;
                    break;
                case 1:
                    //user owned teams
                    vm.teams_board_display.displayObjData = $filter('filter')(displayObjData, { team_owner_id: { text: vm.user.id } }, isTeamOwnerComparator);
                    break;
                default:
                    vm.tab = 0;
                    vm.teams_board_display.displayObjData = displayObjData;
                    break;
            }
        }

        function buildDisplayObject(obj, config) {
            var displayObj = [];
            for (var j = 0; j < obj.length; j++) {
                var item = {};
                for (var i = 0; i < config.headers.length; i++) {
                    if (!item.hasOwnProperty(config.headers[i].text)) {
                        item[config.headers[i].text] = { text: '', hidden: false };
                    }

                    item[config.headers[i].text].text = obj[j][config.headers[i].text.toLowerCase().replace(/\s/g, '_')];
                    if (config.headers[i].text.toLowerCase().replace(/\s/g, '_') === 'run_date') {
                        var date = moment(item[config.headers[i].text].text);
                        item[config.headers[i].text].text = date.isValid() ? date.format('MMMM D, YYYY') : '--';
                    } else if (config.headers[i].text.toLowerCase().replace(/\s/g, '_') === 'team') {
                        item[config.headers[i].text].text = obj[j][config.headers[i].text.toLowerCase().replace(/\s/g, '_')].name;
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
            var inOwnerArr = false;
            for (var i = 0; i < vm.user.teams[i].length; i++) {
                if (vm.user.teams[i].id === expected.Team.id.text) {
                    if (vm.user.teams[i].owner_ids && vm.user.teams[i].owner_ids.indexOf(expected) !== -1) {
                        inOwnerArr = true;
                    }
                }
            }
            return parseInt(actual) === parseInt(expected) || inOwnerArr;
        }

        function sharedTeamComparator(actual, expected) {
            for (var i = 0; i < $localStorage.user.teams; i++) {
                if ($localStorage.user.teams[i] === actual) {
                    return true;
                }
            }
            return false;
        }

        function getShowCreateTeamButton() {
            return vm.loggedIn && vm.user.id === $localStorage.user.id && $localStorage.user.type === 'TeamOwner';
        }

        function showCallbackConditions(row) {
            if (vm.myProfile) {
                return true;
            } else if ($localStorage.user.type === 'TeamOwner') {
                var user = $localStorage.user;
                for (var i = 0; i < user.teams.length; i++) {
                    if (user.teams[i].id === row.Team.team_id) {
                        for (var j = 0; j < user.teams[i].team_owners.length; j++) {
                            if (user.id === user.teams[i].team_owners[j].id) {
                                vm.RunsDisplayConfig.showCallback = true;
                                return true;
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
            if (vm.showNewMemberForm === true) {
                vm.showNewMemberForm = false;
            } else if (vm.showCreateTeamForm === true) {
                vm.showCreateTeamForm = false;
            } else if (vm.showEditRunModal === true) {
                vm.showEditRunModal = false;
            } else if (vm.showConfirmationDialog) {
                vm.showConfirmationDialog = false;
            } else {
                var result = null;
                if (vm.user_updated === true) {
                    result = vm.user;
                }
                $uibModalInstance.close(vm.user);
            }
        }

        function save() {
            var changed = false;
            var updates = {
                id: vm.user.id
            };
            if (vm.showNewMemberForm) {
                if (vm.newMember) {
                    if (vm.newMember.first_name && vm.user.first_name !== vm.newMember.first_name) {
                        updates.first_name = vm.newMember.first_name;
                        changed = true;
                    }

                    if (vm.newMember.last_name && vm.user.last_name !== vm.newMember.last_name) {
                        updates.last_name = vm.newMember.last_name;
                        changed = true;
                    }

                    if (vm.newMember.email && vm.user.email !== vm.newMember.email) {
                        updates.email = vm.newMember.email;
                        changed = true;
                    }
                    Flash.clear();
                    if (changed === true) {
                        MilesBoardApi.put('users', updates).then(function (resp) {
                            vm.user = angular.extend(vm.user, updates);
                            vm.user_updated = true;
                            var message = 'Profile Successfully Updated!';
                            Flash.create('success', message, 5000, { container: PROFILE_MODAL_FLASH }, true);
                        }, function (reason) {
                            var message = 'Whoops... There was an error updating your profile. Please try again later';
                            Flash.create('danger', message, 5000, { container: PROFILE_MODAL_FLASH }, true);
                        });
                    }
                    vm.newMember = undefined;
                }
                vm.showNewMemberForm = false;
            } else if (vm.showCreateTeamForm) {
                vm.showCreateTeamForm = false;
            } else if (vm.showEditRunModal) {
                vm.showEditRunModal = false;
                saveEditRun(vm.run);
                vm.run = undefined;
            } else if (vm.showConfirmationDialog === true) {
                deleteRun(vm.run);
                vm.run = undefined;
                vm.messageObj = '';
                vm.showConfirmationDialog = false;
            }
        }

        function showEditRunModalClick(row) {
            vm.run = getRunFromRow(row);
            vm.dateOptions = {
                maxDate: new Date()
            };
            vm.showEditRunModal = true;
        }

        function saveEditRun(data) {
            var updates = {
                run_date: moment(data.run_date).format('YYYY-MM-DD'),
                distance: parseInt(data.distance),
                id: data.id
                //user_id: vm.user.id,
                //team_id: data['team id'].text
            };

            MilesBoardApi.put('runs', updates).then(function (response) {
                for (var i = 0; i < vm.user.runs.length; i++) {
                    if (updates.id === vm.user.runs[i].id) {
                        vm.user.runs[i].run_date = updates.run_date;
                        vm.user.runs[i].distance = updates.distance;
                        break;
                    }
                }
                vm.runs_board_display = setupDisplay(vm.user.runs, RunsDisplayConfig, null);
            });
        }

        function showDeleteRunConfirmation(row) {
            vm.run = getRunFromRow(row);
            vm.message = 'Delete this run?';
            vm.messageObj = vm.run.distance + ' miles on ' + moment(vm.run.run_date).format('MMMM D, YYYY') + ' with ' + row.Team.text;
            vm.showFooter = false;
            vm.showConfirmationDialog = true;
        }

        function deleteRun(run) {
            MilesBoardApi.remove('runs', run.id).then(function (resp) {
                for (var i = 0; i < vm.user.runs.length; i++) {
                    if (vm.user.runs[i].id === run.id) {
                        vm.user.runs.splice(i, 1);
                        break;
                    }
                }
                vm.runs_board_display = setupDisplay(vm.user.runs, RunsDisplayConfig, null);
                $rootScope.$broadcast('RUN_DELETED', vm.user.id, run.distance);
            });
        }

        function getRunFromRow(row) {
            return {
                distance: parseInt(row.Distance.text),
                run_date: new Date(row['Run Date'].text),
                id: row.id.text
            };
        }
    }
})();

/***/ }),
/* 64 */
/***/ (function(module, exports) {

var path = '/components/modals/CreateTeamModal/_createTeamModal.html';
var html = "<div id=\"newTeamModal\" class=\"modal\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" ng-click=\"vm.cancel()\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">Create New Team</h4>\n            </div>\n            <div class=\"modal-body\">\n                <ng-include src=\"'components/modals/CreateTeamModal/_createTeamForm.html'\"></ng-include>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" ng-click=\"vm.cancel()\">Cancel</button>\n                <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.save()\">Save</button>\n            </div>\n        </div>\n        <!-- /.modal-content -->\n    </div>\n    <!-- /.modal-dialog -->\n</div>\n<!-- /.modal -->";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 65 */
/***/ (function(module, exports) {

var path = '/components/modals/EditRunModal/_editRunForm.html';
var html = "<form id=\"editRunForm\" name=\"editRunForm\">\n    <div class=\"form-group\">\n        <label for=\"distance\">Distance</label>\n        <input type=\"number\" min=\"0\" class=\"form-control\" id=\"distance\" ng-model=\"vm.run.distance\" placeholder=\"Edit Distance\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"run_date\">Date</label>\n        <p class='input-group'>\n            <input uib-datepicker-popup type=\"text\" class=\"form-control\" id=\"run_date\" is-open=\"vm.cal_opened\" datepicker-options=\"vm.dateOptions\"\n                ng-required=\"true\" ng-model=\"vm.run.run_date\" ng-click=\"vm.cal_opened = !vm.cal_opened\" placeholder=\"Select date\"\n            />\n            <span class=\"input-group-btn\">\n                <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cal_opened = !vm.cal_opened\"><i class=\"fa fa-calendar\"></i></button>\n            </span>\n        </p>\n    </div>\n</form>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 66 */
/***/ (function(module, exports) {

var path = '/components/modals/ConfirmationModal/_confirmationModal.html';
var html = "<div id='confirmation_modal'>\n    <div class='modal-body'>\n        <p class='confirm-msg'>{{vm.message}}</p>\n        <p class='confirm-obj'>{{vm.messageObj}}</p>\n    </div>\n    <div class='modal-footer' ng-show='vm.showFooter'>\n        <button type='button' class='btn btn-primary' ng-click=\"vm.close(true)\">Confirm</button>\n        <button type='button' class='btn btn-default' ng-click=\"vm.close(false)\">Cancel</button>\n    </div>\n</div>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(68);

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').value('RunsDisplayConfig', {
        'objcode': 'RUN',
        'paramName': 'runId',
        "headers": [{ text: 'id', hidden: true }, { text: 'Run Date', hidden: false }, { text: 'Distance', hidden: false }, { text: 'Team', hidden: false, uiSref: 'team' }, { text: 'team id', hidden: true }],
        'rowCallbackText': ['Edit', 'Delete'],
        'showCallback': true
    });
})();

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(70);

__webpack_require__(71);

__webpack_require__(72);

__webpack_require__(79);

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('milesBoard').value('TeamDisplayConfig', {
    'objcode': 'TEAM',
    'paramName': 'team_id',
    'headers': [{ text: 'id', hidden: true }, { text: 'team_owner_id', hidden: true }, { text: 'Name', hidden: false, uiSref: 'team' }, { text: 'Location', hidden: false }, { text: 'Contact Email', hidden: false }],
    'title': 'Teams',
    'rowCallbackText': 'Add Run',
    'showCallback': true
});

/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


angular.module('milesBoard').value('TeamsDisplayConfig', {
    'objcode': 'TEAM',
    'paramName': 'team_id',
    'headers': [{ text: 'id', hidden: true }, { text: 'Name', hidden: false, uiSref: 'team' }, { text: 'Location', hidden: false }, { text: 'Contact Email', hidden: false }],
    'title': 'Teams',
    'rowCallbackText': 'Join Team',
    'showCallback': true
});

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _addOwnerModal = __webpack_require__(73);

var _addOwnerModal2 = _interopRequireDefault(_addOwnerModal);

var _newMemberModal = __webpack_require__(74);

var _newMemberModal2 = _interopRequireDefault(_newMemberModal);

var _addRunToUser = __webpack_require__(75);

var _addRunToUser2 = _interopRequireDefault(_addRunToUser);

var _createTabModal = __webpack_require__(76);

var _createTabModal2 = _interopRequireDefault(_createTabModal);

var _editTabModal = __webpack_require__(77);

var _editTabModal2 = _interopRequireDefault(_editTabModal);

var _userProfileModal = __webpack_require__(78);

var _userProfileModal2 = _interopRequireDefault(_userProfileModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    'use strict';

    angular.module('milesBoard').controller('TeamsController', TeamsController);

    TeamsController.$inject = ['$document', '$localStorage', '$rootScope', '$scope', '$stateParams', 'boardFilterFilter', 'Flash', 'MilesBoardApi', 'MilesBoardImages', 'team', 'teams', 'TeamDisplayConfig', 'TeamsDisplayConfig', '$uibModal', 'UsersDisplayConfig'];

    function TeamsController($document, $localStorage, $rootScope, $scope, $stateParams, boardFilterFilter, Flash, MilesBoardApi, MilesBoardImages, team, teams, TeamDisplayConfig, TeamsDisplayConfig, $uibModal, UsersDisplayConfig) {
        var vm = this;
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
        vm.setLogo = setLogo;

        $rootScope.$on('RUN_DELETED', function (event, user_id, distance) {
            if (vm.team) {
                for (var i = 0; i < vm.team.users.length; i++) {
                    if (user_id === vm.team.users[i].id) {
                        vm.team.users[i].team_distance -= distance;
                        vm.team.users[i].team_run_count -= 1;
                        break;
                    }
                }
                vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig);
            }
        });
        function onInit() {
            vm.logoSrc = MilesBoardImages.getLogo($stateParams.team_id);

            if ($stateParams.team_id) {
                vm.team.users = team.plain().users;

                vm.owner_ids = [];
                for (var i = 0; i < vm.team.team_owners.length; i++) {
                    vm.owner_ids.push(vm.team.team_owners[i].id);
                }

                vm.isTeamOwner = vm.loggedIn && (vm.owner_ids.indexOf($localStorage.user.id) !== -1 || vm.team.team_owner_id == $localStorage.user.id);
            }

            setUpTable();
            vm.originalDisplayData = angular.merge([], vm.displayObjData);
        }

        function onChanges(changes) {
            setUpTable();
        }

        function setLogo() {
            if (!angular.element(document.getElementById('logo_img'))[0].attributes.getNamedItem('src').value) {
                vm.logoSrc = null;
            }
        }

        function setUpTable() {
            if ($stateParams.team_id) {
                vm.displayConfig = UsersDisplayConfig;
                vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig);
            } else {
                vm.displayConfig = TeamsDisplayConfig;
                vm.displayObjData = buildDisplayObject(vm.teams, TeamsDisplayConfig);
            }
        }

        function buildDisplayObject(obj, config) {
            var displayObj = [];
            var count = 0;
            for (var j = 0; j < obj.length; j++) {
                var item = {};
                for (var i = 0; i < config.headers.length; i++) {
                    if (!item.hasOwnProperty(config.headers[i].text)) {
                        item[config.headers[i].text] = { text: '', hidden: false };
                    }

                    item[config.headers[i].text].text = obj[j][config.headers[i].text.toLowerCase().replace(/\s/g, '_')];
                    item[config.headers[i].text].hidden = config.headers[i].hidden;

                    if (config.headers[i].uiSref && vm.loggedIn) {
                        item[config.headers[i].text].uiSref = config.headers[i].uiSref + '({' + config.paramName + ':' + obj[j].id + '})';
                    }
                }

                if ($stateParams.team_id) {
                    item['Name'].text = obj[j].first_name + ' ' + obj[j].last_name;
                }

                displayObj.push(item);
            }
            return displayObj;
        }

        function showFilteredTable(tab) {
            if (tab === 0) {
                setUpTable();
            } else {
                var filtered = angular.merge([], vm.originalDisplayData);
                for (var i = 0; i < vm.team.custom_tabs[tab - 1].custom_filters.length; i++) {
                    if (parseInt(vm.team.custom_tabs[tab - 1].custom_filters[i].value) === 0 && (vm.team.custom_tabs[tab - 1].custom_filters[i].comparator === 'gt' || vm.team.custom_tabs[tab - 1].custom_filters[i].comparator === 'gte')) {
                        continue; // 0 is the minimum, so everything will be >, >= 0
                    }
                    filtered = boardFilterFilter(filtered, vm.team.custom_tabs[tab - 1].custom_filters[i]);
                }

                vm.displayObjData = filtered;
            }
        }

        function teamMemberAddSuccessFlash() {
            var message = 'New Team Member Successfully Created!';
            Flash.create('success', message, 5000, { container: 'index_flash' }, true);
        }

        function teamMemberAddFailFlash(reason) {
            var message = 'There was an error while creating a new team member:<br />';
            message += MilesBoardApi.errorReader(reason.data);
            Flash.create('danger', message, 0, { container: 'index_flash' }, true);
        }

        function showAddRunButton(user_row) {
            return vm.loggedIn && (vm.isTeamOwner || $localStorage.user.id == parseInt(user_row.id.text));
        }

        function showJoinTeamButton(row) {
            var notOnTeam = true;
            if ($localStorage.user.team_ids) {
                notOnTeam = $localStorage.user.team_ids.indexOf(row.id.text) === -1;
            }
            return notOnTeam;
        }

        function joinTeam(team_row) {
            MilesBoardApi.TeamMemberListsApi.post({ team_id: team_row.id.text, user_id: $localStorage.user.id }).then(function (resp) {
                $localStorage.user.teams.push({ id: team_row.id.text, name: team_row['Name'].text });
                $localStorage.user.team_ids.push(team_row.id.text);
                var message = 'You have been added as a member to ' + team_row['Name'].text;
                Flash.create('success', message, 5000, { container: 'index_flash' }, true);
            }, function (reason) {
                var message = 'Whoops... There was an error with your request, please try again later';
                Flash.create('danger', message, 5000, { container: 'index_flash' }, true);
            });
        }

        ///// MODALS /////

        function showAddTeamMemberModal(parentSelector) {
            var parentElem = parentSelector ? angular.element($document[0].querySelector('.page-container ' + parentSelector)) : undefined;

            $scope.profileAction = 'create';
            $scope.team_id = $stateParams.team_id;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: _newMemberModal2.default,
                controller: 'NewMemberModalController',
                controllerAs: 'vm',
                size: 'md',
                appendTo: parentElem,
                scope: $scope
            });

            modalInstance.result.then(function (result) {
                Flash.clear();
                if (result) {
                    vm.team.users.push(result);
                    vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig);

                    teamMemberAddSuccessFlash();
                }
            }, function (reason) {
                teamMemberAddFailFlash(reason);
            });
        };

        function showAddTeamOwnerModal() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: _addOwnerModal2.default,
                controller: 'AddOwnerModalController',
                controllerAs: 'vm',
                size: 'md',
                scope: $scope
            });

            modalInstance.result.then(function (result) {
                Flash.clear();
                if (result) {
                    Flash.clear();
                    MilesBoardApi.TeamOwnerListsApi.updateOwners({ team_id: $stateParams.team_id, owners_list: result }).then(function (response) {
                        var message = 'Team owners successfully updated!';
                        Flash.create('success', message, 5000, { container: 'index_flash' }, true);
                    }, function (reason) {
                        var message = 'Whoops... there was an error updating the team owners<br />';
                        message += MilesBoardApi.errorReader(reason.data);
                        Flash.create('danger', message, 0, { container: 'index_flash' }, true);
                    });
                }
            });
        };

        function showAddRunToUser(input) {
            var user_id = input.id.text; //contains user id
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: _addRunToUser2.default,
                controller: 'AddRunToUserController',
                controllerAs: 'vm',
                size: 'md'
            });

            modalInstance.result.then(function (result) {
                Flash.clear();
                if (result) {
                    var newRun = {
                        run: {
                            distance: result.distance,
                            run_date: result.run_date,
                            team_id: $stateParams.team_id,
                            user_id: user_id
                        }
                    };

                    MilesBoardApi.RunsApi.post(newRun).then(function (api_result) {
                        for (var i = 0; i < vm.team.users.length; i++) {
                            if (vm.team.users[i].id === parseInt(user_id)) {
                                vm.team.users[i].team_distance = parseInt(vm.team.users[i].team_distance) + parseInt(result.distance);
                                vm.team.users[i].team_run_count = parseInt(vm.team.users[i].team_run_count) + 1;
                                vm.displayObjData = buildDisplayObject(vm.team.users, UsersDisplayConfig);
                                break;
                            }
                        }

                        var message = 'Run Successfully Added!';
                        Flash.create('success', message, 5000, { container: 'index_flash' }, true);
                    });
                }
            }, function (reason) {
                var message = 'An error occured while saving your run:<br />';
                message += MilesBoardApi.errorReader(reason);
                Flash.create('danger', message, 0, { container: 'index_flash' }, true);
            });
        }

        function showCustomTabsModal(action) {
            $scope.tabAction = action;
            $scope.tabs = [];
            var templateUrl = _createTabModal2.default;
            if (action === 'edit') {
                $scope.tabs = vm.team.custom_tabs;
                templateUrl = _editTabModal2.default;
            }
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: templateUrl,
                controller: 'CustomTabsController',
                controllerAs: 'vm',
                size: 'md',
                scope: $scope
            });

            modalInstance.result.then(function (result) {
                Flash.clear();
                if (result) {
                    if ($scope.tabAction === 'add') {
                        result.team_id = $stateParams.team_id;
                        MilesBoardApi.CustomTabsApi.post(result).then(function (api_result) {
                            result.id = api_result.plain().id;
                            var filter1 = result.custom_filters[0];
                            filter1.custom_tab_id = api_result.plain().id;
                            filter1.object_type = 'team';
                            var filter2 = result.custom_filters[1];
                            filter2.custom_tab_id = api_result.plain().id;
                            filter2.object_type = 'team';

                            MilesBoardApi.CustomFiltersApi.post(filter1).then(function (f1_resp) {
                                MilesBoardApi.CustomFiltersApi.post(filter2).then(function (f2_resp) {
                                    result.custom_filters = [];
                                    result.custom_filters.push(filter1, filter2);
                                    vm.team.custom_tabs.push(result);

                                    var message = 'Tab Successfully Created!';
                                    Flash.create('success', message, 5000, { container: 'index_flash' }, true);
                                }, function (reason) {
                                    var message = 'An error occured while creating the second condition of your tab:<br />';
                                    message += MilesBoardApi.errorReader(reason.data);
                                    Flash.create('danger', message, 0, { container: 'index_flash' }, true);
                                });
                            }, function (reason) {
                                var message = 'An error occured while creating the first condition of your tab:<br />';
                                message += MilesBoardApi.errorReader(reason.data);
                                Flash.create('danger', message, 0, { container: 'index_flash' }, true);
                            });
                        });
                    } else if ($scope.tabAction === 'edit') {
                        var updates = { tabs: result };
                        MilesBoardApi.put('custom_tabs', updates);
                    }
                }
            }, function (reason) {
                var message = 'An error occured while creating your tab:<br />';
                message += MilesBoardApi.errorReader(reason.data);
                Flash.create('danger', message, 0, { container: 'index_flash' }, true);
            });
        }

        function showUserProfileModal(user_row) {
            var newscope = $scope.$new();
            MilesBoardApi.UsersApi.get(user_row.id.text).then(function (resp) {
                newscope.user = resp.plain();
                newscope.owner_ids = vm.owner_ids;
                var modalInstance = $uibModal.open({
                    animation: true,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: _userProfileModal2.default,
                    controller: 'UserProfileModalController',
                    controllerAs: 'vm',
                    size: 'lg',
                    scope: newscope
                });

                modalInstance.result.then(function (result) {
                    //if there's a result, the user updated their profile
                    //update the table as a result
                    if (result) {
                        for (var i = 0; i < vm.team.users.length; i++) {
                            if (vm.team.users[i].id === result.id) {
                                vm.team.users[i] = angular.extend(vm.team.users[i], result);
                                setUpTable();
                                break;
                            }
                        }
                    }
                }, function (reason) {});
            }, function (reason) {
                var message = 'Whoops... that user could not be found';
                Flash.create('danger', message, 5000, { container: 'index_flash' }, true);
            });
        }
    }
})();

/***/ }),
/* 73 */
/***/ (function(module, exports) {

var path = '/components/modals/AddOwnerModal/_addOwnerModal.html';
var html = "<div id=\"newMemberModal\" class=\"modal\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"vm.close()\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">Add Owner</h4>\n            </div>\n            <div class=\"modal-body\">\n                <input id=\"table_filter\" type='text' \n                        placeholder=\"Search By Name...\" \n                        ng-model=\"query\"\n                        ng-model-options=\"{ debounce: 200 }\" />\n                \n                <table id=\"board\" class=\"table table-responsive table-striped\">\n                    <tr ng-hide=\"vm.displayObjConfig.hideHeaderRow === true\">\n                        <th>Name</th>\n                        <th></th>\n                    </tr>\n                    <tr ng-repeat=\"row in vm.users | namesFilter:query track by row.id\">\n                        <td>\n                            <span>{{row.first_name + ' ' + row.last_name}}</span>\n                        </td>\n                        <td>\n                            <button class=\"btn\" ng-click=\"vm.updateOwnersList(row)\"\n                                                ng-class=\"[{'btn-primary': vm.owner_ids.indexOf(row.id) === -1,\n                                                            'btn-danger': vm.owner_ids.indexOf(row.id) !== -1}]\">\n                                {{vm.owner_ids.indexOf(row.id) === -1 ? 'Add as Owner' : 'Remove as Owner'}}\n                            </button>\n\n                        </td>\n                    </tr>\n                </table>\n            </div>\n            <div class=\"modal-footer\">\n                <div id=\"form-actions\">\n                    <button type=\"submit\" class='btn btn-primary' ng-click='vm.save()'>Submit</button>\n                    <button class='btn btn-primary' ng-click='vm.close()'> Close</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 74 */
/***/ (function(module, exports) {

var path = '/components/modals/newMemberModal/_newMemberModal.html';
var html = "<div id=\"newMemberModal\" class=\"modal\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\" ng-click=\"vm.cancel()\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">{{vm.updating === true ? 'Update Profile' : 'Add New Team Member'}}</h4>\n            </div>\n            <div class=\"modal-body\">\n                <ng-include src=\"vm.teamMemberForm\"></ng-include>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" ng-click=\"vm.cancel()\">Cancel</button>\n                <button type=\"button\" class=\"btn btn-primary\" ng-click=\"vm.save()\" ng-disabled=\"vm.disableSubmit\">Save</button>\n            </div>\n        </div>\n        <!-- /.modal-content -->\n        <flash-message class=\"modal-flash\" name=\"newmember-flash\"></flash-message>\n    </div>\n    <!-- /.modal-dialog -->\n</div>\n<!-- /.modal -->";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 75 */
/***/ (function(module, exports) {

var path = '/components/modals/AddRunToUser/_addRunToUser.html';
var html = "<div id=\"newMemberModal\" class=\"modal\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <button type=\"button\" class=\"close\" aria-label=\"Close\" ng-click=\"vm.cancel()\"><span aria-hidden=\"true\">&times;</span></button>\n                <h4 class=\"modal-title\">Add Run</h4>\n            </div>\n            <div class=\"modal-body\">\n                <form id=\"addRunToUserForm\" name=\"addRunToUserForm\" >\n                    <div class=\"form-group\">\n                        <label for=\"distance\">Distance</label>\n                        <input type=\"number\" class=\"form-control\" id=\"distance\" ng-model=\"vm.run.distance\" placeholder=\"Enter distance\" autofocus>\n                    </div>\n                    <div class=\"form-group\">\n                        <label for=\"run_date\">Date of Run</label>\n                        <p class='input-group'>\n                            <input uib-datepicker-popup type=\"text\" class=\"form-control\" id=\"run_date\"\n                                is-open=\"vm.cal_opened\"\n                                datepicker-options=\"vm.dateOptions\" \n                                ng-required=\"true\"\n                                ng-model=\"vm.run.run_date\" \n                                ng-click=\"vm.cal_opened = !vm.cal_opened\"\n                                placeholder=\"Select date\" />\n                            <span class=\"input-group-btn\">\n                                <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cal_opened = !vm.cal_opened\"><i class=\"fa fa-calendar\"></i></button>\n                            </span>\n                        </p>\n                    </div>\n                    <button type=\"button\" class=\"btn btn-default\" ng-click=\"vm.cancel()\">Cancel</button>\n                    <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"vm.save()\">Save</button>\n                </form>\n            </div>\n            <div class=\"modal-footer\">\n                \n            </div>\n        </div>\n        <!-- /.modal-content -->\n    </div>\n    <!-- /.modal-dialog -->\n</div>\n<!-- /.modal -->";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 76 */
/***/ (function(module, exports) {

var path = '/components/modals/CustomTabsModal/_createTabModal.html';
var html = "<div id=\"createTabModal\" class=\"modal\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-body createTab-container\">\n                <form id=\"createTabForm\" name=\"createTabForm\">\n                    <div class=\"cf-input\">\n                        <label for=\"tab_heading\">Tab Heading</label>\n                        <input id=\"tab_heading\" type=\"text\" name=\"tab_heading\" class=\"form-control\" ng-class=\"\" ng-model=\"vm.newTab.heading\" placeholder=\"Enter Tab Title\"\n                            required>\n                    </div>\n                    <label>Show Team Members with</label>\n                    <custom-filter index=\"\" filter-index=\"0\" object-type='team' field-change=\"vm.setFilterField\" comparator-change='vm.setComparator' value-change='vm.setValue' show-filter-field='true'></custom-filter>\n                    <div ng-show=\"vm.showSecondCondition === true\">\n                        <label>And</label>\n                        <custom-filter index=\"\" filter-index=\"1\" object-type='team' field-change=\"vm.setFilterField\" comparator-change='vm.setComparator'\n                            value-change='vm.setValue' show-filter-field='false'></custom-filter>\n                    </div>\n                    <span class=\"show-second-condition\" ng-click=\"vm.showSecondCondition = !vm.showSecondCondition\"><a>{{vm.showSecondCondition ? 'Do Not Use Second Condition -' : 'Add Second Condition +'}}</a></span>\n                </form>\n            </div>\n            <div class=\"modal-footer\">\n                <div id=\"form-actions\">\n                    <button type=\"submit\" class='btn btn-primary' ng-click='vm.save()' >Submit</button>\n                    <button class='btn btn-primary' ng-click='vm.cancel()'> Close</button>\n                </div>\n            </div>\n            <flash-message class=\"modal-flash\" name=\"createTab_flash\"></flash-message>\n        </div>\n        \n        <!-- /.modal-content -->\n    </div>\n    <!-- /.modal-dialog -->\n</div>\n<!-- /.modal -->";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 77 */
/***/ (function(module, exports) {

var path = '/components/modals/CustomTabsModal/_editTabModal.html';
var html = "<div id=\"editTabModal\" class=\"modal\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-header\">\n                <span>Edit Tabs</span>\n            </div>\n            <div class=\"modal-body createTab-container\">\n                <uib-accordion close-others=\"{{false}}\">\n                    <div uib-accordion-group class=\"panel-default\" heading=\"{{tab.heading}}\" \n                                                                   ng-repeat=\"tab in vm.tabs\">\n                        <custom-filter index=\"$index\" filter-index=\"0\" object-type=\"team\" field-change=\"vm.setFilterField\" \n                                                                 comparator-change=\"vm.setComparator\" \n                                                                 value-change=\"vm.setValue\"\n                                                                 initial-field=\"tab.custom_filters[0].filter_field\"\n                                                                 initial-comparator=\"tab.custom_filters[0].comparator\"\n                                                                 initial-value=\"tab.custom_filters[0].filter_value\"\n                                                                 show-filter-field=\"true\">\n                        </custom-filter>\n                        <custom-filter index=\"$index\" filter-index=\"1\" object-type=\"team\" ng-show=\"tab.showSecondCondition === true\"\n                                                                 field-change=\"vm.setFilterField\" \n                                                                 comparator-change=\"vm.setComparator\" \n                                                                 value-change=\"vm.setValue\"\n                                                                 initial-field=\"tab.custom_filters[1].filter_field\" \n                                                                 initial-comparator=\"tab.custom_filters[1].comparator\" \n                                                                 initial-value=\"tab.custom_filters[1].filter_value\"\n                                                                 show-filter-field=\"false\">\n                        </custom-filter>\n                        <span class=\"show-second-condition\" ng-click=\"tab.showSecondCondition = !tab.showSecondCondition\"><a>{{tab.showSecondCondition ? 'Do Not Use Second Condition -' : 'Add Second Condition +'}}</a></span>\n                        <button class=\"btn btn-primary\" ng-show=\"vm.delete_first_click === false\" ng-click=\"vm.delete_first_click = true\">Delete Tab</button>\n                        <button class=\"btn btn-danger\" ng-show=\"vm.delete_first_click === true\" ng-click=\"vm.deleteTab($index)\">Confirm Delete</button>\n                        <button class=\"btn btn-primary\" ng-show=\"vm.delete_first_click === true\" ng-click=\"vm.delete_first_click = false\">Cancel</button>\n                    </div>\n                </uib-accordion>\n                <div id=\"no-tabs-message\" ng-show=\"vm.tabs.length === 0\">\n                    <p>No Tabs Available to Edit</p>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <div id=\"form-actions\">\n                    <button type=\"submit\" class=\"btn btn-primary\" ng-click=\"vm.save()\" ng-disabled=\"vm.tabs.length === 0\">Save</button>\n                    <button class=\"btn btn-primary\" ng-click=\"vm.cancel()\"> Close</button>\n                </div>  \n            </div>\n            <flash-message class=\"modal-flash\" name=\"editTab_flash\"></flash-message>\n        </div>\n    </div>\n</div>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 78 */
/***/ (function(module, exports) {

var path = '/components/modals/UserProfileModal/_userProfileModal.html';
var html = "<div id=\"userProfileModal\" class=\"modal\" tabindex=\"-1\" role=\"dialog\">\n    <div class=\"modal-dialog\" role=\"document\">\n        <div class=\"modal-content\">\n            <div class=\"modal-body\">\n                <div id=\"userProfile\" class=\"row profile_modal\" ng-show=\"!vm.showNewMemberForm && !vm.showCreateTeamForm && !vm.showEditRunModal && !vm.showConfirmationDialog\">\n                    <div class=\"board-title\" class=\"col-sm-12\">\n                        <span>{{vm.user.first_name + ' ' + vm.user.last_name}}</span>\n                    </div>\n                    <section id=\"user-info\" class=\"col-sm-3\">\n                        <div id='profile_image'>\n                            <img ng-src=\"{{vm.profileImageSrc}}\" />\n                        </div>\n                        <span id=\"updateProfileButton\" class=\"btn btn-primary\" ng-click=\"vm.showNewMemberForm = true\" ng-show=\"vm.showUpdateProfileButton\">\n                            Update Profile\n                        </span>\n                        <uib-tabset>\n                            <uib-tab ng-repeat=\"tab in vm.tabs\" ng-click=\"vm.setTab($index)\" heading=\"{{tab.title}}\" ng-hide='tab.hidden'></uib-tab>\n                            <board class=\"small\" display-obj-data=\"vm.teams_board_display.displayObjData\" display-obj-config=\"vm.teams_board_display.displayConfig\" \n                                row-callback=\"vm.rowCallback\"></board>\n                        </uib-tabset>\n                    </section>\n                    <section id='user-runs-board' class=\"col-sm-9\">\n                        <board display-obj-data=\"vm.runs_board_display.displayObjData\" \n                                display-obj-config=\"vm.runs_board_display.displayConfig\" \n                                row-callback=\"[vm.showEditRunModalClick, vm.showDeleteRunConfirmation]\"\n                                 show-callback-conditions=\"vm.showCallbackConditions\">\n                    </section>\n                </div>\n                <div id=\"newMemberForm-container\" ng-show=\"vm.showNewMemberForm === true\" >\n                     <ng-include src=\"vm.newMemberForm\"></ng-include>\n                </div>\n                <div id=\"createTeamForm-container\" ng-show=\"vm.showCreateTeamForm\">\n                    <ng-include src=\"vm.createTeamForm\"></ng-include>\n                </div>\n                <div id=\"editRunForm-container\" ng-show=\"vm.showEditRunModal\">\n                    <ng-include src=\"vm.editRunForm\"></ng-include>\n                </div>\n                <div id=\"createTeamForm-container\" ng-show=\"vm.showConfirmationDialog\">\n                    <ng-include src=\"vm.confirmationModal\"></ng-include>\n                </div>\n            </div>\n            <div class=\"modal-footer\">\n                <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\" ng-click=\"vm.close()\">{{vm.showNewMemberForm || \n                                                                                                           vm.showCreateTeamForm || \n                                                                                                           vm.showEditRunModal || \n                                                                                                           vm.showConfirmationDialog ? 'Cancel' : 'Close'}}</button>\n                <button type=\"button\" class=\"btn btn-primary\" \n                                      ng-class=\"{'btn-danger' : vm.showConfirmationDialog === true}\" \n                                      ng-click=\"vm.save()\" \n                                      ng-show=\"vm.showNewMemberForm || \n                                               vm.showCreateTeamForm || \n                                               vm.showEditRunModal || \n                                               vm.showConfirmationDialog\">{{vm.showConfirmationDialog ? 'Confirm' : 'Save'}}</button>\n            </div>\n        </div>\n        <flash-message name=\"profile-modal-flash\" class=\"modal-flash\"></flash-message>\n    </div>\n</div>";
window.angular.module('milesBoard').run(['$templateCache', function(c) { c.put(path, html) }]);
module.exports = path;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _teams = __webpack_require__(1);

var _teams2 = _interopRequireDefault(_teams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
    'use strict';

    angular.module('milesBoard').component('teams', {
        templateUrl: _teams2.default,
        controller: 'TeamsController',
        bindings: {
            team: '<'
        }
    });
})();

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(81);

__webpack_require__(82);

__webpack_require__(83);

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').value('UsersDisplayConfig', {
        'objcode': 'USER',
        'paramName': 'userId',
        'headers': [{ text: 'id', hidden: true }, { text: 'Name', hidden: false }, { text: 'Team Distance', hidden: false }, { text: 'Team Run Count', hidden: false }],
        'showCallback': true,
        'rowCallbackText': ['Add Run', 'Profile']
    });
})();

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').controller('UsersController', UsersController);

    UsersController.$inject = ['$auth', '$filter', '$localStorage', '$scope', '$state', '$uibModal', 'Flash', 'MilesBoardApi', 'MilesBoardImages', 'owner', 'RunsDisplayConfig', 'TeamDisplayConfig', 'user', 'UsersDisplayConfig', 'Restangular'];

    function UsersController($auth, $filter, $localStorage, $scope, $state, $uibModal, Flash, MilesBoardApi, MilesBoardImages, owner, RunsDisplayConfig, TeamDisplayConfig, user, UsersDisplayConfig, Restangular) {
        var vm = this;
        var userTypes = {
            TEAM_OWNER: 'TeamOwner',
            USER: 'User'
        };

        vm.user = user.user ? user.user : MilesBoardApi.UsersApi.get($state.params['userId']);

        vm.loggedIn = $localStorage.user ? true : false;
        vm.profileImageSrc = MilesBoardImages.road_runner;
        vm.myProfile = vm.loggedIn && vm.user.id === $localStorage.user.id;

        vm.tabs = [{ title: 'Teams', hidden: false }, { title: 'Owned Teams', hidden: vm.user.type !== userTypes.TEAM_OWNER }];

        vm.$onInit = onInit;
        vm.setTab = setTab;
        vm.showCreateTeamModal = showCreateTeamModal;
        vm.showUpdateProfileModal = showUpdateProfileModal;
        vm.showEditRunModal = showEditRunModal;
        vm.showDeleteRunConfirmation = showDeleteRunConfirmation;

        function onInit() {
            if ($state.params['reset']) {
                var message = 'Password successfully reset!';
                Flash.create('success', message, 5000, { container: 'profile_flash' }, true);
            }

            if (vm.user.type === userTypes.TEAM_OWNER) {
                vm.user = owner.user;
            }

            vm.TeamDisplayConfig = TeamDisplayConfig;
            vm.RunsDisplayConfig = RunsDisplayConfig;

            for (var i = 0; i < vm.TeamDisplayConfig.headers.length; i++) {
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
            };

            vm.RunsDisplayConfig.showCallback = true;
            vm.RunsDisplayConfig.hideSearch = true;
            vm.runs_board_display = {
                displayObjData: buildDisplayObject(vm.user.runs, RunsDisplayConfig),
                displayConfig: RunsDisplayConfig,
                rowCallback: showEditRunModal
            };

            vm.showCreateTeamButton = getShowCreateTeamButton();
            // vm.displayObjData = buildDisplayObject(vm.user.teams, TeamDisplayConfig)
            // vm.displayConfig = TeamDisplayConfig;

            vm.setTab(0);
        }

        function setTab(index) {
            vm.tab = index;
            vm.showCreateTeamButton = getShowCreateTeamButton();
            var displayObjData = buildDisplayObject(vm.user.teams, TeamDisplayConfig);
            if (!vm.myProfile) {
                displayObjData = $filter('filter')(displayObjData, getValueForFiltering, sharedTeamComparator);
            }
            switch (index) {
                case 0:
                    //all teams user is on
                    vm.teams_board_display.displayObjData = displayObjData;
                    break;
                case 1:
                    //user owned teams
                    vm.teams_board_display.displayObjData = $filter('filter')(displayObjData, { team_owner_id: { text: vm.user.id } }, isTeamOwnerComparator);
                    break;
                default:
                    vm.tab = 0;
                    vm.teams_board_display.displayObjData = displayObjData;
                    break;
            }
        }

        function getShowCreateTeamButton() {
            return vm.loggedIn && vm.user.id === $localStorage.user.id && $localStorage.user.type === 'TeamOwner';
        }

        function buildDisplayObject(obj, config) {
            var displayObj = [];
            for (var j = 0; j < obj.length; j++) {
                var item = {};
                for (var i = 0; i < config.headers.length; i++) {
                    if (!item.hasOwnProperty(config.headers[i].text)) {
                        item[config.headers[i].text] = { text: '', hidden: false };
                    }

                    item[config.headers[i].text].text = obj[j][config.headers[i].text.toLowerCase().replace(/\s/g, '_')];
                    if (config.headers[i].text.toLowerCase().replace(/\s/g, '_') === 'run_date') {
                        var date = moment(item[config.headers[i].text].text);
                        item[config.headers[i].text].text = date.isValid() ? date.format('MMMM D, YYYY') : '--';
                    } else if (config.headers[i].text.toLowerCase().replace(/\s/g, '_') === 'team') {
                        item[config.headers[i].text].text = obj[j][config.headers[i].text.toLowerCase().replace(/\s/g, '_')].name;
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
            return value;
        }

        function isTeamOwnerComparator(actual, expected) {
            var inOwnerArr = false;
            for (var i = 0; i < vm.user.teams[i].length; i++) {
                if (vm.user.teams[i].id === expected.Team.id.text) {
                    if (vm.user.teams[i].owner_ids && vm.user.teams[i].owner_ids.indexOf(expected) !== -1) {
                        inOwnerArr = true;
                    }
                }
            }
            return parseInt(actual) === parseInt(expected) || inOwnerArr;
        }

        function sharedTeamComparator(actual, expected) {
            for (var i = 0; i < $localStorage.user.teams; i++) {
                if ($localStorage.user.teams[i] === actual) {
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
                scope: $scope
            });

            modalInstance.result.then(function (result) {
                var updates = {
                    run: {
                        run_date: result.date,
                        distance: result.distance,
                        user_id: vm.user.id,
                        team_id: result.team_id
                    }
                };

                MilesBoardApi.RunsApi.one('runs', result.id).customPUT(updates, result.id).then(function (response) {
                    for (var i = 0; i < vm.user.runs.length; i++) {
                        if (result.id === vm.user.runs[i].id) {
                            vm.user.runs[i].run_date = result.run_date;
                            vm.user.runs[i].distance = result.distance;
                            break;
                        }
                    }
                    vm.displayObjData = buildDisplayObject(vm.user.runs, RunsDisplayConfig);
                });
            }, function () {});
        }

        function showDeleteRunConfirmation(run) {
            $scope.editing_run = run;
            $scope.message = 'Delete this run?';
            $scope.messageObj = run.Distance.text + ' miles on ' + moment(run['Run Date']).format('MMMM D, YYYY') + ' with ' + run.Team.text;
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'modal-title',
                ariaDescribedBy: 'modal-body',
                templateUrl: 'components/modals/ConfirmationModal/_confirmationModal.html',
                controller: 'confirmationController',
                controllerAs: 'vm',
                size: 'md',
                backdrop: 'static',
                scope: $scope
            });

            modalInstance.result.then(function (result) {
                if (result === true) {
                    MilesBoardApi.remove('runs', run.id.text).then(function (resp) {
                        for (var i = 0; i < vm.user.runs.length; i++) {
                            if (vm.user.runs[i].id === parseInt(run.id.text)) {
                                vm.user.runs.splice(i, 1);
                                break;
                            }
                        }
                        vm.runs_board_display = {
                            displayObjData: buildDisplayObject(vm.user.runs, RunsDisplayConfig),
                            displayConfig: RunsDisplayConfig
                        };
                    });
                }
            }, function () {});
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
                if (result) {
                    MilesBoardApi.TeamsApi.post(result).then(function (response) {
                        vm.user.teams.push(result);
                        vm.displayObjData = buildDisplayObject(vm.user.teams, TeamDisplayConfig);
                        vm.displayConfig = TeamDisplayConfig;
                    }, function (response) {
                        console.error(response);
                    });
                }
            }, function () {});
        }

        function showUpdateProfileModal() {
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
                if (result) {
                    vm.user.imported_user_id = vm.user.id;

                    Restangular.all('update_imported_user').customPATCH(vm.user).then(function (response) {
                        var message = 'Account Successfully Updated!';
                        Flash.create('success', message, 5000, { container: 'index_flash' }, true);
                    }, function (error) {
                        var message = 'There were errors updating your accout:<br />';
                        message += MilesBoardImages.errorReader(error);
                        Flash.create('danger', messsage, 0, { container: 'index_flash' }, true);
                    });
                }
            });
        }
    }
})();

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


(function () {
    'use strict';

    angular.module('milesBoard').component('users', {
        templateUrl: '',
        controller: 'UsersController',
        controllerAs: 'vm',
        bindings: {
            user: '<'
        }
    });
})();

/***/ })
/******/ ]);