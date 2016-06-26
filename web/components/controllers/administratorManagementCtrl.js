/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:AdministratorManagementCtrl
 * @descirption Controller for managing administrator list
 * @requires restSvcs.Admin
 */
mainAppCtrls.controller('AdministratorManagementCtrl',['$scope','Admin','$alert',
    function($scope,Admin,$alert) {
        var loadList = function(){
            $scope.loading = true;
            Admin.list().$promise.then(function(value){
                $scope.admins = value;
                $scope.loading = false;
            },function(httpResponse){
                alert(httpResponse.status);
                $scope.loading = false;
            });
        };
        loadList();
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdministratorManagementCtrl#delete
         * @description Deletes the admin who has the selected id
         * @param {number} _id ID of the admin to delete
         * @methodOf mainAppCtrls.controller:AdministratorManagementCtrl
         */
        $scope.deleteAdmin = function(_id) {
            $scope.loading = true;
            Admin.delete({id: _id}).$promise.then(function(value){
                loadList();
            },function(httpResponse){
                $scope.loading = false;
                $alert({
                   type: 'danger',
                   title: 'Error',
                   content: 'Failed to delete admin',
                   container: '#alert',
                   show: true,
                   dismissable: false,
                   duration: 30
                });
            });
        }
        $scope.invite = function() {
            $scope.inviting = true;
            Admin.invite({email: $scope.admin_mail}).$promise.then(function(value){
                $scope.inviting = false;
            },function(value){
                $scope.inviting = false;
            });
        }
    }

]);