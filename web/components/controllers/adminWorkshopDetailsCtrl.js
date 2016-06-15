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

            $scope.loading = false;
        },function(httpResponse) {
            alert(httpResponse.status + '');
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
            //window.print();
        }

    }
])