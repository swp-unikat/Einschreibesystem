var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * 
 */
mainAppCtrls.controller('WorkshopListCtrl',['$scope','Workshops',
    function($scope,Workshops) {
        //TODO : replace with workshop details
        $scope.loading = true;
        Workshops.getAll().$promise.then(function(value,httpResponse){
            $scope.workshopList = value;
            $scope.loading = false;
        },function(httpResponse) {
            alert(httpResponse.status + '');
            $scope.loading = false;
        });

    }
]);