var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @requires restSvcs.WorkshopTemplate
 * @description Controller for editing a workshop template.
 * @name mainAppCtrls.controller:EditWorkshopTemplateCtrl
 * @requires restSvcs.WorkshopTemplate
 */
mainAppCtrls.controller('EditWorkshopTemplateCtrl', ['$scope', 'WorkshopTemplate', '$stateParams', '$translate', '$alert', '$state',
    function ($scope, WorkshopTemplate, $stateParams, $translate, $alert, $state) {

        var _workshopId = $stateParams.id;
        $scope.workshop = {};
        //Initialize _originalData
        var _originalData = {};

        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_WORKSHOPTEMPLATE_EDIT_SUCCESS',
            'ALERT_WORKSHOPTEMPLATE_EDIT_FAIL', 'ALERT_WORKSHOPTEMPLATE_NOT_FOUND', 'TITLE_SUCCESS', 'TITLE_ERROR']).
            then(function (translations) {
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
        };

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:EditWorkshopTemplateCtrl#sendInfo
         * @description Sends changes to the API and stores them as new original data
         * @methodOf mainAppCtrls.controller:EditWorkshopTemplateCtrl
         */
        $scope.sendInfo = function () {
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
            var _ea = new Date(_sa + _duration);

            var error = false;
            if ($scope.workshop.cost < 0) {
                $alert({
                    title: _translations.TITLE_ERROR,
                    type: 'danger',
                    content: _translations.ALERT_NEGATIVE_COST,
                    container: '#alert',
                    dismissable: false,
                    show: true
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
                    show: true
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
                    show: true
                });
                error = true;
            }

            if (error)
                return false;

            var data = {
                title: $scope.workshop.title,
                description: $scope.workshop.description,
                cost: $scope.workshop.cost,
                requirement: $scope.workshop.requirement,
                location: $scope.workshop.location,
                start_at: reformatDate((new Date(_sa))),
                end_at: reformatDate(_ea),
                max_participants: $scope.workshop.max_participants
            };
            WorkshopTemplate.edit({id: _workshopId}, data).$promise.then(function (value) {
                $alert({
                    title: _translations.TITLE_SUCCESS,
                    type: 'success',
                    content: _translations.ALERT_WORKSHOPTEMPLATE_EDIT_SUCCESS + ' \"' + _originalData.title + '\"',
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 30
                });
                $state.go("workshop_template");
            }, function (httpResponse) {
                $alert({
                    title: _translations.TITLE_ERROR,
                    type: 'danger',
                    content: _translations.ALERT_WORKSHOPTEMPLATE_EDIT_FAIL + '(' + httpResponse.status + ')',
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 60
                });
            });
        };

        //Fetch data from API
        $scope.loading = true;
        WorkshopTemplate.get({id: _workshopId}).$promise.then(function (value) {

            //calculate duration
            var _ea = Date.parse(value.end_at);
            var _sa = Date.parse(value.start_at);
            var _duration = _ea - _sa;
            //Store original data in case of discard
            _originalData = {
                title: value.title,
                description: value.description,
                cost: value.cost,
                requirement: value.requirement,
                location: value.location,
                duration: _duration,
                start_at: value.start_at,
                end_at: value.end_at,
                max_participants: value.max_participants

            };

            //Store original data in ng-model
            $scope.workshop.title = _originalData.title;
            $scope.workshop.description = _originalData.description;
            $scope.workshop.cost = _originalData.cost;
            $scope.workshop.requirement = _originalData.requirement;
            $scope.workshop.location = _originalData.location;
            $scope.workshop.duration = _originalData.duration;
            $scope.workshop.start_at = _originalData.start_at;
            $scope.workshop.end_at = _originalData.end_at;
            $scope.workshop.max_participants = _originalData.max_participants;

            $scope.loading = false;
        }, function (httpResponse) {
            if (httpResponse.status === 404)
                $alert({
                    title: _translations.TITLE_ERROR,
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