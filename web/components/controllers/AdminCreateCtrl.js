/**
 * Created by Valle on 31.05.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:AdminCreateCtrl
 * @description Initializes the data & function that are being used to create an admin account
 */
mainAppCtrls.controller('AdminCreateCtrl',['$scope', '$stateParams','$alert','$translate',
    function($scope,$stateParams,$alert,$translate) {
        
        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['PASSWORD_IDENTICAL_ERROR', 'EMAIL', 'USERNAME', 'NEW_PASSWORD', 'REPEAT_PASSWORD']).
        then(function(translations){
            _translations = translations;
        });
        
        $scope.placeholder =  {
            username: _translations.USERNAME ,
            password: _translations.NEW_PASSWORD,
            confirm_password: _translations.REPEAT_PASSWORD,
            email: _translations.EMAIL
        };
        //TODO: add errors for no username, no password, not authorozizied
        $scope.myAlert = $alert({

            title: 'Error',
            type: 'danger',
            content: _translations.PASSWORDS_IDENTICAL_ERROR + ' (' + httpReponse.status +')',
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
