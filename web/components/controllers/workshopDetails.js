/**
 * Created by Ahmet on 31.05.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
mainAppCtrls.controller('WorkshopDetailsCtrl',['$scope','Workshops', '$stateParams', "$alert",
    function($scope,Workshops,$stateParams, $alert) {
        //TODO : replace with workshop details
        var workshopid = $stateParams.id;
        $scope.sendInfo= function(){
            var first_name=$scope.first_name;   
            var last_name=$scope.last_name;
            var _email=$scope.e_mail;

            //check if input is valid
            var _data = {
              //URL-Params  
              id: workshopid,
              //Data to be send  
              name: first_name,
              surname: last_name,
              email:   _email
            };
            Workshops.enroll(_data).$promise.then(function(value,httpResponse){
                $alert({
                    title: 'Success',
                    type: 'success',
                    content: 'Enrollment successful. Please check your E-Mail!',
                    container: '#alertEnroll',
                    dismissable: true,
                    duration: 10,
                    show: true
                });
            },function(httpResponse){
                $alert({

                    title: 'Error',
                    type: 'danger',
                    content: 'success',
                    container: '#alertEnroll',
                    dismissable: true,
                    duration: 10,
                    show: true
                });
            });
        };


        $scope.loading = true;
        Workshops.get({id: workshopid}).$promise.then(function(value,httpResponse){
            $scope.workshop = value;

            $scope.loading = false;
        },function(httpResponse) {
            alert(httpResponse.status + '');
            $scope.loading = false;
        });
        Workshops.getParticipants({id: workshopid}).$promise.then(function(value,httpResponse){
            $scope.participants = value;

            $scope.loading = false;
        },function(httpResponse) {
            alert('Participants: ' +httpResponse.status + '');
            $scope.loading = false;
        });

    }
]);