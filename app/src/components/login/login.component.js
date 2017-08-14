import loginTmpl from './_login.html';

(function(){
    'user strict';

    angular
        .module('milesBoard')
        .component('login', {
            templateUrl: loginTmpl,
            controller: 'LoginController',
            bindings: {
                
            }
        });

})();