(function(){
    'use strict';

    angular
        .module('milesBoard')
        .service('MilesBoardApi', MilesBoardApi);

    MilesBoardApi.$inject = ['CustomFiltersApi', 'CustomTabsApi', 'Restangular', 'RunsApi', 
                             'TeamsApi','TeamMemberListsApi', 'TeamOwnersApi', 'TeamOwnerListsApi', 'UsersApi' ];

    function MilesBoardApi(CustomFiltersApi, CustomTabsApi, Restangular, RunsApi, 
                           TeamsApi, TeamMemberListsApi,TeamOwnersApi, TeamOwnerListsApi, UsersApi) {
        let self = this;

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
            const keys = Object.keys(errors);
            let message = '<br />'
            for(let i = 0; i < keys.length; i++) {
                let error = errors[keys[i]];
                message += keys[i] + ': <ul>';
                for( let j = 0; j < error.length; j++) {
                    message += '<li>'+error[i]+'</li>'
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