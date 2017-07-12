describe('UserProfileModalController', function () {
    let $controller, $httpBackend, $localStorage, $rootScope,
        MilesBoardApi, UsersApi, UserProfileModalController, stateparams, $uibModal, $q;

    let user = {
        "id": 464,
        "first_name": "Justin",
        "last_name": "Kruse",
        "email": "justin.p.kruse@gmail.com",
        "type": "TeamOwner",
        "teams": [
            {
                "id": 1,
                "name": "Next Goal Coaching",
                "team_owner_id": 464,
                "location": "Savage, MN",
                "contact_email": "coachkruser@gmail.com",
                "owner_ids": [464, 1]
            },
            {
                "id": 2,
                "name": "Mill City Running",
                "team_owner_id": 2,
                "location": "Minneapolis, MN",
                "contact_email": "info@millcityrunning.com"
            }],
        "runs": [
            {
                "id": 2,
                "distance": "5.0",
                "event": null,
                "user_id": 568,
                "team_id": 1,
                "run_date": "2017-07-09T16:50:33.832Z",
                "team": { "name": "Next Goal Coaching" }
            }
        ],
        "imported_user_data": []
    };

    const userTypes = {
        TEAM_OWNER: 'TeamOwner',
        USER: 'User'
    }
    // Load ui.router and our components.users module which we'll create next
    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('milesBoard'));

    // Inject the $controller service to create instances of the controller (UserProfileModalController) we want to test
    beforeEach(inject(function (_$controller_, _$rootScope_, _$localStorage_, _MilesBoardApi_, _RunsDisplayConfig_,
        _TeamDisplayConfig_, _UsersApi_, _$httpBackend_, _$uibModal_, _$q_) {
        $controller = _$controller_;
        MilesBoardApi = _MilesBoardApi_
        UsersApi = _UsersApi_
        $rootScope = _$rootScope_;
        RunsDisplayConfig = _RunsDisplayConfig_;
        TeamDisplayConfig = _TeamDisplayConfig_;
        stateparams = { userId: 464 };
        $httpBackend = _$httpBackend_;
        $localStorage = _$localStorage_;
        $uibModal = _$uibModal_;
        $q = _$q_;

        $localStorage.user = angular.merge({}, user);

        newscope = $rootScope.$new();
        newscope.user = {user: user};
        newscope.owner = {};
        UserProfileModalController = $controller('UserProfileModalController', {
            $scope: newscope,
            TeamDisplayConfig: TeamDisplayConfig,
            RunsDisplayConfig: RunsDisplayConfig
        });

        //spy and force the return value when setTab is called
        spyOn(UserProfileModalController, 'setTab').and.callThrough();
        //   spyOn($uibModal, 'open').and.callFake(function(){
        //     return $q(function(resolve, reject){
        //                 setTimeout(function(){ 
        //                     resolve({ name: 'new team', location: 'here', contact_email: 'test@test.com'}, 1);
        //             })
        //         });
        //     });

        UserProfileModalController.$onInit();
    }));



    //verify controller exists
    it('should be defined', function () {
        expect(UserProfileModalController).toBeDefined();
    });

    it('should initialize with vars: user, loggedIn, profileImageSrc, myProfile, tabs, showNewMemberForm', function () {
        expect(UserProfileModalController.user).toBeDefined();
        expect(UserProfileModalController.loggedIn).toBeDefined();
        expect(UserProfileModalController.profileImageSrc).toBeDefined();
        expect(UserProfileModalController.myProfile).toBeDefined();
        expect(UserProfileModalController.showNewMemberForm).toBeDefined();
        expect(UserProfileModalController.showNewMemberForm).toBeFalsy();
        expect(UserProfileModalController.showCreateTeamForm).toBeDefined();
        expect(UserProfileModalController.showCreateTeamForm).toBeFalsy();
    });

    it('should initialize with functions: $onInit, setTab', function () {
        expect(UserProfileModalController.$onInit).toBeDefined();
        expect(UserProfileModalController.$onInit instanceof Function).toBeTruthy();
        expect(UserProfileModalController.setTab).toBeDefined();
        expect(UserProfileModalController.setTab instanceof Function).toBeTruthy();
    });

    it('should initialize with tab set to 0', function () {
        expect(UserProfileModalController.setTab).toHaveBeenCalled();
        expect(UserProfileModalController.tab).toEqual(0);
    });

    it('should call getShowCreateTeamButton upon initialization', function () {
        //this is initialized by calling getShowCreateTeamButton()
        expect(UserProfileModalController.showCreateTeamButton).toBeDefined();
    });

    it('should initialize TeamDisplayConfig', function () {
        expect(UserProfileModalController.TeamDisplayConfig).toBeDefined();
        expect(UserProfileModalController.TeamDisplayConfig.showCallback).toBeFalsy();
        expect(UserProfileModalController.TeamDisplayConfig.hideSearch).toBeTruthy();
        expect(UserProfileModalController.TeamDisplayConfig.hideHeaderRow).toBeTruthy();
    });

    it('should build a board showing the users\' teams', function () {
        expect(UserProfileModalController.teams_board_display).toBeDefined();
        expect(UserProfileModalController.teams_board_display.displayObjData).toBeDefined();
        expect(UserProfileModalController.teams_board_display.displayConfig).toEqual(TeamDisplayConfig);
        expect(UserProfileModalController.teams_board_display.rowCallback).toBeNull();

        expect(UserProfileModalController.teams_board_display.displayObjData.length).toEqual(2);
        expect(UserProfileModalController.teams_board_display.displayObjData[0].id.text).toBe(1);
        expect(UserProfileModalController.teams_board_display.displayObjData[0].Name.text).toBe('Next Goal Coaching')
        expect(UserProfileModalController.teams_board_display.displayObjData[0].Location.text).toBe('Savage, MN');
        expect(UserProfileModalController.teams_board_display.displayObjData[0].Location.hidden).toBe(true);
        expect(UserProfileModalController.teams_board_display.displayObjData[0]['Contact Email'].text).toBe('coachkruser@gmail.com');
        expect(UserProfileModalController.teams_board_display.displayObjData[0]['Contact Email'].hidden).toBe(true);
    });

    it('should build a board showing the users\' runs', function () {
        expect(UserProfileModalController.runs_board_display).toBeDefined();
        expect(UserProfileModalController.runs_board_display.displayObjData).toBeDefined();
        expect(UserProfileModalController.runs_board_display.displayConfig).toEqual(RunsDisplayConfig);
        expect(UserProfileModalController.runs_board_display.rowCallback).toBeDefined();

        expect(UserProfileModalController.runs_board_display.displayObjData.length).toEqual(1);
        expect(UserProfileModalController.runs_board_display.displayObjData[0].id.text).toBe(2);
        expect(UserProfileModalController.runs_board_display.displayObjData[0].id.hidden).toBe(true);
        expect(UserProfileModalController.runs_board_display.displayObjData[0].Team.text).toBe('Next Goal Coaching')
        expect(parseInt(UserProfileModalController.runs_board_display.displayObjData[0].Distance.text)).toEqual(5);
        expect(UserProfileModalController.runs_board_display.displayObjData[0]['Run Date'].text).toBe('July 9, 2017');

    }); (

        it('should switch tabs and change the teams table', function () {
            UserProfileModalController.setTab(1);

            expect(UserProfileModalController.tab).toEqual(1);
            //results get filtered, so length should now be 1
            expect(UserProfileModalController.teams_board_display.displayObjData.length).toEqual(1);
            expect(UserProfileModalController.teams_board_display.displayObjData[0].id.text).toBe(1);
            expect(UserProfileModalController.teams_board_display.displayObjData[0].Name.text).toBe('Next Goal Coaching')
            expect(UserProfileModalController.teams_board_display.displayObjData[0].Location.text).toBe('Savage, MN');
            expect(UserProfileModalController.teams_board_display.displayObjData[0].Location.hidden).toBe(true);
            expect(UserProfileModalController.teams_board_display.displayObjData[0]['Contact Email'].text).toBe('coachkruser@gmail.com');
            expect(UserProfileModalController.teams_board_display.displayObjData[0]['Contact Email'].hidden).toBe(true);
        }));

    it('should set tab to 0 by default', function () {
        UserProfileModalController.setTab(117);
        expect(UserProfileModalController.tab).toEqual(0);
    });

    it('should show true for showCreateTeamButton', function () {
        expect(UserProfileModalController.showCreateTeamButton).toBeTruthy();
    });

    it('should show fals for showCreateTeamButton if state params user id and localstorage user id differ', function () {
        $localStorage.user.id = 117;
        UserProfileModalController.$onInit();
        expect(UserProfileModalController.showCreateTeamButton).toBeFalsy();
    });

    it('should show fals for showCreateTeamButton if user is not a team owner', function () {
        $localStorage.user.type = '';
        UserProfileModalController.$onInit();
        expect(UserProfileModalController.showCreateTeamButton).toBeFalsy();
    });

    it('should show fals for showCreateTeamButton if user is not logged in', function () {
        UserProfileModalController.loggedIn = false;
        UserProfileModalController.$onInit();
        expect(UserProfileModalController.showCreateTeamButton).toBeFalsy();
    });

    it('should create a new team', function () {
        //   UserProfileModalController.showCreateTeamModal();
    })
});