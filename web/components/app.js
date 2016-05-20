/**
 *
 * @type {angular.Module}
 */
var mainApp = angular.module('mainApp',[
    'ngRoute',
    'mainAppCtrls',
    'mgcrea.ngStrap'
]);
/**
 *
 * @type {angular.Module}
 */
var mainAppCtrls = angular.module('mainAppCtrls',[]);
/**
 * Configure routing
 */
mainApp.config(['$routeProvider',
    function($routeProvider)
    {
        var prefix = "resources/views/";
        $routeProvider
            .when('/workshops', {
                templateUrl: prefix.concat('workshopList.html'),
                controller: 'WorkshopListCtrl'
            })
            .when('/login', {
                templateUrl: prefix.concat('login.html'),
                controller: 'LoginCtrl'
            })
            .when('/enrollment_confirm/:id/:token', {
                templateUrl: prefix.concat('enrollmentConfirm.html'),
                controller: 'EnrollmentConfirmCtrl'
            })
            .otherwise({
                redirectTo: '/workshops'
            });
    }
]);
