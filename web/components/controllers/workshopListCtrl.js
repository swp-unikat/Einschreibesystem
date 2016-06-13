var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * 
 */
mainAppCtrls.controller('WorkshopListCtrl',['$scope','Workshops','$alert','$translate',
    function($scope,Workshops,$alert,$translate) {
        
        //Define object to store the alert in
        $scope.myAlert;
        var getParticipantsNum = function(_id){
            var num = 0;
            Workshops.getParticipants({id: _id}).$promise.then(function(value,httpResponse){
                num = value.length;
            },function(httpResponse) {
               
            });
            return num;
        }
        //Get and store translation for alert title.
        $translate(['TITLE_ERROR', 'ERROR_NO_WORKSHOPS']).then(function (translations) {
            $scope.errorTitle = translations.TITLE_ERROR;
            $scope.errorMsg = translations.ERROR_NO_WORKSHOPS;
        });
        $scope.loading = true;
        Workshops.getAll().$promise.then(function(value){
            $scope.workshopList = value;
            for(var i=0;i<value.length;i++){
                var num = getParticipantsNum($scope.workshopList[i].id);
                $scope.workshopList[i].numParticipants = num;
                console.log($scope.workshopList[i].numParticipants);
            }
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