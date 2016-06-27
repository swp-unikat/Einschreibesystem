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
mainAppCtrls.controller('adminWorkshopDetailsCtrl',['$scope','Workshops', '$stateParams', "$alert",'printer',
    function($scope,Workshops,$stateParams, $alert,printer) {
        //TODO : replace with workshop details
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
            alert(httpResponse.status + '');
            $scope.loading = false;
        });
        $scope.loading = true;
        Workshops.getParticipants({id: workshopid}).$promise.then(function(value,httpResponse){
            $scope.participants = value;

            $scope.loading = false;
        },function(httpResponse) {
            switch(httpResponse.status){
                case 404:
                    $alert({
                        title: '',
                        type: 'info',
                        content: 'No participants yet',
                        container: '#alertParticipant',
                        dismissable: false,
                        show: true,
                        animation: 'am-fade-and-slide-top'
                    });
            }
            $scope.loading = false;
        });
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:adminWorkshopDetailsCtrl#printList
         * @methodOf mainAppCtrls.controller:adminWorkshopDetailsCtrl
         * @description Prints the participants list
         */
        $scope.printList = function() {
            printer.print('resources/views/participantList.tpl.html',{});
        }
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:adminWorkshopDetailsCtrl#delete
         * @methodOf mainAppCtrls.controller:adminWorkshopDetailsCtrl
         * @param {number} _id id of the partcipant, which should be deleted
         * @description Deletes the participant with the passed id
         */
        $scope.delete = function (_id) {
            Workshops.delete({id:_id}).$promise.then(function(httpresponse){
                    $alert({
                        title:'',
                        type: 'success',
                        container:'#alert',
                        show: true,
                        dismissable: false,
                        content: _translations.ALERT_WORKSHOP_DELETE_PARTICIPANT,
                        duration: 20
                    });
                    loadTemplates();
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

        }
        
        
        
        
    }
])