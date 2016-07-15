var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:WorkshopListCtrl
 * @description Controller initilasing the workshopList view
 * @requires restSvcs.Workshops
 */
mainAppCtrls.controller('WorkshopListCtrl', ['$scope', 'Workshops', '$alert', '$translate',
    function ($scope, Workshops, $alert, $translate) {

        //Define object to store the alert in
        $scope.myAlert;
        //Get and store translation for alert title.
        $translate(['TITLE_ERROR', 'ERROR_NO_WORKSHOPS', 'ALERT_INTERNAL_SERVER_ERROR']).then(function (translations) {
            $scope.errorTitle = translations.TITLE_ERROR;
            $scope.errorMsg = translations.ERROR_NO_WORKSHOPS;
            $scope.InternalServerError = translations.ALERT_INTERNAL_SERVER_ERROR;
        });
        $scope.loading = true;
        Workshops.getAll().$promise.then(function (value) {
            $scope.workshopList = value;
            $scope.loading = false;
        }, function (httpResponse) {
            //switch through all possible errors
            switch (httpResponse.status) {
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
                    break;
                case 500:
                    $scope.myAlert = $alert({
                        title: $scope.errorTitle,
                        type: 'danger',
                        content: $scope.InternalServerError,
                        container: '#alert',
                        dismissable: false,
                        show: true
                    });
                    break;
            }
            $scope.loading = false;
        });

    }
]);