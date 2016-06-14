/**
 * Created by hunte on 12/06/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:AdminNewWorkshopCtrl
 * @description Controller initializing the creation of a new workshop 
 */
mainAppCtrls.controller('AdminNewWorkshopCtrl',['$scope',"Workshops",
    function($scope, Workshops) {
        $scope.workshop = {};
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdminNewWorkshopCtrl
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
            var data = {
                title:$scope.workshop.title,
                description:$scope.workshop.description,
                cost:$scope.workshop.cost,
                requirements:$scope.workshop.requirement,
                location:$scope.workshop.location,
                start_at:reformatDate($scope.sharedDate),
                end_at:reformatDate($scope.sharedDate),
                max_participants:$scope.workshop.max_participants
            };
            Workshops.put(data).$promise.then(function(httpResponse){
                alert('Success!' + httpResponse.status);
            },function(httpResponse){
                alert('Error'+httpResponse.statusText);
            });
        };
        $scope.discard = function(){
            $scope.workshop.title= "";
            $scope.workshop.description= "";
            $scope.workshop.cost= "";
            $scope.workshop.requirement= "";
            $scope.workshop.location= "";
            $scope.workshop.sharedDate= "";
            $scope.workshop.start_at= "";
            $scope.workshop.end_at= "";
            $scope.workshop.max.participants= "";



        }



    }

]);