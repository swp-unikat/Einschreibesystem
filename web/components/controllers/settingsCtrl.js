var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:SettingsCtrl
 * @description Controller for the Settings view
 */
mainAppCtrls.controller('SettingsCtrl',['$scope','$alert','$confirm','Admin',
    function($scope,$alert,$confirm,Admin) {
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
        $scope.pwAlert = null;
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:SettingsCtrl#loadContact
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description Loads the current contact data
         */
        $scope.loadContact = function() {

        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:SettingsCtrl#loadLegalNotice
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description Loads the current legalnotice
         */
        $scope.loadLegalNotice = function() {

        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:SettingsCtrl#validatePW
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @returns {boolean} True when valid, false when not. Used internally
         */
        $scope.validatePW = function() {
            var pw = $scope.form.password;
            var pwc = $scope.form.password_confirm;
            if(pw != pwc) {
                if($scope.pwAlert != null)
                    $scope.pwAlert.hide();
                $scope.pwAlert = $alert({
                    title: "Error",
                    type: 'danger',
                    content: 'Passwords have to be identical',
                    container: '#pwalert',
                    dismissable: false,
                    show: true
                });
                return false;
            }else {
                if($scope.pwAlert != null)
                    $scope.pwAlert.hide();
                return true;
            }
        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:SettingsCtrl#changePassword
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description Checks validity of password and sends request to change it to the servers
         */
        $scope.changePassword = function() {
            if(!$scope.validatePW())
                return;
            if($scope.form.password == null || $scope.form.password == '') {
                if($scope.pwAlert != null)
                    $scope.pwAlert.hide();
                $scope.pwAlert = $alert({
                    title: "Error",
                    type: 'danger',
                    content: 'Passwords cannot be empty',
                    container: '#pwalert',
                    dismissable: false,
                    show: true
                });
                return;
            }
            var _data = {
                oldpassword: $scope.form.password_old,
                newpassword: $scope.form.password,
            };
            Admin.changePassword(_data).$promise.then(function(value){
                if($scope.pwAlert != null)
                    $scope.pwAlert.hide();

                $scope.pwAlert = $alert({
                    title: "Success",
                    type: 'success',
                    content: value.message,
                    container: '#pwalert',
                    dismissable: false,
                    show: true
                });
            },function(value){
                if($scope.pwAlert != null)
                    $scope.pwAlert.hide();

                $scope.pwAlert = $alert({
                    title: "Error",
                    type: 'danger',
                    content: value.data.message,
                    container: '#pwalert',
                    dismissable: false,
                    show: true
                });
            });
        };
        /**
         * @ngdoc function
         * @name  mainAppCtrls.controller:SettingsCtrl#changeEmail
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description checks validity of email and sends request to change it to the server
         */
        $scope.changeEmail = function() {
            var _personal_email = $scope.form.personal_email;
            if(_personal_email == null || _personal_email == '') {
                
            }
            //TODO confirm

            //TODO Send to server, handle response ( Missing API function )
        };
        /**
         * @ngdoc function
         * @name  mainAppCtrls.controller:SettingsCtrl#discardContact
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description discards changes made to the contact data
         */
        $scope.discardContact = function() {
            $scope.form.telephone = _originalData.telephone;
            $scope.form.website = _originalData.website;
            $scope.form.address = _originalData.address;
            $scope.form.facebook = _originalData.facebook;
            $scope.form.email = _originalData.email;
        };
        /**
         * @ngdoc function
         * @name  mainAppCtrls.controller:SettingsCtrl#saveContactChange
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