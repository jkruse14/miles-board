(function(){
    'use strict';

    angular
    .module('milesBoard')
    .value('UsersDisplayConfig', {
        'objcode': 'USER',
        'paramName': 'userId',
        'headers': [{text: 'id', hidden: true},
                    {text: 'Name', hidden: false}, 
                    {text: 'Team Distance', hidden: false}, 
                    {text: 'Team Run Count', hidden: false}],
        'showCallback':true,
        'rowCallbackText': ['Add Run', 'Profile']
    });
})();