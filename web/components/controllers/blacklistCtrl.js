var mainAppCtrls = angular.module("mainAppCtrls");
/**
 *
 */
//TODO: When /dashboard/blacklist is called, change hideDashboard to true
mainAppCtrls.controller('BlacklistCtrl',['$scope',
    function($scope) {
        $scope.hideDashboard = true;
    }

]);