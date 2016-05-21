var mainAppCtrls = angular.module("mainAppCtrls");
/**
 *
 */
//TODO: if /dashboard is called, change hideDashboard to false
mainAppCtrls.controller('DashboardCtrl',['$scope',
    function($scope) {
        $scope.hideDashboard = false;
    }

]);
