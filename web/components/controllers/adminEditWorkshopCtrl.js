/**
 * Created by hunte on 12/06/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @requires restSvcs.AdminWorkshop
 * @requires restSvcs.Workshops
 * @description Controller for editing a workshop. Initializes resources used to edit a workshop
 * @name mainAppCtrls.controller:AdminEditWorkshopCtrl
 */
mainAppCtrls.controller('AdminEditWorkshopCtrl', ['$scope', 'Workshops', 'AdminWorkshop', '$stateParams', '$translate', '$alert', '$state',
    function ($scope, Workshops, AdminWorkshop, $stateParams, $translate, $alert, $state) {

        var _workshopId = $stateParams.id;

        //Initialize _originalData
        var _originalData = {};
        $scope.workshop = {};
        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_WORKSHOP_EDIT_SUCCESS', 'TITLE_SUCCESS', 'TITLE_ERROR',
            'ALERT_WORKSHOP_EDIT_FAIL', 'ALERT_WORKSHOP_NOT_FOUND', 'ALERT_WORKSHOP_IN_PAST', 'ALERT_NEGATIVE_COST', 'ALERT_NEGATIVE_PARTICIPANTS']).
            then(function (translations) {
                _translations = translations;
            });
        var reformatDate = function (_date) {
            if (!_date || _date == null)
                return "";
            var _dateStr = _date.toJSON();
            if (_dateStr == null)
                return "";
            _dateStr = _dateStr.slice(0, _dateStr.length - 5);
            return _dateStr.replace('T', ' ');
        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdminEditWorkshopCtrl#discardChanges
         * @description Discards changes and restores the original data
         * @methodOf mainAppCtrls.controller:AdminEditWorkshopCtrl
         */
        $scope.discardChanges = function () {
            $scope.workshop.title = _originalData.title;
            $scope.workshop.description = _originalData.description;
            $scope.workshop.cost = _originalData.cost;
            $scope.workshop.requirement = _originalData.requirement;
            $scope.workshop.location = _originalData.location;
            $scope.workshop.start_at = _originalData.start_at;
            $scope.workshop.end_at = _originalData.end_at;
            $scope.workshop.duration = _originalData.duration;
            $scope.workshop.max_participants = _originalData.max_participants;

        };

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdminEditWorkshopCtrl#confirmChanges
         * @description Sends changes to the API and stores them as new original data
         * @methodOf mainAppCtrls.controller:AdminEditWorkshopCtrl
         */
        $scope.confirmChanges = function () {

            var reformatDate = function (_date) {
                if (_date == null)
                    return "";
                var str = _date.getFullYear() + "-" + (_date.getMonth() + 1) + "-" + _date.getDate() + " ";
                if (_date.getHours() < 10)
                    str += "0";
                str += _date.getHours() + ":";
                if (_date.getMinutes() < 10)
                    str += "0";
                str += _date.getMinutes() + ":";
                if (_date.getSeconds() < 10)
                    str += "0";
                str += _date.getSeconds();
                return str;
            };
            var _sa = Date.parse($scope.workshop.start_at);
            var _duration = $scope.workshop.duration;
            var _ea = new Date(_sa + _duration + 1000 * 60 * 60);

            var error = false;
            if ($scope.workshop.cost < 0) {
                $alert({
                    title: _translations.TITLE_ERROR,
                    type: 'danger',
                    content: _translations.ALERT_NEGATIVE_COST,
                    container: '#alert',
                    dismissable: false,
                    show: true,
                    duration: 30
                });
                error = true;
            }

            if ($scope.workshop.max_participants < 0) {
                $alert({
                    title: _translations.TITLE_ERROR,
                    type: 'danger',
                    content: _translations.ALERT_NEGATIVE_PARTICIPANTS,
                    container: '#alert',
                    dismissable: false,
                    show: true,
                    duration: 30
                });
                error = true;
            }
            var now = new Date();
            if ($scope.workshop.start_at < now) {
                $alert({
                    title: _translations.TITLE_ERROR,
                    type: 'danger',
                    content: _translations.ALERT_WORKSHOP_IN_PAST,
                    container: '#alert',
                    dismissable: false,
                    show: true,
                    duration: 30
                });
                error = true;
            }

            if (error)
                return false;

            var _dataToSend = {
                title: $scope.workshop.title,
                description: $scope.workshop.description,
                cost: $scope.workshop.cost,
                requirements: $scope.workshop.requirement,
                location: $scope.workshop.location,
                start_at: reformatDate((new Date(_sa))),
                end_at: reformatDate(_ea),
                max_participants: $scope.workshop.max_participants
            };
            AdminWorkshop.edit({id: _workshopId}, _dataToSend).$promise.then(function (value) {
                //Store answer from server
                _originalData = {
                    title: value.title,
                    description: value.title,
                    cost: value.title,
                    requirement: value.title,
                    location: value.title,
                    start_at: value.title,
                    end_at: value.end_at,
                    max_participants: value.max_participants

                };
                $alert({
                    title: _translations.TITLE_SUCCESS,
                    type: 'success',
                    content: _translations.ALERT_WORKSHOP_EDIT_SUCCESS + ' \"' + _originalData.title + '\"',
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 30
                });
                //Redirect to Details page
                $state.go("administrator_workshop_details", {id: value.id});
            }, function (httpResponse) {
                $alert({
                    title: _translations.TITLE_ERROR,
                    type: 'danger',
                    content: _translations.ALERT_WORKSHOP_EDIT_FAIL + '(' + httpResponse.status + ')',
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 60
                });
            });
        };

        //Fetch data from API
        $scope.loading = true;
        Workshops.get({id: _workshopId}).$promise.then(function (value) {

            //Store original data in case of discard
            _originalData = {
                title: value.title,
                description: value.description,
                cost: value.cost,
                requirement: value.requirement,
                location: value.location,
                start_at: value.start_at,
                end_at: value.end_at,
                max_participants: value.max_participants
            };
            var _ea = Date.parse(_originalData.end_at);
            var _sa = Date.parse(_originalData.start_at);
            _originalData.duration = _ea - _sa;

            //Store original data in ng-model
            $scope.workshop.title = _originalData.title;
            $scope.workshop.description = _originalData.description;
            $scope.workshop.cost = _originalData.cost;
            $scope.workshop.requirement = _originalData.requirement;
            $scope.workshop.location = _originalData.location;
            $scope.workshop.start_at = _originalData.start_at;
            $scope.workshop.end_at = _originalData.end_at;
            $scope.workshop.duration = _originalData.duration;
            $scope.workshop.max_participants = _originalData.max_participants;

            $scope.loading = false;
        }, function (httpResponse) {
            if (httpResponse.status === 404)
                $alert({
                    title: _translations.TITLE_ERROR,
                    type: 'danger',
                    content: _translations.ALERT_WORKSHOP_NOT_FOUND,
                    container: '#alert',
                    dismissable: false,
                    show: true
                });

            $scope.loading = false;
        });
    }
]);