//TODO Internationaliserung
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:EnrollmentConfirmCtrl
 * @description Controller for showing enrollment confirm
 */
mainAppCtrls.controller('EnrollmentConfirmCtrl',['$scope','Workshops','$stateParams','$alert',
    function($scope,Workshops,$stateParams,$alert) {
        $scope.workshop = {};
        $scope.loading = true;
        Workshops.getWorkshop({id: $stateParams.workshopid}).$promise.then(function(value){
            $scope.workshop = value;
            var _ea = Date.parse($scope.workshop.end_at);
            var _sa = Date.parse($scope.workshop.start_at);
            $scope.workshop.duration = new Date(_ea - _sa);
            
        },function(value){
            $alert({
                container: '#alert',
                dismissable: false,
                show: true,
                title: 'Error',
                content: "Couldn't find the workshop you tried to enrol to.",
                type: 'danger'
            });
        });
        Workshops.confirmEnroll({
            id: $stateParams.workshopid,
            userid: $stateParams.userid,
            token: $stateParams.token
        }).$promise.then(function(value){
            $alert({
                container: '#alert',
                dismissable: false,
                show: true,
                title: 'Success',
                content: 'Successfully enrolled to workshop \"' + $scope.workshop.title + '\"',
                type: 'success'
            });
            $scope.loading = false;
        },function(httpResponse){
            switch(httpResponse.status){
                case 404:
                    $alert({
                       container: '#alert',
                       dismissable: false,
                       show: true,
                       title: 'Error',
                       content: 'Invalid enrolment link. If you received this link via e-mail, please contact an administrator.',
                       type: 'danger'
                    });
                    break;
            }
            $scope.loading = false;
        });
    }

]);