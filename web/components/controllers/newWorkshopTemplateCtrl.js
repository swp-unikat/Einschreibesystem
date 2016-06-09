/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 *
 */
mainAppCtrls.controller('NewWorkshopTemplateCtrl',['$scope',"WorkshopTemplate",
    function($scope, WorkshopTemplate) {

        $scope.sendInfo = function(){
            var data={
                title:$scope.workshop.title,
                description:$scope.workshop.description,
                cost:$scope.workshop.cost,
                requirements:$scope.workshop.requirement,
                location:$scope.workshop.location,
                start_at:$scope.sharedDate,
                end_at:JSON.stringify(new Date(2016,10,10,10,10,0,0)),
                max_participants: 15
            }
            WorkshopTemplate.putWorkshopTemplate(data).$promise.then(function(value){
                alert('Success!');
            },function(httpResponse){
                alert('Error'+httpResponse.statusText);
            });
        }


    }

]);