/**
 * Created by Ahmet on 31.05.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:WorkshopDetailsCtrl
 * @description Loads workshop details
 * @requires restSvcs.Workshops
 */
mainAppCtrls.controller('WorkshopDetailsCtrl',['$scope','Workshops', '$stateParams', "$alert","$translate",
    function($scope,Workshops,$stateParams, $alert, $translate) {
        $scope.unsub = {};
        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_ENROLLMENT_SUCCSESSFULL','ALERT_NO_PARTICIPANTS','FIRST_NAME','LAST_NAME','EMAIL'
        ,'ALERT_INTERNAL_SERVER_ERROR', 'ALERT_ALREADY_ENROLLED', 'TITLE_SUCCESS','TITLE_ERROR', 'ALERT_YOU_ARE_ON_BLACKLIST','ERROR_UNSUBSCRIBE_FAIL',
        'UNSUBSCRIBE_SUCCESS']).
        then(function(translations){
            _translations = translations;
            $scope.placeholder =  {
                firstname: _translations.FIRST_NAME ,
                lastname: _translations.LAST_NAME,
                emailadress: _translations.EMAIL
            };
            
        });
        
        //TODO : replace with workshop details
        var workshopid = $stateParams.id;
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:WorkshopDetailsCtrl#sendInfo
         * @description Sends the info entered for enrollment to the server
         * @methodOf mainAppCtrls.controller:WorkshopDetailsCtrl
         */
        $scope.sendInfo= function(){
            var first_name=$scope.first_name;   
            var last_name=$scope.last_name;
            var _email=$scope.e_mail;

            //check if input is valid
            var _data = {
              //Data to be send  
              name: first_name,
              surname: last_name,
              email:   _email
            };
            //parameters for url
            var _params = {
              id: workshopid
            };
            Workshops.enroll(_params,_data).$promise.then(function(value,httpResponse){

                $alert({
                    title: _translations.TITLE_SUCCESS,
                    type: 'success',
                    content: _translations.ALERT_ENROLLMENT_SUCCSESSFULL ,
                    container: '#alertEnroll',
                    dismissable: true,
                    duration: 20,
                    show: true,
                    animation: 'am-fade-and-slide-top'
                });
            },function(httpResponse){
                var _msg = "";
                switch(httpResponse.status){
                    case 403:
                        $translate(response.data.message).then(function(_translation){
                            console.log(response.data.message);
                            $translate(response.data.message).then(function(_translation){
                                $alert({
                                    type: 'danger',
                                    title: _translations.TITLE_ERROR,
                                    content: _translation,
                                    show: true,
                                    duration: 20,
                                    container: '#alertEnroll',
                                    dismissable: true
                                });
                            });
                        });
                        break;
                    case 500:
                        $alert({
                            type: 'danger',
                            title: _translations.TITLE_ERROR,
                            content: _translations.ALERT_INTERNAL_SERVER_ERROR,
                            show: true,
                            duration: 20,
                            container: '#alertEnroll',
                            dismissable: true
                        });
                        ;
                        break;
                    default:
                        $alert({
                            type: 'danger',
                            title: _translations.TITLE_ERROR,
                            content: response.data.message,
                            show: true,
                            duration: 20,
                            container: '#alertEnroll',
                            dismissable: true
                        });

                        _
                }

            });
        };

        $scope.unsubscribe= function(){
            var _data = {
                email: $scope.unsub.e_mail,
                workshopId: workshopid
            }
            Workshops.unsubscribe(_data).$promise.then(function(response){
                $alert({
                   type: 'success',
                   title: _translations.TITLE_SUCCESS,
                   content: _translations.UNSUBSCRIBE_SUCCESS,
                   dismissable: true,
                   duration: 20,
                   show: true,
                   container: '#alertEnroll'
                });
            },function(response){
                var _msg = "";
               switch(response.status){
                   case 404:
                       console.log(response.data.message);
                       $translate(response.data.message).then(function(_translation){
                           $alert({
                               type: 'danger',
                               title: _translations.TITLE_ERROR,
                               content: _translation,
                               show: true,
                               duration: 20,
                               container: '#alertEnroll',
                               dismissable: true
                           });
                       });
                       break;
                   default:
                       $alert({
                           type: 'danger',
                           title: _translations.TITLE_ERROR,
                           content: _translations.ERROR_UNSUBSCRIBE_FAIL + ": "+response.statusText,
                           show: true,
                           duration: 20,
                           container: '#alertEnroll',
                           dismissable: true
                       });
               }
            });
        };
        
        $scope.loading = true;
        Workshops.get({id: workshopid}).$promise.then(function(value){
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
                        content: _translations.ALERT_NO_PARTICIPANTS,
                        container: '#alertParticipant',
                        dismissable: false,
                        show: true,
                        animation: 'am-fade-and-slide-top'
                    });
            }
            $scope.loading = false;
        });
        $scope.loading = true;
        Workshops.getWaitinglist({id: workshopid}).$promise.then(function(response){
            $scope.waitingList = response;
            $scope.loading = false;
        },function(response){
            $scope.loading = false;
        });

    }
]);