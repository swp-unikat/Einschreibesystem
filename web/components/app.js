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
    'pascalprecht.translate',
    'textAngular',
    'prntSvcs'
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
                url: '/enrollment/confirm/:workshopid/:userid/:token',
                templateUrl: prefix.concat('enrollmentConfirm.html'),
                controller: 'EnrollmentConfirmCtrl'
            })
            .state('unsubscribe',{
                url: '/unsubscribe/:id/:workshopid/:token',
                templateUrl: prefix.concat('unsubscribemessage.html'),
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
            .state('workshop_template',{
                url:'/workshop_template',
                controller:'WorkshopTemplateCtrl',
                templateUrl: prefix.concat('adminWorkshopTemplate.html'),
                data: {
                    requiresLogin: true
                }
            })
            .state('workshop_template_new', {
                url: '/workshop/template/new',
                controller: 'NewWorkshopTemplateCtrl',
                templateUrl: prefix.concat('adminNewWorkshopTemplate.html'),
                data: {
                    requiresLogin: true
                }
            })
          
            .state('workshop_template.edit', {
                url: '/edit/:id',
                controller: 'EditWorkshopTemplateCtrl',
                templateUrl: prefix.concat('workshopTemplateNew.html'),
                data: {
                    requiresLogin: true
                }
            })
            .state('email_template', {
                url: '/email_template',
                controller: 'EmailTemplateCtrl',
                templateUrl: prefix.concat('adminEmailTemplate.html'),
                data: {
                    requiresLogin: true
                }
            })
            .state('email_template_new', {
                url: '/email/template/new',
                controller: 'NewEmailTemplateCtrl',
                templateUrl: prefix.concat('adminNewEmailTemplate.html'),
                data: {
                    requiresLogin: true
                }
            })
            .state('email_template_edit', {
                url: '/email/template/edit',
                controller: 'EditEmailTemplateCtrl',
                templateUrl: prefix.concat('adminEditEmailTemplate.html'),
                data: {
                    requiresLogin: true
                }
            })
            .state('blacklist',{
                url: '/blacklist',
                controller: 'BlacklistCtrl',
                templateUrl: prefix.concat('adminBlacklist.html'),
                data: {
                    requiresLogin: true
                }
            })
            .state('administrator_management', {
                    url: '/administrator_management',
                    controller: 'AdministratorManagementCtrl',
                    templateUrl: prefix.concat('administratorManagement.html'),
                data: {
                    requiresLogin: true
                }
                })

            .state('administrator_workshop_details', {
                url: '/workshop/management/:id',
                controller: 'adminWorkshopDetailsCtrl',
                templateUrl: prefix.concat('adminWorkshopDetails.html'),
                data: {
                    requiresLogin: true
                }
            })

            .state('admin_workshop_management',{
                url: '/workshop/management',
                controller: 'adminWorkshopManagementCtrl',
                templateUrl: prefix.concat('adminWorkshopManagement.html'),
                data: {
                    requiresLogin: true
                }
            })

            .state('settings', {
                url: '/settings',
                controller: 'SettingsCtrl',
                templateUrl: prefix.concat('adminSettings.html'),
                data: {
                    requiresLogin: true
                }
            })

            .state('admininvite',{
                url: '/admin/create/:token',
                controller: 'AdminCreateCtrl',
                templateUrl: prefix.concat('adminInvite.html')

            })
            .state('legalnotice',{
                url: '/legalnotice',
                controller: 'LegalNoticeCtrl',
                templateUrl: prefix.concat('legalNotice.html')
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
    };

    $httpProvider.interceptors.push('jwtInterceptor');
}])
    .run(['$rootScope','$state','store','jwtHelper','UIHelper',function($rootScope, $state, store, jwtHelper,UIHelper) {
        UIHelper.ToggleLogout();
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
mainApp.factory('UIHelper',['$rootScope','store','jwtHelper',function($rootScope,store,jwtHelper){
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
            $rootScope.hide_user_ui = ! $rootScope.hide_user_ui;
        },
        /**
         * @ngdoc function
         * @name mainApp.UIHelper#ToggleLogout
         * @description Toggles, if the Logout or the Login Button is shown
         * @methodOf mainApp.UIHelper
         */
        ToggleLogout: function(){
            var jwt  = store.get('jwt');
            if(!jwt){
                $rootScope.logged_in = false;
                return;
            }
            $rootScope.logged_in = !jwtHelper.isTokenExpired(jwt);
        },
        /**
         * @ndoc function
         * @name mainApp.UIHelper#logout
         * @description Deletes the saved JWT token from last login
         * @methodOf mainApp.UIHelper
         */
        logout: function(){
            if(store.get('jwt'))
                store.delete('jwt');
        }
    }
}]);
/**
 * @ngdoc directive
 * @name mainApp.compare-to
 */
mainApp.directive('compareTo',[function(){
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
        };
    }
]);
mainApp.directive("myNavscroll", function($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
            if (!scope.scrollPosition) {
                scope.scrollPosition = 0
            }

            if (this.pageYOffset > scope.scrollPosition) {
                scope.boolChangeClass = true;
            } else {
                scope.boolChangeClass = false;
            }
            scope.scrollPosition = this.pageYOffset;
            scope.$apply();
        });
    };
});
