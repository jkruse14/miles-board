(function(){
    'use strict';

    angular
        .module('milesBoard')
        .service('MilesBoardApi', MilesBoardApi);

    MilesBoardApi.$inject = [];

    function MilesBoardApi() {
        let self = this;

        self.errorReader = errorReader;

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

        return self;
    }
})();