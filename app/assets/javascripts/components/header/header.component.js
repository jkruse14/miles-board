angular
    .module('milesBoard')
    .component('milesHeader',{
        templateUrl:'components/header/_header.html',
        controller: HeaderController
    });

function HeaderController() {
    var ctrl = this;
    ctrl.nav = [
        { uiSref : 'home', display: 'Home' },
        { uiSref : 'teams', display: 'Teams' },
    ]
}