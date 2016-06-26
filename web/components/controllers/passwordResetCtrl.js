/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:PasswordResetCtrl
 * @description To reset your password and create a new password
 * @requires restSvcs.Admin
 */
mainAppCtrls.controller('PasswordResetCtrl',['$scope','$alert','$translate','Admin','$stateParams',
    function($scope,$alert,$translate,Admin,$stateParams) {

        $scope.form = {};
        var _translations;
        $translate(['TITLE_ERROR','PASSWORDS_IDENTICAL_ERROR','PASSWORD_EMPTY_ERROR']).then(function(translations){
           _translations = translations;
        });
        var pwAlert;
        var _token = $stateParams.token;
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:PasswordResetCtrl#validatePW
         * @methodOf mainAppCtrls.controller:PasswordResetCtrl
         * @description checks validity of passwords ( if both are identical )
         */
        $scope.validatePW = function () {
            var pw = $scope.password;
            var pwc = $scope.password_confirm;
            if(pwAlert != null){
                pwAlert.hide();
                pwAlert.destroy();
            }
            if (pw != pwc) {
                pwAlert = $alert({
                    container: '#alert',
                    title: _translations.TITLE_ERROR,
                    content: _translations.PASSWORDS_IDENTICAL_ERROR,
                    show: true,
                    dismissable: false,
                    type: 'danger'
                });
                return false;
            } else {
                if(pwAlert != null) {
                    pwAlert.hide();
                    pwAlert.destroy();
                }
                return true;
            }
        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:PasswordResetCtrl#sendInfo
         * @methodOf mainAppCtrls.controller:PasswordResetCtrl
         * @description checks validity and sends a request to change the password to the server
         */
        $scope.sendInfo = function () {
            if(!$scope.validatePW())
                return;

            var pw = $scope.password;
            if(pw == '' || pw == null){
                pwAlert = $alert({
                    container: '#alert',
                    title: _translations.TITLE_ERROR,
                    content: _translations.PASSWORD_EMPTY_ERROR,
                    show: true,
                    dismissable: false,
                    type: 'danger'
                });
                return;
            }
            var _msg = "";
            var _type = "";
            var _title = "";
            Admin.resetPassword({token: _token},{password: $scope.form.password}).$promise.then(function(httpResponse){
                pwAlert = $alert({
                    container: '#alert',
                    title: "Success",
                    content: _msg,
                    type: "success",
                    show: true,
                    dismissable: false
                });
            },function(httpResponse){
                switch(httpResponse.status){
                    case 404:
                        _msg = "Invalid token";
                        break;
                    case 500:
                        _msg = "Internal server error. Please contact your system admin";
                        break;
                }
                pwAlert = $alert({
                    container: '#alert',
                    title: "Error",
                    content: _msg,
                    type: "danger",
                    show: true,
                    dismissable: false
                });

            });

        };
    }

]);