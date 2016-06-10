/**
 * Created by hunte on 31/05/2016.
*/
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @requires restSvcs.EmailTemplate
 * @description Controller for editing a workshop template. Provides
 * @ngdoc controller
 * @name mainAppCtrls.controller:EditEmailTemplateCtrl
 */
mainAppCtrls.controller('EditEmailTemplateCtrl',['$scope','EmailTemplate','$stateParams','$translate','$alert',
    function($scope,EmailTemplate,$stateParams,$translate,$alert) {
        
        var _workshopId = $stateParams.id;

        //Initialize _originalData
        var _originalData = {};

        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_EMAILTEMPLATE_EDIT_SUCCESS',
            'ALERT_EMAILTEMPLATE_EDIT_FAIL','ALERT_EMAILTEMPLATE_NOT_FOUND']).
        then(function(translations){
            _translations = translations;
        });

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:EditEmailTemplateCtrl#discardChanges
         * @description Discards changes and restores the original data
         * @methodOf mainAppCtrls.controller:EditEmailTemplateCtrl
         */
        $scope.discardChanges = function () {
            $scope.title = _originalData.title;
            $scope.email = _originalData.email;
        }

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:EditEmailTemplateCtrl#confirmChanges
         * @description Sends changes to the API and stores them as new original data
         * @methodOf mainAppCtrls.controller:EditEmailTemplateCtrl
         */
        $scope.confirmChanges = function () {
            var _dataToSend = {
                template_name: '',
                email_subject: '',
                email_body: ''
            };
            var _changedData = {
                title: $scope.title,
                email: $scope.email
            };

            //compare all properties of both objects
            if (_changedData.title != _originalData.title)
                _dataToSend.template_name = _changedData.title;
            if (_changedData.email.body != _originalData.email.body)
                _dataToSend.email_body = _changedData.email.body;
            if (_changedData.email.subject != _originalData.email.subject)
                _dataToSend.email_subject = _changedData.email.subject;

            EmailTemplate.edit({id: _workshopId}, _dataToSend).$promise.then(function (value) {
                //Store answer from server
                _originalData = {
                    title: value.template_name,
                    email: {
                        subject: value.email_subject,
                        body: value.email_body
                    }
                };
                $alert({
                    title: '',
                    type: 'success',
                    content: _translations.ALERT_EMAILTEMPLATE_EDIT_SUCCESS + _originalData.title,
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 30
                });
            }, function (httpResponse) {
                    $alert({
                        title: '',
                        type: 'danger',
                        content: _translations.ALERT_EMAILTEMPLATE_EDIT_FAIL + '(' + httpReponse.status +')',
                        container: '#alert',
                        dismissable: true,
                        show: true,
                        duration: 60
                    });
            });
        }

        //Fetch data from API
        $scope.loading = true;
        EmailTemplate.get({id: _workshopId}).$promise.then(function (value) {

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
        }, function (httpResponse) {
            if(httpResponse.status === 404)
                $alert({
                    title: '',
                    type: 'danger',
                    content: _translations.ALERT_EMAILTEMPLATE_NOT_FOUND,
                    container: '#alert',
                    dismissable: false,
                    show: true
                });

            $scope.loading = false;
        });
    }
]);