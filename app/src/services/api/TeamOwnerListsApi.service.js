(function() {
    'use strict';

    angular
        .module('milesBoard')
        .factory('TeamOwnerListsApi', TeamOwnerListsApi);

    TeamOwnerListsApi.$inject = ['Restangular'];

    function TeamOwnerListsApi(Restangular) {
        let self = Restangular.service('team_owner_lists');
        self.updateOwners = updateOwners;

        function updateOwners(list) {
            return Restangular.all('team_owner_lists/update_owners').customPOST(list);
        }
        return self;
    }
})();