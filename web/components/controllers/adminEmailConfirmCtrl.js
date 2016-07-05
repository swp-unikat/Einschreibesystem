/**
 * Created by mohammad on 27/06/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:adminEmailConfirmCtrl
 * @description Controller to create a new email template to send a confirmation to the marked participants
 * @requires restSvcs.EmailTemplate
 */
mainAppCtrls.controller('adminEmailConfirmCtrl',['$scope',"EmailTemplate",'$translate','$alert','$stateParams',
    function($scope, EmailTemplate,$translate,$alert,$stateParams) {
        $scope.email = {};
        $scope.workshopid =  $stateParams.id;
        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_EMAILTEMPLATE_NEW_SUCCESS',
            'ALERT_EMAILTEMPLATE_NEW_FAIL','ALERT_EMAILTEMPLATE_NOT_FOUND']).
        then(function(translations){
            _translations = translations;
        });
        //load available Workshoptemplates for list
        EmailTemplate.getAll().$promise.then(function(response){
            $scope.templates = response;
        },function(response){
            
        });
        $scope.loadTemplate = function(){
            var template = JSON.parse(JSON.stringify($scope.selectedTemplate));
            $scope.email.body = template.email_body;
            $scope.email.subject = template.email_subject;
        };

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:adminEmailConfirmCtrl#sendInfo
         * @description Sends the data of the created email template to the server
         * @methodOf mainAppCtrls.controller:adminEmailConfirmCtrl
         */
        $scope.send = function(){

        }
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:adminEmailConfirmCtrl#discard
         * @description Discards all data of the document
         * @methodOf mainAppCtrls.controller:adminEmailConfirmCtrl
         */
        
        $scope.discard = function(){
            $scope.email.subject= "";
            $scope.email.body= "";

        }


    }

]);
