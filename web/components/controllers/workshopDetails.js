/**
 * Created by Ahmet on 31.05.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
mainAppCtrls.controller('WorkshopDetailsCtrl',['$scope','Workshops', '$stateParams', "$alert",
    function($scope,Workshops,$stateParams, $alert) {
        //TODO : replace with workshop details
        var workshopid;
        $scope.sendInfo= function(){
            var first_name=$scope.first_name;   
            var last_name=$scope.last_name;
            var email=$scope.e_mail;

            if(!email.$valid){
              alert("testiii");
            }
            if(!first_name){

            }
            if(!last_name){

            }
        };

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