/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 *
 */
mainAppCtrls.controller('AdministratorManagementCtrl',['$scope','Admin',
    function($scope,Admin) {
        Admin.list().$promise.then(function(value){
            $scope.admins = value;
        },function(httpResponse){
            alert(httpResponse.status);
        });
        $scope.delete = function(_id) {
            Admin.remove({id: _id}).$promise.then(function(value){
                
            },function(httpResponse){
                
            });
        }
    }

]);