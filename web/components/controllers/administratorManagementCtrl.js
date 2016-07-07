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

        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['INVITED_ADMINISTRATOR_EMAIL','TITLE_ERROR','TITLE_SUCCESS','INVITED_ADMINISTRATOR_EMAIL_ERROR', 'ALERT_DELETE_ADMIN_FAILED',
        'ALERT_DELETE_ADMIN_SUCCESS',]).then(function (translations) {
            _translations = translations;
        });
        var loadList = function () {
            $scope.loading = true;
            Admin.list().$promise.then(function (value) {
                $scope.admins = value;
                $scope.loading = false;
            }, function (httpResponse) {
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
        $scope.deleteAdmin = function (_id) {
            $scope.loading = true;
            Admin.delete({id: _id}).$promise.then(function (value) {
                loadList();
                $alert({
                    title: _translations.TITLE_SUCCESS,
                    type: 'success',
                    content: _translations.ALERT_DELETE_ADMIN_SUCCESS,
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 10
                });
            }, function (httpResponse) {
                $scope.loading = false;
                $alert({
                    type: _translations.TITLE_ERROR,
                    title: 'Error',
                    content: _translations.ALERT_DELETE_ADMIN_FAILED,
                    container: '#alert',
                    show: true,
                    dismissable: false,
                    duration: 30
                });
            });
        }
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdministratorManagementCtrl#delete
         * @description invites a new admin
         * @methodOf mainAppCtrls.controller:AdministratorManagementCtrl
         */
        $scope.invite = function () {
            Admin.invite({email: $scope.admin_mail}).$promise.then(function (value) {
                $alert({
                    title: _translations.TITLE_SUCCESS,
                    type: 'success',
                    content: _translations.INVITED_ADMINISTRATOR_EMAIL,
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 30
                });
            }, function (httpResponse) {
                $alert({
                    title: _translations.TITLE_ERROR,
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