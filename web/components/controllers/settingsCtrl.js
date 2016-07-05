var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:SettingsCtrl
 * @description Controller for the Settings view
 */
mainAppCtrls.controller('SettingsCtrl',['$scope','$alert','$confirm','Admin', '$translate',
    function($scope,$alert,$confirm,Admin,$translate) {
        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_PASSWORD_IDENTICAL', 'AlERT_PASSWORD_EMPTY','CHANGE_PERSONAL_INFO','CHANGE_CONTACT_INFO','EDIT_LEGAL_NOTICE']).
        then(function(translations){
            _translations = translations;
            $scope.tabs = [

                {
                    title: _translations.CHANGE_PERSONAL_INFO,
                    page: "resources/views/adminEditPassword.html"
                },
                {
                    title: _translations.CHANGE_CONTACT_INFO,
                    page: "resources/views/adminEditInfo.html"
                },
                {
                    title: _translations.EDIT_LEGAL_NOTICE,
                    page: "resources/views/adminEditLegalNotice.html"
                }
            ];
        });
        var _originalData = {};
        $scope.form = {};
        $scope.ln = {};

        $scope.lnToolbar = [
            ['h1', 'h2', 'h3', 'p', 'bold', 'italics'],
            ['ul', 'ol'],
            ['redo', 'undo', 'clear'],
            ['html', 'insertImage', 'insertLink'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent']
        ];

        var _originalNotice = "";
        Admin.getLegalNotice().$promise.then(
            function(value){
                $scope.ln.legalNotice = value.content;
                _originalNotice = value.content;
            },function(value){

            });



        $scope.pwAlert = null;
        $scope.emailAlert = null;


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
                    content: _translations.ALERT_PASSWORD_IDENTICAL,
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
                    content: _translations.AlERT_PASSWORD_EMPTY,
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
                $scope.form = {};
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
                $scope.form = {};
            });

        };
        /**
         * @ngdoc function
         * @name  mainAppCtrls.controller:SettingsCtrl#changeEmail
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description checks validity of email and sends request to change it to the server
         */
        $scope.changeEmail = function() {
            if($scope.emailAlert != null)
                $scope.emailAlert.hide();
            var _email_new = $scope.form.email_new;
            var _email_old = $scope.form.email_old;
            if(_email_new == null || _email_new == '') {
                $alert({
                    title: _translations.TITLE_ERROR,
                    type: 'danger',
                    content: _translations.ALERT_EMAIL_EMPTY,
                    container: '#alertInfo',
                    dismissable: false,
                    show: true
                });
            }
            if(_email_old == null || _email_old == '') {
                $alert({
                    title: _translations.TITLE_ERROR,
                    type: 'danger',
                    content: _translations.ALERT_OLDEMAIL_EMPTY,
                    container: '#alertInfo',
                    dismissable: false,
                    show: true
                });
            }
            Admin.changeEmail({oldemail: _email_old, newemail: _email_new}).$promise.then(function(response){
                $scope.emailAlert = $alert({
                   content: response.statusText,
                   type: 'success',
                   title: 'Success',
                   show: true,
                   dismissable: false,
                   duration: 30,
                   container: '#emailAlert' 
                });
                $scope.form = {};
            },function(response){
                $scope.emailAlert = $alert({
                    content: response.statusText,
                    type: 'danger',
                    title: 'Error',
                    show: true,
                    dismissable: false,
                    duration: 30,
                    container: '#emailAlert'
                });
                $scope.form = {};
            });
            
        };
        
        
        $scope.saveLegalNotice = function () {
            
            var _dataToSend = {
                content : $scope.ln.legalNotice
            };
            console.log(_dataToSend.content);
            Admin.editLegalNotice(_dataToSend).$promise.then(function (value) {
                $alert({
                    title: "Success",
                    type: 'success',
                    content: value.statusText,
                    container: '#alertInfo',
                    dismissable: false,
                    show: true
                });
                $scope.legalNotice = value.content;
            },function (value) {
                $alert({
                    title: "Error",
                    type: 'danger',
                    content: value.statusText,
                    container: '#alertInfo',
                    dismissable: false,
                    show: true
                });
            });
        };
        $scope.discardLegalNotice = function() {
            $scope.ln.legalNotice = _originalNotice;
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
            var _dataToSend = {
                content : angular.toJson($scope.form)
            };

            Admin.editContact(_dataToSend).$promise.then(
                function(value){
                    $alert({
                        title: "Success",
                        type: 'success',
                        content: value.message,
                        container: '#alertInfo',
                        dismissable: false,
                        show: true
                    });
                },
                function(value){
                    $alert({
                        title: "Error",
                        type: 'danger',
                        content: value.message,
                        container: '#alertInfo',
                        dismissable: false,
                        show: true
                    });
                });
        }
    }
]);