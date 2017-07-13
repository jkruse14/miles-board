(function(){
    'use strict';

    angular
        .module('milesBoard')
        .component('editableField', {
            templateUrl: 'components/editableField/_editableField.html',
            controller: 'EditableFieldController',
            bindings: {
                fieldValue: '<',
                fieldType: '@?',
                onUpdate: '&'
            }
        })
})();