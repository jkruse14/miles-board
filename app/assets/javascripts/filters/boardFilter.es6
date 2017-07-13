(function(){
    'use strict';

    angular
        .module('milesBoard')
        .filter('boardFilter',function(){
            return boardFilter;
        });

        boardFilter.$inject = ['items', 'filter'];

        function boardFilter(items, filter) {
            let filtered = [];
            let keys = Object.keys(items);
            for (let i = 0; i < keys.length; i++) {
                let item = items[keys[i]];
                switch(filter.comparator) {
                    case 'lt':
                        if(item[filter.filter_field].text < parseInt(filter.filter_value)) {
                            filtered.push(item);
                        }
                        break;
                    case 'lte':
                        if (item[filter.filter_field].text <= parseInt(filter.filter_value)) {
                            filtered.push(item);
                        }
                        break;
                    case 'gt':
                        if (item[filter.filter_field].text > parseInt(filter.filter_value)) {
                            filtered.push(item);
                        }
                        break;
                    case 'gte':
                        if (item[filter.filter_field].text >= parseInt(filter.filter_value)) {
                            filtered.push(item);
                        }
                        break;
                    case 'eq':
                        if (item[filter.filter_field].text == parseInt(filter.filter_value)) {
                            filtered.push(item);
                        }
                        break;
                }
            }

            return filtered;
        }
})();