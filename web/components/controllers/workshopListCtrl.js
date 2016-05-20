var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * 
 */
mainAppCtrls.controller('WorkshopListCtrl',['$scope',
    function($scope) {
        //List of panels that are available.
        //TODO : replace with workshop details
        $scope.panels = [
            { title:'Panel 1', body: 'Body 1'},
            { title:'Panel 2',body: 'Body 2'}
        ];
    }

]);