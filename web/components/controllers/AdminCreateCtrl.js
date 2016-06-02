/**
 * Created by Valle on 31.05.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
mainAppCtrls.controller('AdminCreateCtrl',['$scope', '$stateParams','$alert',
    function($scope,$stateParams,$alert) {
        //TODO: replace static text with translations
        $scope.placeholder =  {
            username: "Username",
            password: "Password",
            confirm_password: "Confirm Password"
        };
        //TODO: add errors for no username, no password, not authorozizied
        $scope.myAlert = $alert({

            title: 'Error',
            type: 'danger',
            content: 'Passwords must be identical',
            container: '#alert',
            show: false,
            dismissable: false
        });
        var token = $stateParams.token;

        //compare password and confirm_password and send data through API
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
