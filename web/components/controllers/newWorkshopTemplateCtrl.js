/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:AdminNewWorkshopCtrl
 * @description Controller initializing the creation of a new workshop template
 */
mainAppCtrls.controller('NewWorkshopTemplateCtrl',['$scope',"WorkshopTemplate",'$alert',
    function($scope, WorkshopTemplate,$alert) {
        $scope.workshop = {};
        $scope.myAlert;
        /**
         * @ngdoc controller
         * @name mainAppCtrls.controller:AdminNewWorkshopCtrl#sendInfo
         * @methodOf mainAppCtrls.controller:AdminNewWorkshopCtrl
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
            var _ea = new Date(_duration + 1000*60*60);

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
                   title: 'Success',
                   content: 'Successfully created workshop-template '+$scope.workshop.title,
                   show: true,
                   dismissable: false,
                   duration: 20
                });
            },function(httpResponse){
                $scope.myAlert = $alert({
                    container: '#alert',
                    type: 'danger',
                    title: 'Error',
                    content: 'Failed to create template! '+httpResponse.status,
                    show: true,
                    dismissable: false,
                    duration: 20
                });
            });
        };
        /**
         * @ngdoc controller
         * @name mainAppCtrls.controller:AdminNewWorkshopCtrl#discar
         * @methodOf mainAppCtrls.controller:AdminNewWorkshopCtrl
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