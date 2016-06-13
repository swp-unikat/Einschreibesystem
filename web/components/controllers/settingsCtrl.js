/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @name SettingsCtrl
 * @description Controller for the Settings view
 */
mainAppCtrls.controller('SettingsCtrl',['$scope','$alert','$confirm',
    function($scope,$alert,$confirm) {
        var _originalData = {};
        $scope.form = {};
        //TODO: load i18n for Placeholders and Tabnames
        $scope.tabs = [

            {
                title: "Change Personal Info",
                page: "resources/views/adminEditPassword.html"
            },
            {
                title: "Edit Contact Info",
                page: "resources/views/adminEditInfo.html"
            },
            {
                title: "Edit Legal Notice",
                page: "resources/views/adminEditLegalNotice.html"
            }
        ];
        $scope.lnToolbar = [
            ['h1', 'h2', 'h3', 'p', 'bold', 'italics'],
            ['ul', 'ol'],
            ['redo', 'undo', 'clear'],
            ['html', 'insertImage', 'insertLink'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent']
        ];
        $scope.pwAlert = $alert({
            title: "Error",
            type: 'danger',
            content: 'Internal server error.',
            container: '#pwalert',
            dismissable: false,
            show: false
        });
        /**
         * @name mainAppCtrls.controller:SettingsCtrl
         * @ngdoc function
         * @methodOf mainAppCtrls.controller:SettingsCtrl#loadContact
         * @description Loads the current contact data
         */
        $scope.loadContact = function() {

        };
        /**
         * @name mainAppCtrls.controller:SettingsCtrl
         * @ngdoc function
         * @methodOf mainAppCtrls.controller:SettingsCtrl#loadLegalNotice
         * @description Loads the current legalnotice
         */
        $scope.loadLegalNotice = function() {

        };
        /**
         * @name mainAppCtrls.controller:SettingsCtrl
         * @ngdoc function
         * @methodOf mainAppCtrls.controller:SettingsCtrl#validatePW
         * @returns {boolean} True when valid, false when not. Used internally
         */
        $scope.validatePW = function() {
            var pw = $scope.form.password;
            var pwc = $scope.form.password_confirm;
            if(pw != pwc) {
                $scope.pwAlert.show();
                return false;
            }else {
                $scope.pwAlert.hide();
                return true;
            }
        };
        /**
         * @name mainAppCtrls.controller:SettingsCtrl
         * @ngdoc function
         * @methodOf mainAppCtrls.controller:SettingsCtrl#changePassword
         * @description Checks validity of password and sends request to change it to the servers
         */
        $scope.changePassword = function() {
            if(!$scope.validatePW())
                return;
            if($scope.form.password == null || $scope.form.password == '') {
                $scope.pwAlert.show();
                return;
            }
            var _data = {
                password: $scope.form.password_old,
                new_password: $scope.form.password
            };
            //TODO add confirm
            //TODO Send to server, handle response ( Missing API Function )
        }
        /**
         * @name  mainAppCtrls.controller:SettingsCtrl#changeEmail
         * @ngdoc function
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description checks validity of email and sends request to change it to the server
         */
        $scope.changeEmail = function() {
            var _personal_email = $scope.form.personal_email;
            if(_personal_email == null || _personal_email == '') {

            }
            //TODO confirm
            $confirm().show().then(function(res) {
                console.log(res);
            });
            //TODO Send to server, handle response ( Missing API function )
        }
        /**
         * @name  mainAppCtrls.controller:SettingsCtrl#discardContact
         * @ngdoc function
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description discards changes made to the contact data
         */
        $scope.discardContact = function() {
            $scope.form.telephone = _originalData.telephone;
            $scope.form.website = _originalData.website;
            $scope.form.address = _originalData.address;
            $scope.form.facebook = _originalData.facebook;
            $scope.form.email = _originalData.email;
        }
        /**
         * @name  mainAppCtrls.controller:SettingsCtrl#saveContactChange
         * @ngdoc function
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description checks validity of changes made to input and sends change request to server
         */
        $scope.saveContactChange = function() {
            var _dataToSend = $scope.form;
            if(!$scope.form.email.$valid) {
                //TODO error message
                return;
            }
            console.log('Uhm..');
            //TODO add confirm

        }
    }
]);