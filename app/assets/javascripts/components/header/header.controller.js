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