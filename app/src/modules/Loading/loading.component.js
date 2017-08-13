import template from './_loadingScreen.html'

(function(){
    'use strict';

    angular
        .module('loading')
        .component('loadingScreen',{
            templateUrl: template,
            controller: loaderController,
            controllerAs: 'vm'
        })

    loaderController.$inject = ['LoaderImageValue']

    function loaderController(LoaderImageValue) {
        let vm = this;
        vm.loaderSrc = LoaderImageValue;
    }
})();