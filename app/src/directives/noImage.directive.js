(function() {
    'use strict';

    angular
        .module('milesBoard')
        .directive('noImageSrc', noImage)

    noImage.$inject = ['$parse','settingsFactory'];

function noImage($parse, settingsFactory) {
        function setDefaultImage(el) {
            if(el) {
                el.attr('src', settingsFactory.noImageUrl)
            }
        }

        return {
            restrict: 'A',
            priority: 99,
            link: function($scope, el, attr) {
                $scope.$watch(function(){
                    return attr.ngSrc;
                }, function(){
                    let src = attr.ngSrc;

                    if(!src) {
                        setDefaultImage(el);
                    }
                });

                el.bind('error', function() { 
                    let cb = $parse(attr.noImageSrc);
                    if(el.attr('src') !== settingsFactory.noImageUrl) {
                        el.attr('src', settingsFactory.noImageUrl)
                        if(typeof cb === 'function') {
                            $scope.$apply(function(){
                                cb($scope)
                            })
                        }
                    }
                })
            }
        }
    }
})();