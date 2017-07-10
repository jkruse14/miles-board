describe('UsersController', function() {
    let $controller, $httpBackend, $localStorage, $rootScope, 
        MilesBoardApi, UsersApi, UsersController, stateparams, $uibModal, $q;

    let user =  { 
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
                                "contact_email": "coachkruser@gmail.com" 
                            },
                            {
                                "id": 2,
                                "name": "Mill City Running",
                                "team_owner_id": 2,
                                "location": "Minneapolis, MN",
                                "contact_email": "info@millcityrunning.com"
                            }], 
                        "runs":[
                                {
                                    "id":2,
                                    "distance":"5.0",
                                    "event":null,
                                    "user_id":568,
                                    "team_id":1,
                                    "run_date":"2017-07-09T16:50:33.832Z",
                                    "team":{"name":"Next Goal Coaching"}
                                }
                            ], 
                        "imported_user_data": [] 
                    } ;

    const userTypes = {
        TEAM_OWNER: 'TeamOwner',
        USER: 'User'
    }
    // Load ui.router and our components.users module which we'll create next
    beforeEach(angular.mock.module('ui.router'));
    beforeEach(angular.mock.module('milesBoard'));

      // Inject the $controller service to create instances of the controller (UsersController) we want to test
    beforeEach(inject(function(_$controller_, _$rootScope_, _$localStorage_, _MilesBoardApi_, _RunsDisplayConfig_, 
                               _TeamDisplayConfig_, _UsersApi_, _$httpBackend_, _$uibModal_, _$q_ ){
          $controller = _$controller_;
          MilesBoardApi = _MilesBoardApi_
          UsersApi = _UsersApi_
          $rootScope = _$rootScope_;
          RunsDisplayConfig = _RunsDisplayConfig_;
          TeamDisplayConfig = _TeamDisplayConfig_;
          stateparams = {userId: 464};
          $httpBackend = _$httpBackend_;
          $localStorage = _$localStorage_;
          $uibModal = _$uibModal_;
          $q = _$q_;

          $localStorage.user = angular.merge({},user);
          
          UsersController = $controller('UsersController', { 
             $scope: $rootScope.$new(), 
            user: { user: user}, 
            TeamDisplayConfig: TeamDisplayConfig,
            RunsDisplayConfig: RunsDisplayConfig
        });
          
          //spy and force the return value when setTab is called
          spyOn(UsersController, 'setTab').and.callThrough();
        //   spyOn($uibModal, 'open').and.callFake(function(){
        //     return $q(function(resolve, reject){
        //                 setTimeout(function(){ 
        //                     resolve({ name: 'new team', location: 'here', contact_email: 'test@test.com'}, 1);
        //             })
        //         });
        //     });

          UsersController.$onInit();
      }));

     

      //verify controller exists
      it('should be defined', function(){
          expect(UsersController).toBeDefined();
      });

      it('should initialize with vars: user, loggedIn, profileImageSrc, myProfile, tabs', function(){
        expect(UsersController.user).toBeDefined();
        expect(UsersController.loggedIn).toBeDefined();
        expect(UsersController.profileImageSrc).toBeDefined();
        expect(UsersController.myProfile).toBeDefined();
      });

      it('should initialize with functions: $onInit, setTab, showCreateTeamModal, showUpdateEmailModal', function() {
          expect(UsersController.$onInit).toBeDefined();
          expect(UsersController.$onInit instanceof Function).toBeTruthy();
          expect(UsersController.setTab).toBeDefined();
          expect(UsersController.setTab instanceof Function).toBeTruthy();
          expect(UsersController.showCreateTeamModal).toBeDefined();
          expect(UsersController.showCreateTeamModal instanceof Function).toBeTruthy();
          expect(UsersController.showUpdateEmailModal).toBeDefined();
          expect(UsersController.showUpdateEmailModal instanceof Function).toBeTruthy();
      });

      it('should initialize with tab set to 0',function(){
          expect(UsersController.setTab).toHaveBeenCalled();
          expect(UsersController.tab).toEqual(0);
      });

      it('should call getShowCreateTeamButton upon initialization', function(){
          //this is initialized by calling getShowCreateTeamButton()
          expect(UsersController.showCreateTeamButton).toBeDefined();
      });

      it('should initialize TeamDisplayConfig', function() {
          expect(UsersController.TeamDisplayConfig).toBeDefined();
          expect(UsersController.TeamDisplayConfig.showCallback).toBeFalsy();
          expect(UsersController.TeamDisplayConfig.hideSearch).toBeTruthy();
          expect(UsersController.TeamDisplayConfig.hideHeaderRow).toBeTruthy();
      });

      it('should build a board showing the users\' teams', function() {
          expect(UsersController.teams_board_display).toBeDefined();
          expect(UsersController.teams_board_display.displayObjData).toBeDefined();
          expect(UsersController.teams_board_display.displayConfig).toEqual(TeamDisplayConfig);
          expect(UsersController.teams_board_display.rowCallback).toBeNull();

          expect(UsersController.teams_board_display.displayObjData.length).toEqual(2);
          expect(UsersController.teams_board_display.displayObjData[0].id.text).toBe(1);
          expect(UsersController.teams_board_display.displayObjData[0].Name.text).toBe('Next Goal Coaching')
          expect(UsersController.teams_board_display.displayObjData[0].Location.text).toBe('Savage, MN');
          expect(UsersController.teams_board_display.displayObjData[0].Location.hidden).toBe(true);
          expect(UsersController.teams_board_display.displayObjData[0]['Contact Email'].text).toBe('coachkruser@gmail.com');
          expect(UsersController.teams_board_display.displayObjData[0]['Contact Email'].hidden).toBe(true);
      });

      it('should build a board showing the users\' runs', function () {
          expect(UsersController.runs_board_display).toBeDefined();
          expect(UsersController.runs_board_display.displayObjData).toBeDefined();
          expect(UsersController.runs_board_display.displayConfig).toEqual(RunsDisplayConfig);
          expect(UsersController.runs_board_display.rowCallback).toBeDefined();

          expect(UsersController.runs_board_display.displayObjData.length).toEqual(1);
          expect(UsersController.runs_board_display.displayObjData[0].id.text).toBe(2);
          expect(UsersController.runs_board_display.displayObjData[0].id.hidden).toBe(true);
          expect(UsersController.runs_board_display.displayObjData[0].Team.text).toBe('Next Goal Coaching')
          expect(parseInt(UsersController.runs_board_display.displayObjData[0].Distance.text)).toEqual(5);
          expect(UsersController.runs_board_display.displayObjData[0]['Run Date'].text).toBe('July 9, 2017');
          
      });(

      it('should switch tabs and change the teams table', function() {
          UsersController.setTab(1);

          expect(UsersController.tab).toEqual(1);
          //results get filtered, so length should now be 1
          expect(UsersController.teams_board_display.displayObjData.length).toEqual(1);
          expect(UsersController.teams_board_display.displayObjData[0].id.text).toBe(1);
          expect(UsersController.teams_board_display.displayObjData[0].Name.text).toBe('Next Goal Coaching')
          expect(UsersController.teams_board_display.displayObjData[0].Location.text).toBe('Savage, MN');
          expect(UsersController.teams_board_display.displayObjData[0].Location.hidden).toBe(true);
          expect(UsersController.teams_board_display.displayObjData[0]['Contact Email'].text).toBe('coachkruser@gmail.com');
          expect(UsersController.teams_board_display.displayObjData[0]['Contact Email'].hidden).toBe(true);
      }));

      it('should set tab to 0 by default', function() {
          UsersController.setTab(117);
          expect(UsersController.tab).toEqual(0);
      });

      it('should show true for showCreateTeamButton', function() {
          expect(UsersController.showCreateTeamButton).toBeTruthy();
      });

      it('should show fals for showCreateTeamButton if state params user id and localstorage user id differ', function(){
        $localStorage.user.id = 117;
        UsersController.$onInit();
        expect(UsersController.showCreateTeamButton).toBeFalsy();
      });

      it('should show fals for showCreateTeamButton if user is not a team owner', function () {
          $localStorage.user.type = '';
          UsersController.$onInit();
          expect(UsersController.showCreateTeamButton).toBeFalsy();
      });

      it('should show fals for showCreateTeamButton if user is not logged in', function () {
          UsersController.loggedIn = false;
          UsersController.$onInit();
          expect(UsersController.showCreateTeamButton).toBeFalsy();
      });

      it('should create a new team', function(){
        //   UsersController.showCreateTeamModal();
      })
});