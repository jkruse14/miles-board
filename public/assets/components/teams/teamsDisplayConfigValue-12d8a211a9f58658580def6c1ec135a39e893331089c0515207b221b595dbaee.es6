angular
    .module('milesBoard')
    .value('TeamsDisplayConfig', {
        'objcode': 'TEAM',
        'paramName': 'team_id',
        'headers': [{ text: 'id', hidden: true },
                    { text: 'Name', hidden: false, uiSref: 'team' },
                    { text: 'Location', hidden: false },
                    { text: 'Contact Email', hidden: false }],
        'title': 'Teams',
        'rowCallbackText': 'Join Team',
        'showCallback': true
    });
