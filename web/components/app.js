/**
 * App
 * @type {angular.Module}
 */
var mainApp = angular.module('mainApp',[
    'ngRoute',
    'mainAppCtrls',
    'mgcrea.ngStrap',
    'ui.router',
    'angular-jwt',
    'restSvcs',
    'angular-storage',
    'pascalprecht.translate'
]);
/**
 * Module collecting all used Controllers
 * @type {angular.Module}
 */
var mainAppCtrls = angular.module('mainAppCtrls',["pascalprecht.translate"]);
/**
 * Configure routing
 */
mainApp.config(['$urlRouterProvider','$stateProvider',
    function($urlRouterProvider,$stateProvider)
    {
        var prefix = "resources/views/";

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
                templateUrl: prefix.concat('adminDashboard.html'),
                data: {
                    requiresLogin: true
                }
            })
            .state('dashboard.workshop_template',{
                url:'/workshop_template',
                controller:'WorkshopTemplateCtrl',
                templateUrl: prefix.concat('workshopTemplate.html')
            })
            .state('dashboard.workshop_template.new', {
                url: '/new',
                controller: 'NewWorkshopTemplateCtrl',
                templateUrl: prefix.concat('workshopTemplateNew.html')
            })
            .state('dashboard.workshop_template.edit', {
                url: '/edit/:id',
                controller: 'EditWorkshopTemplateCtrl',
                templateUrl: prefix.concat('workshopTemplateNew.html')
            })
            .state('dashboard.email_template.new', {
                url: '/new',
                controller: 'NewEmailTemplateCtrl',
                templateUrl: prefix.concat('emailTemplateNew.html')
            })
            .state('dashboard.email_template.edit', {
                url: '/edit/:id',
                controller: 'EditEmailTemplateCtrl',
                templateUrl: prefix.concat('emailTemplateNew.html')
            })
            .state('dashboard.blacklist',{
                url: '/blacklist',
                controller: 'BlacklistCtrl',
                templateUrl: prefix.concat('adminBlacklist.html')
            })
            .state('dashboard.administrator_management', {
                    url: '/administrator_management',
                    controller: 'AdministratorManagementCtrl',
                    templateUrl: prefix.concat('administratorManagement.html')
                })
            .state('dashboard.settings', {
                url: '/settings',
                controller: 'SettingsCtrl',
                templateUrl: prefix.concat('settings.html')
            })
    
            .state('contact',{
                url: '/contact',
                controller: 'ContactCtrl',
                templateUrl: prefix.concat('contact.html')
            });


        $urlRouterProvider.otherwise('/workshops');


    }
]);
/**
 * Configure JWT
 */
mainApp.config(['jwtInterceptorProvider','$httpProvider','$urlRouterProvider',function(jwtInterceptorProvider,$httpProvider,$urlRouterProvider){
    jwtInterceptorProvider.tokenGetter = function(store) {
        return store.get('jwt');
    }

    $httpProvider.interceptors.push('jwtInterceptor');
}])
    .run(['$rootScope','$state','store','jwtHelper',function($rootScope, $state, store, jwtHelper) {
        $rootScope.$on('$stateChangeStart', function(e, to) {
            if (to.data && to.data.requiresLogin) {
                if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
                    e.preventDefault();
                    $state.go('login');
                }
            }
        });
    }]);
/**
 * Config translation module for internationalization
 */
mainApp.config(['$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'resources/local/lang-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
}]);
