/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:NewEmailTemplateCtrl
 * @description Controller to create a new email template
 * @requires restSvcs.EmailTemplate
 */
mainAppCtrls.controller('NewEmailTemplateCtrl',['$scope',"EmailTemplate",'$translate','$alert',
    function($scope, EmailTemplate,$translate,$alert) {
        
        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_EMAILTEMPLATE_NEW_SUCCESS',
            'ALERT_EMAILTEMPLATE_NEW_FAIL','ALERT_EMAILTEMPLATE_NOT_FOUND']).
        then(function(translations){
            _translations = translations;
        });
        
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
            
            EmailTemplate.put(data).$promise.then(function (httpResponse) {
                
                $alert({
                    title: '',
                    type: 'success',
                    content: _translations.ALERT_EMAILTEMPLATE_NEW_SUCCESS + ' \"' + data.template_name +'\"',
                    container: '#alert',
                    dismissable: false,
                    show: true
                });
            }, function (httpResponse) {
                $alert({
                    title: '',
                    type: 'danger',
                    content: _translations.ALERT_EMAILTEMPLATE_NEW_FAIL + ' (' + httpReponse.status +')',
                    container: '#alert',
                    dismissable: false,
                    show: true
                });
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
