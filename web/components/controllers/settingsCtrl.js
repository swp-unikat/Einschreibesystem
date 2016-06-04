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
                title: "Change Personal Info",
                page: "resources/views/adminEditPassword.html"
            },
            {
                title: "Edit Contact Info",
                page: "resources/views/adminEditInfo.html"
            },
            {
                title: "Edit Legal Notice",
                page: "resources/views/adminEditLegalNotice.html"
            }
        ];
        $scope.placeholder = {
            password: "New Password",
            password_confirm: "Repeat Password",
            old_password: "Old Password"
        }

        $scope.lnToolbar = [
            ['h1', 'h2', 'h3', 'p', 'bold', 'italics'],
            ['ul', 'ol'],
            ['redo', 'undo', 'clear'],
            ['html', 'insertImage', 'insertLink'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent']
        ];
        //TODO: Add error handling, alert on successful data change
    }
]);