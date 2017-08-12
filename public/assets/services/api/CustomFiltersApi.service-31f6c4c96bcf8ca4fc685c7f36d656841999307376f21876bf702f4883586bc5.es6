(function(){
    'use strict';

    angular
        .module('milesBoard')
        .factory('CustomFiltersApi', CustomFiltersApi);

    CustomFiltersApi.$inject = ['Restangular'];

    function CustomFiltersApi(Restangular) {
        return Restangular.service('custom_filters');
    }
})();
