/**
 *
 * @type {angular.Module}
 */
var mainApp = angular.module('mainApp',[
    'ngRoute',
    'mainAppCtrls',
    'mgcrea.ngStrap',
    'ui.router'
]);
/**
 *
 * @type {angular.Module}
 */
var mainAppCtrls = angular.module('mainAppCtrls',[]);
/**
 * Configure routing
 */
mainApp.config(['$urlRouterProvider','$stateProvider',
    function($urlRouterProvider,$stateProvider)
    {
        var prefix = "resources/views/";
        // $routeProvider
        //     .when('/workshops', {
        //         templateUrl: prefix.concat('workshopList.html'),
        //         controller: 'WorkshopListCtrl'
        //     })
        //     .when('/login', {
        //         templateUrl: prefix.concat('login.html'),
        //         controller: 'LoginCtrl'
        //     })
        //     .when('/enrollment_confirm/:id/:token', {
        //         templateUrl: prefix.concat('enrollmentConfirm.html'),
        //         controller: 'EnrollmentConfirmCtrl'
        //     })
        //     .when('/dashboard', {
        //         templateUrl: prefix.concat('adminDashboard.html'),
        //         controller: 'DashboardCtrl'
        //     })
        //     .when('/dashboard/settings',{
        //         templateUrl: prefix.concat('adminSettings.html'),
        //         controller: 'SettingsCtrl'
        //     })
        //     .when('/dashboard/blacklist',{
        //
        //     })
        //     .when('/dashboard/workshop_management',{
        //
        //     })
        //     .when('/dashboard/workshoptemplate_management',{
        //
        //     })
        //     .when('/dashboard/emailtemplate_managemetn',{
        //
        //     })
        //     .otherwise({
        //         redirectTo: '/workshops'
        //     });
        $stateProvider
            .state('workshops',{
                url: '/workshops',
                controller: 'WorkshopListCtrl',
                templateUrl: prefix.concat('workshopList.html')
            })
            .state('login',{
                url: '/login',
                controller: 'LoginCtrl',
                templateUrl: prefix.concat('login.html')
            })
            .state('enrollment_confirm',{
                url: '/enrollment_confirm/:id/:token',
                templateUrl: prefix.concat('enrollmentConfirm.html'),
                controller: 'EnrollmentConfirm'
            })
            .state('unsubscribe',{
                url: '/unsubscribe/:id/:workshopid/:token',
                templateUrl: prefix.concat('unsubscribe.html'),
                controller: 'UnsubscribeController'
            })
            .state('password_reset',{
                url: '/password_reset/:token',
                templateUrl: prefix.concat('passwordReset.html'),
                controller: 'PasswordRestCtrl'
            })
            .state('dashboard',{
                url: '/dashboard',
                controller: 'DashboardCtrl',
                templateUrl: prefix.concat('adminDashboard.html')
            })
            .state('dashboard.blacklist',{
                url: '/blacklist',
                controller: 'BlacklistController',
                templateUrl: prefix.concat('adminBlacklist.html'),
            })
            .state('contact',{
                url: '/contact',
                controller: 'ContactCtrl',
                templateUrl: prefix.concat('contact.html')
            });


        $urlRouterProvider.otherwise('/workshops');

    }
]);
