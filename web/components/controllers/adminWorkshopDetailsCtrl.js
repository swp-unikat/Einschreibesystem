/**
 * Created by Ahmet on 08.06.2016.
 */

var mainAppCtrls = angular.module("mainAppCtrls");
mainAppCtrls.controller('WorkshopDetailsCtrl',['$scope','Workshops', '$stateParams', "$alert",
    function($scope,Workshops,$stateParams, $alert) {
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
])