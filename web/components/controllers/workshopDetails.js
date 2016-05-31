/**
 * Created by Ahmet on 31.05.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
mainAppCtrls.controller('WorkshopDetailsCtrl',['$scope','Workshops', '$stateParams',
    function($scope,Workshops,$stateParams) {
        //TODO : replace with workshop details
        var workshopid;
        workshopid = $stateParams.id;
        $scope.loading = true;
        Workshops.get({id: workshopid}).$promise.then(function(value,httpResponse){
            $scope.workshop = value;

            $scope.loading = false;
        },function(httpResponse) {
            alert(httpResponse.status + '');
            $scope.loading = false;
        });

    }
]);