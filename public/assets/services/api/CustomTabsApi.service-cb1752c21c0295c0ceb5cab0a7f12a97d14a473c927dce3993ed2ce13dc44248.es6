(function(){
    'use strict';

    angular
        .module('milesBoard')
        .factory('CustomTabsApi', CustomTabsApi);

        CustomTabsApi.$inject = ['Restangular'];

        function CustomTabsApi(Restangular) {
            return Restangular.service('custom_tabs');
        }

})();
