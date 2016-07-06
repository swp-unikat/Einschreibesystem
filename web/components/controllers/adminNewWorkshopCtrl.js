/**
 * Created by hunte on 12/06/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:AdminNewWorkshopCtrl
 * @description Controller initializing the creation of a new workshop
 * @requires restSvcs.Workshops
 * @requires restSvcs.AdminWorkshop
 */
mainAppCtrls.controller('AdminNewWorkshopCtrl',['$scope',"Workshops","AdminWorkshop",'WorkshopTemplate','$translate','$alert',
    function($scope, Workshops, AdminWorkshop,WorkshopTemplate,$translate,$alert) {
        $scope.workshop = {};

        //load available Workshoptemplates for list
        WorkshopTemplate.getAll().$promise.then(function(response){
            $scope.templates = response;
        },function(response){

        });
        $scope.loadTemplate = function(){
            $scope.workshop = JSON.parse(JSON.stringify($scope.selectedTemplate));
        };
        $scope.workshop.duration=-3600000;
        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_WORKSHOP_NEW_SUCCESS',
            'ALERT_WORKSHOP_NEW_FAIL', 'ALERT_NEGATIVE_COST', 'ALERT_NEGATIVE_PARTICIPANTS', 'ALERT_WORKSHOP_IN_PAST']).
        then(function(translations){
            _translations = translations;
        });
        
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdminNewWorkshopCtrl#sendInfo
         * @description Sends the data of the created workshop to the server
         * @methodOf mainAppCtrls.controller:AdminNewWorkshopCtrl
         */
        $scope.sendInfo = function(){
            //Adjusts the format of the date strings to fit the requirements of the API
            var reformatDate =  function(_date){
                if(_date == null)
                    return "";
                var str = _date.getFullYear()+"-"+(_date.getMonth()+1)+"-"+_date.getDate()+" ";
                if(_date.getHours() < 10)
                    str += "0";
                str += _date.getHours()+":";
                if(_date.getMinutes() < 10)
                    str += "0";
                str += _date.getMinutes() +":";
                if(_date.getSeconds() < 10)
                    str += "0";
                str += _date.getSeconds();
                return str;
            };
            var _sa = Date.parse($scope.workshop.start_at);
            var _duration = $scope.workshop.duration;
            var _ea = new Date(_sa+_duration) ;
            var now = new Date();
            var error = false;
            if($scope.workshop.cost < 0){
                $alert({
                    title: 'Error',
                    type: 'danger',
                    content: _translations.ALERT_NEGATIVE_COST,
                    container: '#alert',
                    dismissable: false,
                    show: true
                });
                error = true;
            }

            if($scope.workshop.max_participants < 0){
                $alert({
                    title: 'Error',
                    type: 'danger',
                    content: _translations.ALERT_NEGATIVE_PARTICIPANTS,
                    container: '#alert',
                    dismissable: false,
                    show: true
                });
                error = true;
            }

            if($scope.workshop.start_at < now) {
                $alert({
                    title: 'Error',
                    type: 'danger',
                    content: _translations.ALERT_WORKSHOP_IN_PAST,
                    container: '#alert',
                    dismissable: false,
                    show: true
                });
                error = true;
            }

            if(error)
                return false;

            var data = {
                title:$scope.workshop.title,
                description:$scope.workshop.description,
                cost:$scope.workshop.cost,
                requirements:$scope.workshop.requirement,
                location:$scope.workshop.location,
                start_at:reformatDate($scope.workshop.start_at),
                end_at:reformatDate(_ea),
                max_participants:$scope.workshop.max_participants
            };
            AdminWorkshop.putWorkshop(data).$promise.then(function(httpResponse){
                $alert({
                    title: '',
                    type: 'success',
                    content: _translations.ALERT_WORKSHOP_NEW_SUCCESS + ' \"' + data.title +'\"',
                    container: '#alert',
                    dismissable: false,
                    show: true
                });
                
            },function(httpResponse){
                $alert({
                    title: '',
                    type: 'danger',
                    content: _translations.ALERT_WORKSHOP_NEW_FAIL + ' (' + httpResponse.status +')',
                    container: '#alert',
                    dismissable: false,
                    show: true
                });
            });
        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdminNewWorkshopCtrl#discard
         * @description Discards the data of the created workshop
         * @methodOf mainAppCtrls.controller:AdminNewWorkshopCtrl
         */
        $scope.discard = function(){

            $scope.workshop.title= "";
            $scope.workshop.description= "";
            $scope.workshop.cost= "";
            $scope.workshop.requirement= "";
            $scope.workshop.location= "";
            $scope.workshop.sharedDate= "";
            $scope.workshop.start_at= "";
            $scope.workshop.duration= "";
            $scope.workshop.max_participants= "";
            if($scope.selectedTemplate != null){
                $scope.workshop = JSON.parse(JSON.stringify($scope.selectedTemplate));
            }

            
        }
        
    }

]);