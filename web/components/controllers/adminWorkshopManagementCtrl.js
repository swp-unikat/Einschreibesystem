/**
 * Created by Ahmet on 08.06.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:adminWorkshopManagementCtrl
 * @description Shows a list of past and future workshops
 */
mainAppCtrls.controller('adminWorkshopManagementCtrl',['$scope','AdminWorkshop','$alert','$translate',
    function($scope,AdminWorkshop,$alert,$translate) {

        //Define object to store the alert in
        $scope.myAlert;
        $scope.currentList = [];
        $scope.elapsedList = [];
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:adminWorkshopManagementCtrl#compareToCurrent
         * @params {Date} a Date to compare to current Date
         * @methodOf mainAppCtrls.controller:adminWorkshopManagementCtrl
         * @description Compares the give date to the current date
         * @returns {boolean} Returns true if passed date lies in the future
         **/
        var compareToCurrent = function (a){
           var  d1 = new Date();
           var  d2 = new Date(a);
           return (d2.getTime()>d1.getTime())
        };
        //Get and store translation for alert title.
        $translate(['TITLE_ERROR', 'ERROR_NO_WORKSHOPS']).then(function (translations) {
            $scope.errorTitle = translations.TITLE_ERROR;
            $scope.errorMsg = translations.ERROR_NO_WORKSHOPS;
        });
        $scope.loading = true;
        AdminWorkshop.gethistory().$promise.then(function(value){
            var workshopList = value;
            $scope.loading = false;
            for(var i=0;i<workshopList.length;i++) {
                if(compareToCurrent(workshopList[i].start_at))
                    $scope.currentList.push(workshopList[i]);
                else
                    $scope.elapsedList.push(workshopList[i]);
            }
        },function(httpResponse) {
            //switch through all possible errors
            switch(httpResponse.status){
                //Alert for error 404, no workshops available
                case 404:
                    $scope.myAlert = $alert({

                        title: $scope.errorTitle,
                        type: 'danger',
                        content: $scope.errorMsg,
                        container: '#alert',
                        dismissable: false,
                        show: true
                    });
                case 500:
                    $scope.myAlert = $alert({
                        title: $scope.errorTitle,
                        type: 'danger',
                        content: 'Internal server error.',
                        container: '#alert',
                        dismissable: false,
                        show: true
                    })
                    break;
            }
            $scope.loading = false;
        });

    }
]);