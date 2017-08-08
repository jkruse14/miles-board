(function(){
    'use strict';

    angular
        .module('milesBoard')
        .controller('confirmationController', confirmationController)

        confirmationController.$inject = ['$scope', '$uibModalInstance'];

        function confirmationController($scope, $uibModalInstance) {
            let vm = this;
            vm.message = $scope.message;
            vm.messageObj = $scope.messageObj;
            vm.showFooter = true;

            vm.close = close;

            function close(ans){
                $uibModalInstance.close(ans)
            }
        }
})();