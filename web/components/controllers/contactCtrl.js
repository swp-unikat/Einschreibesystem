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
        Admin.getContact().$promise.then(function(response){
            $scope.contact = response.content;
            console.log(response.content + "\n" + $scope.contact);
        },function(response){

        });
    }

]);