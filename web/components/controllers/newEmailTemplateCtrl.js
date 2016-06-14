/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:NewEmailTemplateCtrl
 * @description Controller to create a new email template
 *
 */
mainAppCtrls.controller('NewEmailTemplateCtrl',['$scope',"EmailTemplate",
    function($scope, EmailTemplate) {
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:NewEmailTemplateCtrl#sendInfo
         * @description Sends the data of the created email template to the server
         * @methodOf mainAppCtrls.controller:NewEmailTemplateCtrl
         */
        $scope.sendInfo = function(){
            var data={
                template_name:$scope.email.template.title,
                email_subject:$scope.email.template.subject,
                email_body:$scope.email.template.body
            }
            EmailTemplate.put(data).$promise.then(function(httpResponse){
                alert('Success!' + httpResponse.status);
            },function(httpResponse){
                alert('Error'+httpResponse.statusText);
            });
        }
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:NewEmailTemplateCtrl#discard
         * @description Discards all data of the document
         * @methodOf mainAppCtrls.controller:NewEmailTemplateCtrl
         */
        $scope.discard = function(){
            $scope.email.template.title= "";
            $scope.email.template.subject= "";
            $scope.email.template.body= "";
            
        }

        
    }

]);
