/**
 * Created by Ahmet on 08.06.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 *
 */
mainAppCtrls.controller('adminWorkshopManagementCtrl',['$scope','AdminWorkshop','$alert','$translate',
    function($scope,AdminWorkshop,$alert,$translate) {

        //Define object to store the alert in
        $scope.myAlert;
        //returns true if date is in future
        //returns false if date is in past
        var compareToCurrent = function (a){
           var  d1 = Date.now();
           var  d2 = JSON.parse(a);
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