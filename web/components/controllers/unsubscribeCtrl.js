/**
 * Created by hunte on 30/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:UnsubscribeCtrl
 * @description Providing resources used to complete unsubscription from a workshop
 */
mainAppCtrls.controller('UnsubscribeCtrl',['$scope','Workshops','$stateParams','$translate','$alert',
    function($scope,Workshops,$stateParams,$translate,$alert) {

        //Define used variables
        var _userId = $stateParams.id;
        var _workshopId = $stateParams.workshopid;
        var _token = $stateParams.token;

        $scope.workshop = {};
        $scope.alertUnsub = $alert({});

        //get and store translations for errors
        var _translations = {};
        $translate(['TITLE_ERROR','TITLE_SUCCESS','ALERT_WORKSHOP_NOT_FOUND','UNSUBSCRIBE_CONFIRM_ERROR']).then(function(translations){
            _translations = translations;
        });
        $scope.confirm = function() {
            var _params =  {
                id: _workshopId,
                token: _token,
                participantId: _userId
            };
            $scope.working = true;
            Workshops.unsubscribeConfirm(_params).$promise.then(function(response){
                $scope.working = false;
            },function(response){
                $scope.alertUnsub.hide();
                $scope.alertUnsub = $alert({
                    title: _translations.TITLE_ERROR,
                    type: 'danger',
                    content: _translations.UNSUBSCRIBE_CONFIRM_ERROR,
                    show: true,
                    container: '#alert',
                    dismissable: false
                });
                $scope.working = false;
            });
        }

        //Load workshop to display additional data
        $scope.loading = true;
        $scope.error = false;
        Workshops.getWorkshop({id: _workshopId}).$promise.then(function(response){
            $scope.workshop = response;
            var _ea = Date.parse($scope.workshop.end_at);
            var _sa = Date.parse($scope.workshop.start_at);

            $scope.workshop.duration = new Date(_ea - _sa);
            $scope.loading = false;
        },function(response){
            $scope.alertUnsub.hide();
            $scope.alertUnsub = $alert({
               title: _translations.TITLE_ERROR,
               type: 'danger',
               content: _translations.ALERT_WORKSHOP_NOT_FOUND,
               show: true,
               container: '#alert',
               dismissable: false
            });
            $scope.loading = false;
            $scope.error = true;
        });
    }
]);