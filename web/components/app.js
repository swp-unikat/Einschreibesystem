/**
 * @ngdoc overview
 * @name mainApp
 * @description Main module of the application. Also loads all external and internal modules that are going to be used in the application and configures routing and JWT
 * @requires ngRoute
 * @requires mainAppCtrls
 * @requires mgcrea.ngStrap
 * @requires ui.router
 * @requires angular-jwt
 * @requires restSvcs
 * @requires angular-storage
 * @requires pascalprecht.translate
 * @requires textAngular
 * @requires prntSvcs
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
 * @ngdoc overview
 * @description Module containing all controller of the application
 * @requires pascalprect.translate
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
                controller: 'UnsubscribeCtrl'
            })

            .state('password_reset',{
                url: '/password/reset/:token',
                templateUrl: prefix.concat('passwordReset.html'),
                controller: 'PasswordResetCtrl'
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
                url:'/workshop/template',
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
            .state('workshop_template_edit', {
                url: '/workshop/template/edit/:id',
                controller: 'EditWorkshopTemplateCtrl',
                templateUrl: prefix.concat('adminNewWorkshopTemplate.html'),
                data: {
                    requiresLogin: true
                }
            })

            .state('email_template', {
                url: '/email/template',
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
                url: '/email/template/edit/:id',
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
                url: '/admins',
                controller: 'AdministratorManagementCtrl',
                templateUrl: prefix.concat('administratorManagement.html'),
                data: {
                    requiresLogin: true
                }
            })

            .state('administrator_workshop_details', {
                url: '/workshop/management/details/:id',
                controller: 'adminWorkshopDetailsCtrl',
                templateUrl: prefix.concat('adminWorkshopDetails.html'),
                data: {
                    requiresLogin: true
                }
            })

            .state('admin_email_confirm', {
                url: '/workshop/management/details/:id/confirm',
                controller: 'adminEmailConfirmCtrl',
                templateUrl: prefix.concat('adminEmailConfirm.html'),
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
            .state('admin_workshop_new',{
                url: '/workshop/management/new',
                controller: 'AdminNewWorkshopCtrl',
                templateUrl: prefix.concat('adminNewWorkshop.html'),
                data: {
                    requiresLogin: true
                }
            })
            .state('admin_workshop_edit',{
                url: '/workshop/management/edit/:id',
                controller: 'AdminEditWorkshopCtrl',
                templateUrl: prefix.concat('adminEditWorkshop.html'),
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
    .run(['$rootScope','$state','store','jwtHelper',function($rootScope, $state, store, jwtHelper) {
        $rootScope.$on('$stateChangeStart', function(e, to) {
            if (to.data && to.data.requiresLogin) {
                if (!store.get('jwt') || jwtHelper.isTokenExpired(store.get('jwt'))) {
                    e.preventDefault();
                    $state.go('login');
                }
            };
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
 * @ngdoc controller
 * @name mainApp.controller:GlobalCtrl
 * @description Controller applied to the body HTML-Tag to avoid pollution of the rootScope. Provides Information wether login or logout button are to be shown
 */
mainApp.controller('GlobalCtrl',['$scope','store','jwtHelper','$state','$http','$translate',function($scope,store,jwtHelper,$state,$http,$translate,$translateProvider) {
    $scope.back=function () {
        if ($scope.show_login)
            $state.go('workshops');
        if ($scope.show_logout)
            $state.go('dashboard');
    }
    //Get language config
    $http.get("resources/local/config.json").then(function(response){
        //save available languages
        $scope.langs = response.data.lang;
        //set default language
        $translate.use(response.data.default);
        for(var i=0;i<$scope.langs.length;i++) {
            if(response.data.default === $scope.langs[i].code)
                $scope.selectedLang = $scope.langs[i];
        }
    },function(response){

    });
    $scope.show_login = true;
    $scope.show_logout = false;
    //Function called on every state change. Takes care of the buttons to be shown correctly
    $scope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        var jwt = store.get('jwt');
        if (toState.name == 'login') {
            $scope.show_login = false;
            $scope.previousState = fromState;
            if (jwt != null && !jwtHelper.isTokenExpired(jwt)) {
                event.preventDefault();
                $state.go(fromState);
            }
        } else {
            if (jwt != null) {
                $scope.show_login = jwtHelper.isTokenExpired(jwt);
                $scope.show_logout = !jwtHelper.isTokenExpired(jwt);
            } else {
                $scope.show_login = true;
                $scope.show_logout = false;
            }
        }
    });
    /**
     * @ngdoc function
     * @name mainApp.controller:GlobalCtrl#logout
     * @methodOf mainApp.controller:GlobalCtrl
     * @description Function bound to the logout button. Deletets the stored JWT and redirectes to the workhops state, if the current state requieres to be logged in. Also sets the login/-out buttons to be shown accordingly
     */
    $scope.logout = function () {

        var jwt = store.get('jwt');
        if (jwt != null) {
            store.remove('jwt');
            $scope.show_login = true;
            $scope.show_logout = false;
            if ($state.current.data.requiresLogin)
                $state.go('workshops');
        } else {
            $scope.show_login = true;
            $scope.show_logout = false;
        }
    };
    
    //change language
    $scope.changeLang = function() {
        $translate.use($scope.selectedLang.code);
    };
}
]);
/**
 * @ngdoc directive
 * @name mainApp.directive:compare-to
 * @restrict 'A'
 * @description Compares the content of two elements. Sets them as valid, if they both are identical.
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
/**
 * @ngdoc object
 * @name mainApp.$confirm
 * @description Service providing a custom confirm dialog. Extends functionalty from angular-strap's {@link http://mgcrea.github.io/angular-strap/#/modals $modal service}
 */
mainApp.service('$confirm', function($modal, $rootScope, $q) {
        var scope = $rootScope.$new();
        var deferred;
        scope.title = 'to be changed';
        scope.content = 'to be changed';
        scope.answer = function(res) {
            deferred.resolve(res);
            confirm.hide();
        }
        var confirm = $modal({templateUrl: 'resources/views/confirm.tpl.html', scope: scope, show: false,dismissable: false});
        var parentShow = confirm.show;
        confirm.show = function() {
            deferred = $q.defer();
            parentShow();
            return deferred.promise;
        }
        return confirm;
})