(function(){
    'use strict';

    angular
        .module('loading')
        .factory('LoaderImageValue', LoaderImageValue)
        
        LoaderImageValue.$inject = [];

        function LoaderImageValue(){
            return '<%= image_path("loader.gif") %>'
        }
})();