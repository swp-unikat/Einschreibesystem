/**
 * Created by Ahmet on 04.06.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 *
 */
mainAppCtrls.controller('EmailTemplateCtrl',['$scope', "EmailTemplate",
    function($scope, EmailTemplate) {


        EmailTemplate.getAll()
            .$promise.then(function(value){
            $scope.data=value;
        },function(httpResponse){
            alert('Error'+httpResponse.statusText);
        });








    }

]);
