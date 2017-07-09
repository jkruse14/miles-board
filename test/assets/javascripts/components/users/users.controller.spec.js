describe('UsersController', function() {
    let $controller, UsersController, $rootScope, MilesBoardApi, UsersApi

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
                            }], 
                        "runs": [], 
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
    beforeEach(inject(function(_$controller_, _$rootScope_, _MilesBoardApi_, _RunsDisplayConfig_, _TeamDisplayConfig_, _UsersApi_, ){
          $controller = _$controller_;
          MilesBoardApi = _MilesBoardApi_
          UsersApi = _UsersApi_
          $rootScope = _$rootScope_;
          RunsDisplayConfig = _RunsDisplayConfig_;
          TeamDisplayConfig = _TeamDisplayConfig_;
          
          UsersController = $controller('UsersController', { 
             $scope: $rootScope.$new(), 
            user: { user: user}, 
            TeamDisplayConfig: TeamDisplayConfig});
          
          //spy and force the return value when setTab is called
          spyOn(UsersController, 'setTab').and.callThrough();

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

      it('should initialize with functions: $onInit, setTab, showCreateTeamModal, showUpdateEmailModal, resetPassword', function() {
          expect(UsersController.$onInit).toBeDefined();
          expect(UsersController.$onInit instanceof Function).toBeTruthy();
          expect(UsersController.setTab).toBeDefined();
          expect(UsersController.setTab instanceof Function).toBeTruthy();
          expect(UsersController.showCreateTeamModal).toBeDefined();
          expect(UsersController.showCreateTeamModal instanceof Function).toBeTruthy();
          expect(UsersController.showUpdateEmailModal).toBeDefined();
          expect(UsersController.showUpdateEmailModal instanceof Function).toBeTruthy();
          expect(UsersController.resetPassword).toBeDefined();
          expect(UsersController.resetPassword instanceof Function).toBeTruthy();
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

          expect(UsersController.teams_board_display.displayObjData.length).toEqual(1);
          expect(UsersController.teams_board_display.displayObjData[0].id.text).toBe(1);
          expect(UsersController.teams_board_display.displayObjData[0].Name.text).toBe('Next Goal Coaching')
          expect(UsersController.teams_board_display.displayObjData[0].Location.text).toBe('Savage, MN');
          expect(UsersController.teams_board_display.displayObjData[0].Location.hidden).toBe(true);
          expect(UsersController.teams_board_display.displayObjData[0]['Contact Email'].text).toBe('coachkruser@gmail.com');
          expect(UsersController.teams_board_display.displayObjData[0]['Contact Email'].hidden).toBe(true);
      })
});