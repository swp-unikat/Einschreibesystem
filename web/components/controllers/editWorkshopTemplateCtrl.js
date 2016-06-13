/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @requires restSvcs.WorkshopTemplate
 * @description Controller for editing a workshop template.
 * @ngdoc controller
 * @name mainAppCtrls.controller:EditWorkshopTemplateCtrl
 */
mainAppCtrls.controller('EditWorkshopTemplateCtrl',['$scope','WorkshopTemplate','$stateParams','$translate','$alert',
    function($scope,WorkshopTemplate,$stateParams,$translate,$alert) {

        var _workshopId = $stateParams.id;
        $scope.workshop = {};
        //Initialize _originalData
        var _originalData = {};

        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_WORKSHOPTEMPLATE_EDIT_SUCCESS',
            'ALERT_WORKSHOPTEMPLATE_EDIT_FAIL','ALERT_WORKSHOPTEMPLATE_NOT_FOUND']).
        then(function(translations){
            _translations = translations;
        });

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:EditWorkshopTemplateCtrl#discard
         * @description Discards changes and restores the original data
         * @methodOf mainAppCtrls.controller:EditWorkshopTemplateCtrl
         */
        $scope.discard = function () {

            $scope.workshop.title = _originalData.title;
            $scope.workshop.description = _originalData.description;
            $scope.workshop.cost = _originalData.cost;
            $scope.workshop.requirements = _originalData.requirements;
            $scope.workshop.location = _originalData.location;
            $scope.workshop.start_at = _originalData.start_at;
            $scope.workshop.end_at = _originalData.end_at;
            $scope.workshop.max_participants = _originalData.max_participants;
        }

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:EditWorkshopTemplateCtrl#sendInfo
         * @description Sends changes to the API and stores them as new original data
         * @methodOf mainAppCtrls.controller:EditWorkshopTemplateCtrl
         */
        $scope.sendInfo = function () {
            var _dataToSend = {
                title: '',
                description: '',
                cost: '',
                requirements: '',
                location: '',
                start_at: '',
                end_at: '',
                max_participants: ''
                
            };
            var _changedData = {
                
                title: $scope.workshop.title,
                description: $scope.workshop.description,
                cost: $scope.workshop.cost,
                requirements: $scope.workshop.requirements,
                location: $scope.workshop.location,
                start_at: $scope.workshop.start_at,
                end_at: $scope.workshop.end_at,
                max_participants: $scope.workshop.max_participants
            };

            //compare all properties of both objects
            if (_changedData.title != _originalData.title)
                _dataToSend.title = _changedData.title;
            if (_changedData.description != _originalData.description)
                _dataToSend.description = _changedData.description;
            if (_changedData.cost != _originalData.cost)
                _dataToSend.cost = _changedData.cost;
            if (_changedData.location != _originalData.location)
                _dataToSend.location = _changedData.location;
            if (_changedData.start_at != _originalData.start_at)
                _dataToSend.start_at = _changedData.start_at;
            if (_changedData.end_at != _originalData.end_at)
                _dataToSend.end_at = _changedData.end_at;
            if (_changedData.max_participants != _originalData.max_participants)
                _dataToSend.max_participants = _changedData.max_participants;



            WorkshopTemplate.edit({id: _workshopId}, _dataToSend).$promise.then(function (value) {
                //Store answer from server
                _originalData = {
                    title: value.title,
                    description: value.title,
                    cost: value.title,
                    requirements: value.title,
                    location: value.title,
                    start_at: value.title,
                    end_at: value.end_at,
                    max_participants: value.max_participants
                    
                };
                $alert({
                    title: '',
                    type: 'success',
                    content: _translations.ALERT_WORKSHOPTEMPLATE_EDIT_SUCCESS + ' \"' + _originalData.title +'\"',
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 30
                });
            }, function (httpResponse) {
                $alert({
                    title: '',
                    type: 'danger',
                    content: _translations.ALERT_WORKSHOPTEMPLATE_EDIT_FAIL + '(' + httpReponse.status +')',
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 60
                });
            });
        }

        //Fetch data from API
        $scope.loading = true;
        WorkshopTemplate.get({id: _workshopId}).$promise.then(function (value) {

            //Store original data in case of discard
            _originalData = {
                title: value.title,
                description: value.description,
                cost: value.cost,
                requirements: value.requirements,
                location: value.location,
                start_at: value.start_at,
                end_at: value.end_at,
                max_participants: value.max_participants

            };

            //Store original data in ng-model
            $scope.workshop.title = _originalData.title;
            $scope.workshop.description = _originalData.description;
            $scope.workshop.cost = _originalData.cost;
            $scope.workshop.requirements = _originalData.requirements;
            $scope.workshop.location = _originalData.location;
            $scope.workshop.start_at = _originalData.start_at;
            $scope.workshop.end_at = _originalData.end_at;
            $scope.workshop.max_participants = _originalData.max_participants;
            



            $scope.loading = false;
        }, function (httpResponse) {
            if(httpResponse.status === 404)
                $alert({
                    title: '',
                    type: 'danger',
                    content: _translations.ALERT_WORKSHOPTEMPLATE_NOT_FOUND,
                    container: '#alert',
                    dismissable: false,
                    show: true
                });

            $scope.loading = false;
        });
    }
]);