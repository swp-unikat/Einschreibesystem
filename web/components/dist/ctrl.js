'use strict';
var mainAppCtrls = angular.module("mainAppCtrls");
// Source: web/components/controllers/dashboardCtrl.js

/**
 *
 */
//TODO: if /dashboard is called, change hideDashboard to false
mainAppCtrls.controller('DashboardCtrl',['$scope','UIHelper',
    function($scope,UIHelper) {
        UIHelper.HideUserUI();
    }

]);


// Source: web/components/controllers/AdminCreateCtrl.js
/**
 * Created by Valle on 31.05.2016.
 */

mainAppCtrls.controller('AdminCreateCtrl',['$scope', '$stateParams','$alert',
    function($scope,$stateParams,$alert) {
        //TODO: replace static text with translations
        $scope.placeholder =  {
            username: "Username",
            password: "Password",
            confirm_password: "Confirm Password"
        };
        //TODO: add errors for no username, no password, not authorozizied
        $scope.myAlert = $alert({

            title: 'Error',
            type: 'danger',
            content: 'Passwords must be identical',
            container: '#alert',
            show: false,
            dismissable: false
        });
        var token = $stateParams.token;

        //compare password and confirm_password and send data through API
        $scope.sendInfo = function(){
            var match = ($scope.password_confirm == $scope.password);
            if(!match){

                $scope.password_confirm = "";
                $scope.myAlert.show();
                return;
            }
            else{
                $scope.myAlert.hide();
                //TODO: send request to api to create new account
            }
        };
    }
]);


// Source: web/components/controllers/EmailTemplateCtrl.js
/**
 * Created by Ahmet on 04.06.2016.
 */

/**
 *
 */
mainAppCtrls.controller('EmailTemplateCtrl',['$scope',
    function($scope) {

    }

]);


// Source: web/components/controllers/adminWorkshopDetailsCtrl.js
/**
 * Created by Ahmet on 08.06.2016.
 */


mainAppCtrls.controller('adminWorkshopDetailsCtrl',['$scope','Workshops', '$stateParams', "$alert",
    function($scope,Workshops,$stateParams, $alert) {
        //TODO : replace with workshop details
        var workshopid;
        workshopid = $stateParams.id;
        $scope.loading = true;
        Workshops.get({id: workshopid}).$promise.then(function(value,httpResponse){
            $scope.workshop = value;

            $scope.loading = false;
        },function(httpResponse) {
            alert(httpResponse.status + '');
            $scope.loading = false;
        });

    }
])

// Source: web/components/controllers/adminWorkshopManagementCtrl.js
/**
 * Created by Ahmet on 08.06.2016.
 */

/**
 *
 */
mainAppCtrls.controller('adminWorkshopManagementCtrl',['$scope','AdminWorkshop','$alert','$translate',
    function($scope,AdminWorkshop,$alert,$translate) {

        //Define object to store the alert in
        $scope.myAlert;
        //returns true if date is in future
        //returns false if date is in past
        var compareToCurrent = function (a){
           var  d1 = Date.now();
           var  d2 = JSON.parse(a);
           return (d2.getTime()>d1.getTime())
        };
        //Get and store translation for alert title.
        $translate(['TITLE_ERROR', 'ERROR_NO_WORKSHOPS']).then(function (translations) {
            $scope.errorTitle = translations.TITLE_ERROR;
            $scope.errorMsg = translations.ERROR_NO_WORKSHOPS;
        });
        $scope.loading = true;
        AdminWorkshop.gethistory().$promise.then(function(value){
            var workshopList = value;
            $scope.loading = false;
        },function(httpResponse) {
            //switch through all possible errors
            switch(httpResponse.status){
                //Alert for error 404, no workshops available
                case 404:
                    $scope.myAlert = $alert({

                        title: $scope.errorTitle,
                        type: 'danger',
                        content: $scope.errorMsg,
                        container: '#alert',
                        dismissable: false,
                        show: true
                    });
                case 500:
                    $scope.myAlert = $alert({
                        title: $scope.errorTitle,
                        type: 'danger',
                        content: 'Internal server error.',
                        container: '#alert',
                        dismissable: false,
                        show: true
                    })
                    break;
            }
            $scope.loading = false;
        });

    }
]);

// Source: web/components/controllers/administratorManagementCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 *
 */
mainAppCtrls.controller('AdministratorManagementCtrl',['$scope',
    function($scope) {

    }

]);

// Source: web/components/controllers/blacklistCtrl.js

/**
 *
 */
//TODO: When /dashboard/blacklist is called, change hideDashboard to true
mainAppCtrls.controller('BlacklistCtrl',['$scope',
    function($scope) {
        $scope.hideDashboard = true;
    }

]);

// Source: web/components/controllers/contactCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 *
 */
mainAppCtrls.controller('ContactCtrl',['$scope',
    function($scope) {
        
    }

]);

// Source: web/components/controllers/editEmailTemplateCtrl.js
/**
 * Created by hunte on 31/05/2016.
*/

/**
 *
 */
mainAppCtrls.controller('EditEmailTemplateCtrl',['$scope',
    function($scope) {
        $scope.lnToolbar = [
            ['h1', 'h2', 'h3', 'p', 'bold', 'italics'],
            ['ul', 'ol'],
            ['redo', 'undo', 'clear'],
            ['html', 'insertImage', 'insertLink'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent']
        ];
    }

]);

// Source: web/components/controllers/editWorkshopTemplateCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */


// Source: web/components/controllers/enrollmentConfirmCtrl.js
/**
 * Created by hunte on 30/05/2016.
 */

/**
 *
 */
mainAppCtrls.controller('EnrollmentConfirmCtrl',['$scope',
    function($scope) {

    }

]);

// Source: web/components/controllers/legalNoticeCtrl.js
/**
 * Created by hunte on 08/06/2016.
 */

/**
 *
 */
mainAppCtrls.controller('LegalNoticeCtrl',['$scope',
    function($scope) {

    }

]);

// Source: web/components/controllers/loginCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 *
 */
mainAppCtrls.controller('LoginCtrl',['$scope','$http','store','$state',
    function($scope,$http,store,$state) {
        $scope.sendInfo = function(){
            var _data = {
                _username: $scope.e_mail,
                _password: $scope.password
            };
            $http({method:'POST',url: '/api/login_check',data: _data}).then(function(httpResponse) {
                var token = httpResponse.data.token;
                store.set('jwt',token);
                $state.go('dashboard');
            },function(httpResponse){
                //TODO: Show alert in view
                alert(httpResponse.status+'\n'+httpResponse.statusText);
            });
        }
    }
]);

// Source: web/components/controllers/newEmailTemplateCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 *
 */
mainAppCtrls.controller('NewEmailTemplateCtrl',['$scope',
    function($scope) {
        
        $scope.lnToolbar = [
            ['h1', 'h2', 'h3', 'p', 'bold', 'italics'],
            ['ul', 'ol'],
            ['redo', 'undo', 'clear'],
            ['html', 'insertImage', 'insertLink'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent']
        ];
    }

]);


// Source: web/components/controllers/newWorkshopTemplateCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 *
 */
mainAppCtrls.controller('NewWorkshopTemplateCtrl',['$scope',"WorkshopTemplate",
    function($scope, WorkshopTemplate) {

        $scope.sendInfo = function(){
            var data={
                title:$scope.workshop.title,
                description:$scope.workshop.description,
                cost:$scope.workshop.cost,
                requirements:$scope.workshop.requirement,
                location:$scope.workshop.location,
                start_at:$scope.sharedDate,
                end_at:JSON.stringify(new Date(2016,10,10,10,10,0,0)),
                max_participants:$scope.workshop.max.participants
            }
            WorkshopTemplate.putWorkshopTemplate(data).$promise.then(function(value){
                alert('Success!');
            },function(httpResponse){
                alert('Error'+httpResponse.statusText);
            });
        };
        $scope.discard = function(){
            $scope.workshop.title= "";
            $scope.workshop.description= "";
            $scope.workshop.cost= "";
            $scope.workshop.requirement= "";
            $scope.workshop.location= "";
            $scope.workshop.sharedDate= "";
            $scope.workshop.start_at= "";
            $scope.workshop.end_at= "";
            $scope.workshop.max.participants= "";



        }



    }

]);

// Source: web/components/controllers/passwordResetCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 *
 */
mainAppCtrls.controller('PasswordResetCtrl',['$scope',
    function($scope) {

    }

]);

// Source: web/components/controllers/settingsCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 * @name SettingsCtrl
 * @description Controller for the Settings view
 */
mainAppCtrls.controller('SettingsCtrl',['$scope','UIHelper','$alert',
    function($scope,UIHelper,$alert) {

        $scope.form = {};
        UIHelper.HideUserUI();
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
        $scope.validatePW = function() {
            var pw = $scope.form.password;
            var pwc = $scope.form.password_confirm;
            if(pw != pwc) {
                $scope.pwAlert.show();
            }else{
                $scope.pwAlert.hide();
            }
        };
        //TODO: Add error handling, alert on successful data change
    }
]);

// Source: web/components/controllers/unsubscribeCtrl.js
/**
 * Created by hunte on 30/05/2016.
 */

/**
 *
 */
mainAppCtrls.controller('UnsubscribeCtrl',['$scope',
    function($scope) {

    }

]);

// Source: web/components/controllers/workshopDetails.js
/**
 * Created by Ahmet on 31.05.2016.
 */

mainAppCtrls.controller('WorkshopDetailsCtrl',['$scope','Workshops', '$stateParams', "$alert",
    function($scope,Workshops,$stateParams, $alert) {
        //TODO : replace with workshop details
        var workshopid = $stateParams.id;
        $scope.sendInfo= function(){
            var first_name=$scope.first_name;   
            var last_name=$scope.last_name;
            var _email=$scope.e_mail;

            //check if input is valid
            var _data = {
              //URL-Params  
              id: workshopid,
              //Data to be send  
              name: first_name,
              surname: last_name,
              email:   _email
            };
            Workshops.enroll(_data).$promise.then(function(value,httpResponse){
                $alert({
                    title: 'Success',
                    type: 'success',
                    content: 'Enrollment successful. Please check your E-Mail!',
                    container: '#alertEnroll',
                    dismissable: true,
                    duration: 20,
                    show: true,
                    animation: 'am-fade-and-slide-top'
                });
            },function(httpResponse){
                $alert({
                    title: 'Error',
                    type: 'danger',
                    content: httpResponse.status + ': '+ httpResponse.statusText,
                    container: '#alertEnroll',
                    dismissable: true,
                    duration: 20,
                    show: true,
                    animation: 'am-fade-and-slide-top'
                });
            });
        };


        $scope.loading = true;
        Workshops.get({id: workshopid}).$promise.then(function(value,httpResponse){
            $scope.workshop = value;

            $scope.loading = false;
        },function(httpResponse) {
            alert(httpResponse.status + '');
            $scope.loading = false;
        });
        Workshops.getParticipants({id: workshopid}).$promise.then(function(value,httpResponse){
            $scope.participants = value;

            $scope.loading = false;
        },function(httpResponse) {
            switch(httpResponse.status){
                case 404:
                    $alert({
                        title: '',
                        type: 'info',
                        content: 'No participants yet',
                        container: '#alertParticipant',
                        dismissable: false,
                        show: true,
                        animation: 'am-fade-and-slide-top'
                    });
            }
            $scope.loading = false;
        });

    }
]);

// Source: web/components/controllers/workshopListCtrl.js

/**
 * 
 */
mainAppCtrls.controller('WorkshopListCtrl',['$scope','Workshops','$alert','$translate',
    function($scope,Workshops,$alert,$translate) {
        
        //Define object to store the alert in
        $scope.myAlert;
        
        //Get and store translation for alert title.
        $translate(['TITLE_ERROR', 'ERROR_NO_WORKSHOPS']).then(function (translations) {
            $scope.errorTitle = translations.TITLE_ERROR;
            $scope.errorMsg = translations.ERROR_NO_WORKSHOPS;
        });
        $scope.loading = true;
        Workshops.getAll().$promise.then(function(value){
            $scope.workshopList = value;
            $scope.loading = false;
        },function(httpResponse) {
            //switch through all possible errors
            switch(httpResponse.status){
                //Alert for error 404, no workshops available
                case 404:
                    $scope.myAlert = $alert({

                        title: $scope.errorTitle,
                        type: 'danger',
                        content: $scope.errorMsg,
                        container: '#alert',
                        dismissable: false,
                        show: true
                    });
                case 500:
                    $scope.myAlert = $alert({
                        title: $scope.errorTitle,
                        type: 'danger',
                        content: 'Internal server error.',
                        container: '#alert',
                        dismissable: false,
                        show: true
                    })
                break;
            }
            $scope.loading = false;
        });

    }
]);

// Source: web/components/controllers/workshopTemplateCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 *
 */
mainAppCtrls.controller('WorkshopTemplateCtrl',['$scope',
    function($scope) {

    }

]);