(function() {
    'use strict';

    angular
        .module('milesBoard')
        .controller('MainController',MainController);

    MainController.$inject = []

    function MainController() {
        let vm = this;

        vm.$onInit = onInit;

        function onInit() {
        }
    }
})();