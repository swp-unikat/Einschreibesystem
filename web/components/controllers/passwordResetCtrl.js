/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:PasswordResetCtrl
 * @description
 */
mainAppCtrls.controller('PasswordResetCtrl',['$scope','$alert','$translate',
    function($scope,$alert,$translate) {

        var _translations;
        $translate(['TITLE_ERROR','PASSWORDS_IDENTICAL_ERROR','PASSWORD_EMPTY_ERROR']).then(function(translations){
           _translations = translations;
        });
        var pwAlert;
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
            }

            //TODO send to server
        };
    }

]);