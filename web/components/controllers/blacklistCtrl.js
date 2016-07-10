var mainAppCtrls = angular.module("mainAppCtrls");

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:BlacklistCtrl
 * @description Controller show you a list of blacklisted users
 * @requires restSvcs.Participants
 */
    mainAppCtrls.controller('BlacklistCtrl', ['$scope', "Participants",'$alert','$modal','$translate',

        function ($scope, Participants, $alert,$modal,$translate) {


            //Get translations for errors and store in array
            var _translations = {};
            //Pass all required translation IDs to translate service
            $translate(['ALERT_BLACKLIST_DELETE_PARTICIPANT',
                'ALERT_BLACKLIST_DELETE_PARTICIPANT_FAIL','TITLE_SUCCESS','TITLE_ERROR']).
            then(function(translations){
                _translations = translations;
            });
                /**
                 * @ngdoc function
                 * @name mainAppCtrls.controller:BlacklistCtrl#loadingBlacklist
                 * @methodOf mainAppCtrls.controller:BlacklistCtrl
                 * @description Function to load a list of persons, which were set on the blacklist
                 */
                var loadBlacklist = function (){
                $scope.loading = true;
                Participants.getblacklistall()
                    .$promise.then(function (value) {
                    $scope.userdata = value;
                    $scope.loading = false;

                }, function (httpResponse) {
                    $scope.loading = false;
                });
            };
            /**
             * @ngdoc function
             * @name mainAppCtrls.controller:BlacklistCtrl#delete
             * @methodOf mainAppCtrls.controller:BlacklistCtrl
             * @description Function removes a selected person from the blacklist
             * @params {number} _id user id of the person, which should be removed
             */
            $scope.delete = function (_id) {
                $scope.deleting = true;
                Participants.removeBlacklist({id:_id}).$promise.then(function(httpResponse){
                       $scope.deleting = false;
                        $alert({
                            title: _translations.TITLE_SUCCESS,
                            type: 'success',
                            container:'#alert',
                            show: true,
                            dismissable: false,
                            content: _translations.ALERT_BLACKLIST_DELETE_PARTICIPANT,
                            duration: 20
                        });
                        loadBlacklist();
                    }
                    , function (httpResponse) {
                        $scope.deleting = false;
                        $alert({
                            title: _translations.TITLE_ERROR,
                            type: 'danger',
                            content: _translations.ALERT_BLACKLIST_DELETE_PARTICIPANT_FAIL + ' (' + httpResponse.status +')',
                            container: '#alert',
                            dismissable: false,
                            show: true
                        });
                    }
                )

            }
            loadBlacklist();


            
        }
            
            
]);