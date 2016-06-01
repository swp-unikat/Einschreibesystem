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

// Source: web/components/controllers/loginCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 *
 */
mainAppCtrls.controller('LoginCtrl',['$scope',
    function($scope) {
        
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

    }

]);

// Source: web/components/controllers/newWorkshopTemplateCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 *
 */
mainAppCtrls.controller('NewWorkshopTemplateCtrl',['$scope',
    function($scope) {

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
 *
 */
mainAppCtrls.controller('SettingsCtrl',['$scope',
    function($scope) {

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

mainAppCtrls.controller('WorkshopDetailsCtrl',['$scope','Workshops', '$stateParams',
    function($scope,Workshops,$stateParams) {
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