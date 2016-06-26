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
mainAppCtrls.controller('AdminNewWorkshopCtrl',['$scope',"Workshops","AdminWorkshop",'WorkshopTemplate',
    function($scope, Workshops, AdminWorkshop,WorkshopTemplate) {
        $scope.workshop = {};

        //load available Workshoptemplates for list
        WorkshopTemplate.getAll().$promise.then(function(response){
            $scope.templates = response;
        },function(response){

        });
        $scope.loadTemplate = function(){
            $scope.workshop = JSON.parse(JSON.stringify($scope.selectedTemplate));
        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdminNewWorkshopCtrl#sendInfo
         * @description Sends the data of the created workshop to the server
         * @methodOf mainAppCtrls.controller:AdminNewWorkshopCtrl
         */
        $scope.sendInfo = function(){
            //Adjusts the format of the date strings to fit the requirements of the API
            var reformatDate =  function(_date){
                if(!_date)
                    return "";
                var _dateStr = _date.toJSON();
                _dateStr =  _dateStr.slice(0,_dateStr.length-5);
                return _dateStr.replace('T',' ');
            };
            var _sa = Date.parse($scope.workshop.start_at);
            var _duration = $scope.workshop.duration;
            var _ea = new Date(_sa+_duration + 1000*60*60) ;

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
                alert('Success!' + httpResponse.status);
            },function(httpResponse){
                alert('Error'+httpResponse.statusText);
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