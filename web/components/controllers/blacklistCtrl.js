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
            loadBlacklist();


        }
            
            
]);