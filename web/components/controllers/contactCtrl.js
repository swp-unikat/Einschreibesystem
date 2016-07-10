/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:ContactCtrl
 * @description Controller for showing contacts
 */
mainAppCtrls.controller('ContactCtrl',['$scope','Admin',
    function($scope,Admin) {
        $scope.contact = {};
        Admin.getContact().$promise.then(function(response){
            $scope.contact = JSON.parse(response.content);
            console.log($scope.contact);
        },function(response){

        });
    }

]);