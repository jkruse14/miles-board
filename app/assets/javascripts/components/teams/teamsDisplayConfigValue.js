angular
    .module('milesBoard')
    .value('TeamsDisplayConfig',{
        'objcode': 'TEAM',
        'paramName': 'team_id',
        'headers': [{text:'id',hidden:true},
                    {text:'name', hidden:false, uiSref:'team'}, 
                    {text:'location', hidden: false},
                    {text:'contact email', hidden:false}],
        'title': 'Teams',
        'rowCallbackText':'Add Run',
        'showCallback': true
    });