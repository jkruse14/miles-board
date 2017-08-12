(function(){
    'use strict';

    angular
        .module('milesBoard')
        .directive( 'elementReady', ['$parse',function( $parse ) {
            return {
                restrict: 'A',
                priority: 1,
                link: function( $scope, elem, attrs ) {
                    elem.ready(function(){
                        $scope.$apply(function(){
                            let cb = $parse(attrs.elementReady);
                            cb($scope);
                        })
                    })
                }
            }
        }])
})();