/**
 * @name mainApp
 * @requieres
 * @type {angular.Module}
 * @description Main module of the application
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
 * @name mainAppCtrls
 * @type {angular.Module}
 * @description Module containg all controller of the application
 */
var mainAppCtrls = angular.module('mainAppCtrls',["pascalprecht.translate"]);

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
            .state('workshopsdetails',{
                url: '/workshops/details/:id',
                controller: 'WorkshopDetailsCtrl',
                templateUrl: prefix.concat('workshopDetails.html')
            })
            .state('login',{
                url: '/login',
                controller: 'LoginCtrl',
                templateUrl: prefix.concat('login.html')
            })
            .state('enrollment_confirm',{
                url: '/enrollment_confirm/:id/:token',
                templateUrl: prefix.concat('enrollmentConfirm.html'),
                controller: 'EnrollmentConfirmCrtl'
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
                    //requiresLogin: true
                }
            })
            .state('workshop_template',{
                url:'/workshop_template',
                controller:'WorkshopTemplateCtrl',
                templateUrl: prefix.concat('workshopTemplate.html'),
                data: {
                    //requiresLogin: true
                }
            })
            .state('workshop_template.new', {
                url: '/new',
                controller: 'NewWorkshopTemplateCtrl',
                templateUrl: prefix.concat('workshopTemplateNew.html'),
                data: {
                    //requiresLogin: true
                }
            })
            .state('workshop_template.edit', {
                url: '/edit/:id',
                controller: 'EditWorkshopTemplateCtrl',
                templateUrl: prefix.concat('workshopTemplateNew.html'),
                data: {
                    //requiresLogin: true
                }
            })
            .state('email_template.new', {
                url: '/new',
                controller: 'NewEmailTemplateCtrl',
                templateUrl: prefix.concat('emailTemplateNew.html'),
                data: {
                    //requiresLogin: true
                }
            })
            .state('email_template.edit', {
                url: '/edit/:id',
                controller: 'EditEmailTemplateCtrl',
                templateUrl: prefix.concat('emailTemplateNew.html'),
                data: {
                    //requiresLogin: true
                }
            })
            .state('blacklist',{
                url: '/blacklist',
                controller: 'BlacklistCtrl',
                templateUrl: prefix.concat('adminBlacklist.html'),
                data: {
                    //requiresLogin: true
                }
            })
            .state('administrator_management', {
                    url: '/administrator_management',
                    controller: 'AdministratorManagementCtrl',
                    templateUrl: prefix.concat('administratorManagement.html'),
                data: {
                    //requiresLogin: true
                }
                })
            .state('settings', {
                url: '/settings',
                controller: 'SettingsCtrl',
                templateUrl: prefix.concat('adminSettings.html'),
                data: {
                    //requiresLogin: true
                }
            })
            .state('admininvite',{
                url: '/admin/create/:token',
                controller: 'AdminCreateCtrl',
                templateUrl: prefix.concat('adminInvite.html')
            })
            .state('contact',{
                url: '/contact',
                controller: 'ContactCtrl',
                templateUrl: prefix.concat('contact.html')
            });


        $urlRouterProvider.otherwise('/workshops');


    }
]);

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

mainApp.config(['$translateProvider', function($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'resources/local/lang-',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
}]);
/**
 * @ngdoc service
 * @descrption Helper service to show or hide User UI elements
 * @name  mainApp.UIHelper
 */
mainApp.factory('UIHelper',['$rootScope',function($rootScope){
    return {
        /**
         * @ngdoc function
         * @name mainApp.UIHelper#HideUserUI
         * @description hide the user UI
         * @methodOf mainApp.UIHelper
         */
        HideUserUI: function(){
            $rootScope.hide_user_ui = true;
        },
        /**
         * @ngdoc function
         * @name mainApp.UIHelper#ShowUserUI
         * @description show the user UI
         * @methodOf mainApp.UIHelper
         */
        ShowUserUI: function(){
            $rootScope.hide_user_ui = false;
        },
        /**
         * @ngdoc function
         * @name mainApp.UIHelper#ToggleUserUI
         * @description toggle the user UI
         * @methodOf mainApp.UIHelper
         */
        ToggleUserUI: function(){
            $rootScope.hide_user_ui = ! $rootScope.hide;
        }
    }
}]);
