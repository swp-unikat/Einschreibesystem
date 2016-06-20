/**
 * Created by hunte on 30/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:EnrollmentConfirmCtrl
 * @description Controller for showing enrollment confirm
 */
mainAppCtrls.controller('EnrollmentConfirmCtrl',['$scope','Workshops','$stateParams',
    function($scope,Workshops,$stateParams) {
        Workshops.getConfirmEnrollment({
            id: $stateParams.workshopid,
            userid: $stateParams.userid,
            token: $stateParams.token
        }).$promise.then(function(value){

        },function(httpResponse){

        });
    }

]);