(function(){
    'use strict';
    
    angular
    .module('milesBoard')
    .value('RunsDisplayConfig', {
        'objcode': 'RUN',
        'paramName': 'runId',
        "headers": [{text:'id', hidden:true},
                    {text:'Run Date', hidden:false} , 
                    {text:'Distance', hidden:false}, 
                    {text:'Team', hidden:false, uiSref:'team'},
                    {text: 'team id', hidden: true}],
        'rowCallbackText': 'Edit Run'
    });
})();
