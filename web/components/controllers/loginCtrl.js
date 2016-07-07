/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:LoginCtrl
 * @description Controller handling the login process. Associated with the login view
 */
mainAppCtrls.controller('LoginCtrl',['$scope','$http','store','$state','jwtHelper','$alert','$translate','Admin',
    function($scope,$http,store,$state,jwtHelper,$alert,$translate,Admin) {
        $scope.reset_panel = false;
        var jwt = store.get('jwt');
        $scope.reset = {};
        
        var _translations;
        $translate(['TITLE_ERROR','ALERT_LOGIN_FAIL', 'ALERT_RESET_EMAIL_ERROR', 'TITLE_SUCCESS',
        'ALERT_RESET_PASSWORD_SUCCESS','ALERT_RESET_PASSWORD_ERROR' ]).then(function(translation){
            _translations = translation;
        })
        
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:LoginCtrl#sendInfo
         * @description Sends password and username to the server and checks confirms validation
         * @methodOf mainAppCtrls.controller:LoginCtrl
         */
        $scope.sendInfo = function(){
            var _data = {
                _username: $scope.e_mail,
                _password: $scope.password
            };
            $scope.alertError;
            $scope.loading = true;
            if($scope.alertError != null)
                $scope.alertError.hide();
            $http({method:'POST',url: '/api/login_check',data: _data}).then(function(httpResponse) {
                $scope.loading = false;
                var token = httpResponse.data.token;
                store.set('jwt',token);
                $state.go('dashboard');
                $scope.show_login = false;
                $scope.show_logout = true;
            },function(httpResponse){
                $scope.loading = false;

                $scope.alertError = $alert({
                    title: _translations.TITLE_ERROR,
                    type: 'danger',
                    container: '#alert',
                    content: _translations.ALERT_LOGIN_FAIL,
                    dismissable: false,
                    show: true
                });
            });
        };

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:LoginCtrl#showResetPanel
         * @description shows the button to reset the password
         * @methodOf mainAppCtrls.controller:LoginCtrl
         */
        $scope.showResetPanel = function() {
            $scope.reset_panel = !$scope.reset_panel;
        }
        $scope.alertReset = $alert({});
        $scope.resetPassword = function() {
            $scope.alertReset.hide();
            if(!$scope.reset.email) {
                $scope.alertReset = $alert({
                    title: _translations.TITLE_ERROR,
                    content: _translations.ALERT_RESET_EMAIL_ERROR,
                    type: 'danger',
                    dismissable: false,
                    show: true,
                    container: '#reset_alert'
                });
                return;
            }
            if($scope.alertReset != null)
                $scope.alertReset.hide();
            Admin.requestReset({email: $scope.reset.email}).$promise.then(function(response){
                $scope.alertReset = $alert({
                    title: _translations.TITLE_SUCCESS,
                    content: _translations.ALERT_RESET_PASSWORD_SUCCESS,
                    type: 'success',
                    dismissable: false,
                    show: true,
                    container: '#reset_alert'
                });
            },function(response){
                $scope.alertReset = $alert({
                    title: _translations.TITLE_ERROR,
                    content: _translations.ALERT_RESET_PASSWORD_ERROR,
                    type: 'danger',
                    dismissable: false,
                    show: true,
                    container: '#reset_alert'
                });
            });
        }
    }
]);