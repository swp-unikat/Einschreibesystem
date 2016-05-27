var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * 
 */
mainAppCtrls.controller('WorkshopListCtrl',['$scope','Workshops',
    function($scope,Workshops) {
        //TODO : replace with workshop details
        $scope.workshopList = Workshops.getAll();
    }
]);