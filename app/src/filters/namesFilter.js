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
        if(items){
            let keys = Object.keys(items);
            for(let i = 0; i < keys.length; i++){
                let item = items[keys[i]];
                let query = new RegExp(inp, 'i');
                let text_to_test = item['Name'] ? item['Name'].text : item.first_name + ' ' + item.last_name;
                if (inp === undefined || text_to_test && query.test(text_to_test.substring(0))) {
                    filtered.push(item);
                }
            }
        } 
        return filtered;
    }
})();