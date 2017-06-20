(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('AlphaController', AlphaController);

    AlphaController.$inject = ['$window'];

    function AlphaController($window) {
        let vm = this;

        vm.hideNav = $window.location.hash === '#/login' ? true : false;
    }
})();