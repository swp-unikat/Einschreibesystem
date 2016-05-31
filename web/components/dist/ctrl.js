'use strict';
var mainAppCtrls = angular.module("mainAppCtrls");
// Source: web/components/controllers/dashboardCtrl.js

/**
 *
 */
//TODO: if /dashboard is called, change hideDashboard to false
mainAppCtrls.controller('DashboardCtrl',['$scope',
    function($scope) {

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
        Workshops.get(workshopid).$promise.then(function(value,httpResponse){
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
mainAppCtrls.controller('WorkshopListCtrl',['$scope','Workshops',
    function($scope,Workshops) {
        //TODO : replace with workshop details
        $scope.loading = true;
        Workshops.getAll().$promise.then(function(value,httpResponse){
            $scope.workshopList = value;
            $scope.loading = false;
        },function(httpResponse) {
            alert(httpResponse.status + '');
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