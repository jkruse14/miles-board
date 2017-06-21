angular
    .module('milesBoard')
    .component('milesHeader',{
        templateUrl:'components/header/_header.html',
        controller: HeaderController,
        controllerAs: 'vm'
    });

    HeaderController.$inject = ['$localStorage']

function HeaderController($localStorage) {
    var ctrl = this;
    ctrl.isNavCollapsed = false;

    ctrl.nav = [
        { uiSref : 'home', display: 'Home' },
        { uiSref : 'teams', display: 'Teams' },
    ]
}