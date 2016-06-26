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
mainAppCtrls.controller('AdministratorManagementCtrl',['$scope','Admin','$alert','$translate',
    function($scope,Admin,$alert,$translate) {
        $scope.loading = true;
        Admin.list().$promise.then(function(value){
            $scope.admins = value;
            $scope.loading = false;
        },function(httpResponse){
            alert(httpResponse.status);
            $scope.loading = false;
        });
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdministratorManagementCtrl#delete
         * @description Deletes the admin who has the selected id
         * @param {number} _id ID of the admin to delete
         * @methodOf mainAppCtrls.controller:AdministratorManagementCtrl
         */
        $scope.delete = function(_id) {
            Admin.delete({id: _id}).$promise.then(function(value){

            },function(httpResponse){


            });
        };

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdministratorManagementCtrl#delete
         * @description invites a new admin
         * @methodOf mainAppCtrls.controller:AdministratorManagementCtrl
         */
        $scope.invite = function() {
            Admin.invite({email: $scope.email}).$promise.then(function(value){
                $alert({
                    title: '',
                    type: 'success',
                    content: _translations.INVITED_ADMINISTRATOR_EMAIL,
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 30
                });
            },function(httpResponse){
                $alert({
                    title: '',
                    type: 'danger',
                    content: _translations.INVITED_ADMINISTRATOR_EMAIL_ERROR,
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 60
                })
            });
        }
    }

]);