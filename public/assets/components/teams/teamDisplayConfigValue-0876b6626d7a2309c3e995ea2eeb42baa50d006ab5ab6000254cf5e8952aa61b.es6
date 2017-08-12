angular
    .module('milesBoard')
    .value('TeamDisplayConfig',{
        'objcode': 'TEAM',
        'paramName': 'team_id',
        'headers': [{text:'id',hidden:true},
                    {text: 'team_owner_id', hidden:true},
                    {text:'Name', hidden:false, uiSref:'team'}, 
                    {text:'Location', hidden: false},
                    {text:'Contact Email', hidden:false}],
        'title': 'Teams',
        'rowCallbackText':'Add Run',
        'showCallback': true
    });
