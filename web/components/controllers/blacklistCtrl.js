var mainAppCtrls = angular.module("mainAppCtrls");
/**
 *
 */
    mainAppCtrls.controller('BlacklistCtrl', ['$scope', "Participants",'$alert','$modal',

        function ($scope, Participants, $alert,$modal) {


            var loadBlacklist = function () {
                $scope.loading = true;
                Participants.getblacklistall()
                    .$promise.then(function (value) {
                    $scope.userdata = value;
                    $scope.loading = false;

                }, function (httpResponse) {
                    $scope.loading = false;
                });
            };
            $scope.delete = function (_id) {
                console.log('called');
                Participants.deleteParticipant({id:_id}).$promise.then(function(httpResponse){
                        $alert({
                            title:'Success',
                            type: 'success',
                            container:'#alert',
                            show: true,
                            dismissable: false,
                            content: 'Successfully deleted',
                            duration: 20
                        });
                        loadBlacklist();
                    }
                    , function (httpResponse) {
                        alert('Error');
                    }
                )

            }
            loadBlacklist();


            
        }
            
            
]);