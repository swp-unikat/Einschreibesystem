var mainAppCtrls = angular.module("mainAppCtrls");
/**
 *
 */
//TODO: if /dashboard is called, change hideDashboard to false
mainAppCtrls.controller('DashboardCtrl',['$scope','UIHelper',
    function($scope,UIHelper) {
        UIHelper.HideUserUI();
    }

]);
