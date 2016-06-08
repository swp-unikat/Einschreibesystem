/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @name SettingsCtrl
 * @description Controller for the Settings view
 */
mainAppCtrls.controller('SettingsCtrl',['$scope','UIHelper',
    function($scope,UIHelper) {
        UIHelper.HideUserUI();
        $scope.tabs = [

            {
                title: "Change Password",
                page: "resources/views/adminEditPassword.html"
            },
            {
                title: "Edit Info",
                page: "resources/views/adminEditInfo.html"
            }
        ];
        $scope.placeholder = {
            password: "New Password",
            password_confirm: "Repeat Password",
            old_password: "Old Password"
        }
        //TODO: Add error handling, alert on successful data change
    }
]);