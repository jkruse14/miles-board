(function(){
    'use strict';

    angular
        .module('milesBoard')
        .filter('namesFilter', function() {
            return namesFilter;
        });

    namesFilter.$inject = [];

    function namesFilter(items, inp) {
        let filtered = [];
        let keys = Object.keys(items)
        for(let i = 0; i < keys.length; i++){
            let item = items[keys[i]];
            let query = new RegExp(inp, 'i');
            if(inp === undefined || item['Name'] && query.test(item['Name'].text.substring(0))) {
                filtered.push(item);
            }
        }
        
        return filtered;
    }
})();