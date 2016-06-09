/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 *
 */
mainAppCtrls.controller('NewEmailTemplateCtrl',['$scope',"EmailTemplate",
    function($scope, EmailTemplate) {

        $scope.sendInfo = function(){
            var data={
                template_name:$scope.email.template.title,
                email_subject:$scope.email.template.subject,
                email_body:$scope.email.template.body,
                

            }
            EmailTemplate.putEmailTemplate(data).$promise.then(function(value){
                alert('Success!');
            },function(httpResponse){
                alert('Error'+httpResponse.statusText);
            });
        }



        
    }

]);
