/**
 * Created by Valle on 31.05.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:AdminCreateCtrl
 * @description Initializes the data & function that are being used to create an admin account
 */
mainAppCtrls.controller('AdminCreateCtrl',['$scope', '$stateParams','$alert','$translate','Admin',
    function($scope,$stateParams,$alert,$translate,Admin) {
        
        //Get translations for errors and store in array
         var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['PASSWORDS_IDENTICAL_ERROR', 'EMAIL', 'USERNAME', 'NEW_PASSWORD', 'REPEAT_PASSWORD', 'ALERT_CREATE_ADMIN_FAIL', 'ALERT_CREATE_ADMIN_SUCCESS'])
            .then(function(translations){
                _translations = translations;
                $scope.placeholder =  {
                    username: _translations.USERNAME ,
                    password: _translations.NEW_PASSWORD,
                    confirm_password: _translations.REPEAT_PASSWORD,
                    email: _translations.EMAIL
                };
                $scope.form = {};
                $scope.myAlert = $alert({
                    title: 'Error',
                    type: 'danger',
                    content: _translations.PASSWORDS_IDENTICAL_ERROR,
                    container: '#alert',
                    show: false,
                    dismissable: false
                });
        });
        
        
        $scope.form = {};
        $scope.myAlert = $alert({

            title: 'Error',
            type: 'danger',
            content: _translations.PASSWORDS_IDENTICAL_ERROR,
            container: '#alert',
            show: false,
            dismissable: false
        });
        var token = $stateParams.token;

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdminCreateCtrl#sendInfo
         * @methodOf mainAppCtrls.controller:AdminCreateCtrl
         * @description Sends a request to create an admin account to the server and handles the response
         */
        $scope.sendInfo = function(){
            var match = ($scope.form.password_confirm == $scope.form.password);
            if(!match){

                $scope.form.password_confirm = "";
                $scope.myAlert.show();
            }
            else{
                $scope.myAlert.hide();
                var _data = {
                  email: $scope.form.email,
                  password: $scope.form.password,
                  code: token,
                  username: $scope.form.username
                };
                Admin.createAdmin(_data).$promise.then(function(response){
                    $alert({
                        title: _translations.TITLE_SUCCESS,
                        type: 'success',
                        content: _translations.ALERT_CREATE_ADMIN_SUCCESS,
                        container: '#alert',
                        dismissable: true,
                        show: true,
                        duration: 15
                    });
                },function(response){
                    $alert({
                        title: _translations.TITLE_ERROR,
                        type: 'danger',
                        content: _translations.ALERT_CREATE_ADMIN_FAIL,
                        container: '#alert',
                        dismissable: true,
                        show: true,
                        duration: 15
                    });
                });
                
            }
        };
    }
]);
