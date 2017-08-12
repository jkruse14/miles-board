(function(){
    'use strict';

    angular
        .module('milesBoard')
        .factory('InvitationCodesApi', InvitationCodesApi);

    InvitationCodesApi.$inject = ['Restangular'];

    function InvitationCodesApi(Restangular) {
        return Restangular.service('invitation_codes');
    }
})();
