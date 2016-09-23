/**
 * Created by Ahmet on 08.06.2016.
 */

var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:adminWorkshopDetailsCtrl
 * @requires restSvcs.Workshops
 * @description Controller for showing administrator functions in a workshop.
 */
mainAppCtrls.controller('adminWorkshopDetailsCtrl', ['$scope', 'Workshops', 'Participants', '$stateParams', "$alert", 'printer', '$translate', 'AdminWorkshop',
    function ($scope, Workshops, Participants, $stateParams, $alert, printer, $translate, AdminWorkshop) {
        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['TITLE_SUCCESS', 'TITLE_ERROR', 'TITLE_INFO', 'ALERT_NO_PARTICIPANTS', 'ALERT_SUCCESSFUL_OVERBOOK', 'ALERT_FAIL_OVERBOOK', 'ALERT_SUCCESSFUL_BLACKLISTED',
            'ALERT_SUCCESSFUL_REMOVED_USER', 'ALERT_FAILED_REMOVED_USER', 'PARTICIPATION_CONFIRM_SUCCESS', 'PARTICIPATION_CONFIRM_ERROR']).
            then(function (translations) {
                _translations = translations;
            });

        $scope.workshopid = $stateParams.id;
        $scope.loading = true;
        Workshops.get({id: $scope.workshopid}).$promise.then(function (value, httpResponse) {
            $scope.workshop = value;

            var _ea = Date.parse($scope.workshop.end_at);
            var _sa = Date.parse($scope.workshop.start_at);
            $scope.workshop.duration = new Date(_ea - _sa);

            $scope.loading = false;
        }, function (httpResponse) {
            $alert({
                title: _translations.TITLE_ERROR,
                type: 'danger',
                content: httpResponse.status,
                container: '#alert',
                dismissable: false,
                show: true
            });
            $scope.loading = false;
        });
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:adminWorkshopDetailsCtrl#loadParticipants
         * @methodOf mainAppCtrls.controller:adminWorkshopDetailsCtrl
         * @description Function to load a list of remaining Participants
         */
        var loadParticipants = function () {
            $scope.loading = true;
            AdminWorkshop.participants({id: $scope.workshopid}).$promise.then(function (value, httpResponse) {
                $scope.participants = value;

                $scope.loading = false;
            }, function (httpResponse) {
                switch (httpResponse.status) {
                    case 404:
                        $alert({
                            title: _translations.TITLE_INFO,
                            type: 'info',
                            content: _translations.ALERT_NO_PARTICIPANTS,
                            container: '#alertParticipant',
                            dismissable: false,
                            show: true,
                            animation: 'am-fade-and-slide-top'
                        });
                }
                $scope.loading = false;
            });

        };
        var loadWaitinglist = function () {
            $scope.loading = true;
            AdminWorkshop.waitinglist({id: $scope.workshopid}).$promise.then(function (response) {
                $scope.waitingList = response;
                $scope.loading = false;
            }, function (response) {
                $scope.loading = false;
            });
        };

        //Load participants
        loadParticipants();

        //Load waitinglist
        loadWaitinglist();
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:adminWorkshopDetailsCtrl#printList
         * @methodOf mainAppCtrls.controller:adminWorkshopDetailsCtrl
         * @description Prints the participants list
         */
        $scope.printList = function () {
            printer.print('resources/views/participantList.tpl.html', $scope.participants, $scope.workshop);
        };

        //Overbook a participant from the waitinglist
        $scope.overbook = function (_id) {
            AdminWorkshop.overbook({id: $scope.workshopid, participantid: _id}).$promise.then(function (response) {
                $alert({
                    type: 'success',
                    duration: 20,
                    container: '#alert',
                    content: _translations.ALERT_SUCCESSFUL_OVERBOOK,
                    show: 'true',
                    title: _translations.TITLE_SUCCESS
                });
                loadParticipants();
                loadWaitinglist();
            }, function (response) {
                $alert({
                    type: 'danger',
                    duration: 20,
                    container: '#alert',
                    content: _translations.ALERT_FAIL_OVERBOOK,
                    show: 'true',
                    title: _translations.TITLE_ERROR
                });
            });
        };

        //Move participant to blacklist
        $scope.blacklistUser = function (_id) {
            Participants.blacklist({id: _id}).$promise.then(function (response) {
                $alert({
                    type: 'success',
                    duration: 20,
                    container: '#alert',
                    content: _translations.ALERT_SUCCESSFUL_BLACKLISTED,
                    show: true,
                    title: _translations.TITLE_SUCCESS
                });
                loadParticipants();
                loadWaitinglist();
            }, function (response) {
                $alert({
                    type: 'danger',
                    duration: 20,
                    container: '#alert',
                    content: _translations.ALERT_FAILED_BLACKLISTED + '(' + response.status + ')',
                    show: true,
                    title: _translations.TITLE_ERROR
                });
            });
        };

        //Remove participant from list
        $scope.remove = function (_participant, _workshop) {
            Participants.remove({participant: _participant, workshop: _workshop}).$promise.then(function (response) {
                $alert({
                    type: 'success',
                    duration: 20,
                    container: '#alert',
                    content: _translations.ALERT_SUCCESSFUL_REMOVED_USER,
                    show: true,
                    title: _translations.TITLE_SUCCESS
                });
                loadParticipants();
                loadWaitinglist();
            }, function (response) {
                $alert({
                    type: 'danger',
                    duration: 20,
                    container: '#alert',
                    content: _translations.ALERT_FAILED_REMOVED_USER + '(' + response.status + ')',
                    show: true,
                    title: _translations.TITLE_ERROR
                });
            });
        };

        //Confirm participantion
        $scope.confirmUser = function (_workshop, _user) {

            AdminWorkshop.confirmParticipation({id: _workshop, participant: _user}).$promise.then(function (response) {
                $alert({
                    type: 'success',
                    duration: 20,
                    container: '#alert',
                    content: _translations.PARTICIPATION_CONFIRM_SUCCESS,
                    show: true,
                    title: _translations.TITLE_SUCCESS
                });
            }, function (response) {
                $alert({
                    type: 'danger',
                    duration: 20,
                    container: '#alert',
                    content: _translations.PARTICIPATION_CONFIRM_ERROR + response.statusText,
                    show: true,
                    title: _translations.TITLE_ERROR
                });
            });
        }

    }
]);