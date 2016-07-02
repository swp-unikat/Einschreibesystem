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
mainAppCtrls.controller('adminWorkshopDetailsCtrl',['$scope','Workshops','Participants', '$stateParams', "$alert",'printer','$translate','AdminWorkshop',
    function($scope,Workshops,Participants, $stateParams, $alert,printer,$translate,AdminWorkshop) {
        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_NO_PARTICIPANTS']).
        then(function(translations){
            _translations = translations;
        });
        
        var workshopid;
        workshopid = $stateParams.id;
        $scope.loading = true;
        Workshops.get({id: workshopid}).$promise.then(function(value,httpResponse){
            $scope.workshop = value;

            var _ea = Date.parse($scope.workshop.end_at);
            var _sa = Date.parse($scope.workshop.start_at);
            $scope.workshop.duration = new Date(_ea - _sa);
            
            $scope.loading = false;
        },function(httpResponse) {
            $alert({
                title: '',
                type: 'danger',
                content: httpReponse.status,
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
        var loadParticipants = function (){
            $scope.loading = true;
            AdminWorkshop.participants({id: workshopid}).$promise.then(function(value,httpResponse){
                $scope.participants = value;

                $scope.loading = false;
            },function(httpResponse) {
                switch(httpResponse.status){
                    case 404:
                        $alert({
                            title: '',
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
        var loadWaitinglist = function() {
            $scope.loading = true;
            AdminWorkshop.waitinglist({id: workshopid}).$promise.then(function(response){
                $scope.waitingList = response;
                $scope.loading = false;
            },function(response){
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
        $scope.printList = function() {
            printer.print('resources/views/participantList.tpl.html',$scope.participants);
        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:adminWorkshopDetailsCtrl#delete
         * @methodOf mainAppCtrls.controller:adminWorkshopDetailsCtrl
         * @param {number} _id id of the participant, which should be removed from the workshop
         * @description Deletes the participant with the passed id
         */
        $scope.delete = function (_workshop,_participant) {
            Participants.delete({participant:_participant,workshop:_workshop}).$promise.then(function(httpresponse){
                    $alert({
                        title:'',
                        type: 'success',
                        container:'#alert',
                        show: true,
                        dismissable: false,
                        content: _translations.ALERT_WORKSHOP_DELETE_PARTICIPANT,
                        duration: 20
                    });
                    loadList();
                }
                , function (httpResponse) {
                    $alert({
                        title: '',
                        type: 'danger',
                        content: _translations.ALERT_WORKSHOP_DELETE_PARTICIPANT_FAIL + ' (' + httpReponse.status +')',
                        container: '#alert',
                        dismissable: false,
                        show: true
                    });
                }
            )

        };

        //Overbook a participant from the waitinglist

        $scope.overbook = function(_id){
            AdminWorkshop.overbook({id: workshopid,participantid: _id}).$promise.then(function(response){
                $alert({
                   type: 'success',
                   duration: 20,
                   container: '#alert',
                   content: 'Successfully overbooked workshop',
                   show: 'true',
                    title: 'Success'
                });
                loadParticipants();
                loadWaitinglist();
            },function(response){
                $alert({
                    type: 'danger',
                    duration: 20,
                    container: '#alert',
                    content: 'Successfully overbooked workshop',
                    show: 'true',
                    title: 'Error'
                });
            });
        };
        
        //Move participant to blacklist
        $scope.blacklistUser = function (_id){
            Participants.blacklist({id: _id}).$promise.then(function(response){
                $alert({
                    type: 'success',
                    duration: 20,
                    container: '#alert',
                    content: 'User was blacklisted',
                    show: true,
                    title: 'Success'
                });
            },function(response){
                $alert({
                    type: 'danger',
                    duration: 20,
                    container: '#alert',
                    content: 'Failed to blacklist user ('+response.status+')',
                    show: true,
                    title: 'Error'
                });
            });
        };

        //Remove participant from list
        $scope.remove = function(_id){
          Participants.remove({id: _id}).$promise.then(function(response){
              $alert({
                  type: 'success',
                  duration: 20,
                  container: '#alert',
                  content: 'Removed participant from list',
                  show: true,
                  title: 'Success'
              });
            },function(response){
              $alert({
                  type: 'danger',
                  duration: 20,
                  container: '#alert',
                  content: 'Failed to remove user ('+response.status+')',
                  show: true,
                  title: 'Error'
              });
            });
        };
        
        
        
        
    }
]);