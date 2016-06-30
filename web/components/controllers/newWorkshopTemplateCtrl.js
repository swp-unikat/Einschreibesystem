/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:NewWorkshopTemplateCtrl
 * @description Controller initializing the creation of a new workshop template
 * @requires restSvcs.WorkshopTemplate
 */
mainAppCtrls.controller('NewWorkshopTemplateCtrl',['$scope',"WorkshopTemplate",'$translate','$alert',
    function($scope, WorkshopTemplate,$translate,$alert) {
        $scope.workshop = {};
        $scope.myAlert;
        
        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_WORKSHOPTEMPLATE_NEW_SUCCESS',
            'ALERT_WORKSHOPTEMPLATE_NEW_FAIL','ALERT_WORKSHOPTEMPLATE_NOT_FOUND']).
        then(function(translations){
            _translations = translations;
        });
        $scope.workshop.duration=3600000;
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:NewWorkshopTemplateCtrl#sendInfo
         * @methodOf mainAppCtrls.controller:NewWorkshopTemplateCtrl
         * @description Validates the input data and sends a request to create a new Template to the server
         *
         */
        $scope.sendInfo = function(){
            //Adjusts the format of the date strings to fit the requirements of the API
            var reformatDate =  function(_date){
                if(!_date || _date == null)
                    return "";
                var _dateStr = _date.toJSON();
                if(_dateStr == null)
                    return "";
                _dateStr =  _dateStr.slice(0,_dateStr.length-5);
                return _dateStr.replace('T',' ');
            };

            //Initialize start_at to calculate duration with end_at 
            var _sa = new Date(0);
            var _duration = $scope.workshop.duration;
            var _ea = new Date(_duration);


            var data = {
                title:$scope.workshop.title,
                description:$scope.workshop.description,
                cost:$scope.workshop.cost,
                requirements:$scope.workshop.requirement,
                location:$scope.workshop.location,
                start_at:reformatDate(_sa),
                end_at:reformatDate(_ea),
                max_participants:$scope.workshop.max_participants
            };

            if($scope.myAlert != null)
                $scope.myAlert.hide();
            WorkshopTemplate.put(data).$promise.then(function(httpResponse){
                $scope.myAlert = $alert({
                   container: '#alert',
                   type: 'success',
                   title: '',
                   content: _translations.ALERT_WORKSHOPTEMPLATE_NEW_SUCCESS + ' \"' + data.title +'\"',
                   show: true,
                   dismissable: false
                });
            },function(httpResponse){
                $scope.myAlert = $alert({
                    container: '#alert',
                    type: 'danger',
                    title: '',
                    content:  _translations.ALERT_WORKSHOPTEMPLATE_NEW_FAIL + ' (' + httpResponse.status +')',
                    show: true,
                    dismissable: false
                });
            });
        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:NewWorkshopTemplateCtrl#discard
         * @methodOf mainAppCtrls.controller:NewWorkshopTemplateCtrl
         * @description Discards the input
         *
         */
        $scope.discard = function(){
            $scope.workshop.title= "";
            $scope.workshop.description= "";
            $scope.workshop.cost= "";
            $scope.workshop.requirement= "";
            $scope.workshop.location= "";
            $scope.workshop.sharedDate= "";
            $scope.workshop.duration = "";
            $scope.workshop.max_participants= "";



        }



    }

]);