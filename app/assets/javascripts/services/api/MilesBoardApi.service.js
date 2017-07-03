(function(){
    'use strict';

    angular
        .module('milesBoard')
        .service('MilesBoardApi', MilesBoardApi);

    MilesBoardApi.$inject = ['CustomFiltersApi','CustomTabsApi', 'Restangular', 'RunsApi', 'TeamsApi', 'UsersApi' ];

    function MilesBoardApi(CustomFiltersApi, CustomTabsApi, Restangular, RunsApi, TeamsApi, UsersApi) {
        let self = this;

        self.CustomFiltersApi = CustomFiltersApi;
        self.CustomTabsApi = CustomTabsApi;
        self.RunsApi = RunsApi;
        self.TeamsApi = TeamsApi;
        self.UsersApi = UsersApi;
        
        self.errorReader = errorReader;
        self.put = put;

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
            return Restangular.all(obj_type).customPUT(obj);
        }

        return self;
    }
})();