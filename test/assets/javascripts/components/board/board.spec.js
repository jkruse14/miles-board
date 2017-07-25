describe('Board Controller', function(){
    var BoardController, $controller, $localStorage, $rootScope, TeamDisplayConfig;
    
    beforeEach(angular.mock.module('milesBoard'));

    beforeEach(inject(function (_$controller_, _$localStorage_, _$rootScope_, _TeamDisplayConfig_){
        $controller = _$controller_;
        $localStorage = _$localStorage_;
        $localStorage.user = null;
        

        function cb1(){return}
        function cb2() { return }

        BoardController = $controller('BoardController', {
            $scope : _$rootScope_.$new(),
            rowCallback: [cb1, cb2],
        });

        BoardController.$onInit()
    }));

    it('should intiailize max page size to 50', function(){
        expect(BoardController.maxPageSize).toBeDefined();
        expect(BoardController.maxPageSize).toEqual(50);
    });

    it('should intiailize max size to 10 (pagination buttons)', function () {
        expect(BoardController.maxSize).toBeDefined();
        expect(BoardController.maxSize).toEqual(10);
    });

    it('should intiailize current page to 1', function () {
        expect(BoardController.currentPage).toBeDefined();
        expect(BoardController.currentPage).toEqual(1);
    });

    it('should not showActions or set loggedInUser if no user is in $localStorage', function(){
        expect(BoardController.showActions).toBeFalsy();
        expect(BoardController.loggedInUser).toBeFalsy();
    });

    it('should showActions and set loggedInUserId if a user is in $localStorage', function () {
        $localStorage.user = {id: 1};
        BoardController.$onInit();

        expect(BoardController.showActions).toBeTruthy();
        expect(BoardController.loggedInUserId).toBeTruthy();
    });

    it('should default ordering to Name column and ASC', function(){
        expect(BoardController.ordering).toBeDefined();
        expect(BoardController.ordering.col).toEqual('Name');
        expect(BoardController.ordering.dir).toEqual('asc');
    });

});