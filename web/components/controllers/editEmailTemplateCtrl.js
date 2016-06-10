/**
 * Created by hunte on 31/05/2016.
*/
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @requires restSvcs.EmailTemplate
 * @description Controller for editing a workshop template.
 * @name mainAppCtrls.EditEmailTemplateCtrl
 * @ngdoc controller
 */
mainAppCtrls.controller('EditEmailTemplateCtrl',['$scope','EmailTemplate','$stateParams',
    function($scope,EmailTemplate,$stateParams) {
        var _workshopId = $stateParams.id;
        //Initialize _originalData
        var _originalData = {
        };

        //Fetch data from API
        $scope.loading = true;
        EmailTemplate.get({id: _workshopId}).$promise.then(function(value){

            //Store original data in case of discard
            _originalData = {
                title: value.template_name,
                email: {
                    subject: value.email_subject,
                    body: value.email_body
                }
            };
            //Store original data in ng-model
            $scope.title = _originalData.title;
            //IMPORTANT DEEP COPY ARRAYS, SO NO REFERENCE IS CREATED
            $scope.email = {
                body: _originalData.email.body,
                subject: _originalData.email.subject
            };
            $scope.loading = false;
        },function(httpResponse){
            //TODO error handling

            $scope.loading = false;
        });

        //Function to discard changes
        $scope.discardChanges = function() {
            $scope.title = _originalData.title;
            $scope.email = _originalData.email;
        }
        //Function to confirm changes
        $scope.confirmChanges = function() {
            var _dataToSend = {
                template_name: '',
                email_subject: '',
                email_body: ''
            };
            var _changedData = {
                title: $scope.title,
                email: $scope.email
            };
            //compare properties of both objects
            if(_changedData.title != _originalData.title) {
                _dataToSend.template_name = _changedData.title;
            }
            if(_changedData.email.body != _originalData.email.body)
                _dataToSend.email_body = _changedData.email.body;
            if(_changedData.email.subject != _originalData.email.subject)
                _dataToSend.email_subject = _changedData.email.subject;

            EmailTemplate.edit({id: _workshopId},_dataToSend).$promise.then(function(value){
                //Store answer from server
                _originalData = {
                    title: value.template_name,
                    email: {
                        subject: value.email_subject,
                        body: value.email_body
                    }
                };
            },function(httpResponse){
                console.log(httpResponse.statusText);
            });
        }
    }

]);