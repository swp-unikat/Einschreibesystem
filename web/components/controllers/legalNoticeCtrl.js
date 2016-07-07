/**
 * Created by hunte on 08/06/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:LegalNoticeCtrl
 * @description Controller for showing legal notice
 */
mainAppCtrls.controller('LegalNoticeCtrl',['$scope','Admin',
    function($scope,Admin) {
        Admin.getLegalNotice().$promise.then(function(response){
            $scope.legalNotice = response.content;
        },function(response){

        });
    }

]);