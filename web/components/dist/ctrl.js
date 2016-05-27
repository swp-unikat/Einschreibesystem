'use strict';
var mainAppCtrls = angular.module("mainAppCtrls");
// Source: web/components/controllers/dashboardCtrl.js

/**
 *
 */
//TODO: if /dashboard is called, change hideDashboard to false
mainAppCtrls.controller('DashboardCtrl',['$scope',
    function($scope) {
        $scope.hideDashboard = false;
    }

]);


// Source: web/components/controllers/blacklistCtrl.js

/**
 *
 */
//TODO: When /dashboard/blacklist is called, change hideDashboard to true
mainAppCtrls.controller('BlacklistCtrl',['$scope',
    function($scope) {
        $scope.hideDashboard = true;
    }

]);

// Source: web/components/controllers/workshopListCtrl.js

/**
 * 
 */
mainAppCtrls.controller('WorkshopListCtrl',['$scope','Workshops',
    function($scope,Workshops) {
        //TODO : replace with workshop details
        $scope.workshopList.$promise =  Workshops.getAll();
    }

]);