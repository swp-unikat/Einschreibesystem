/**
 * Created by hunte on 31/05/2016.
 */

var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:WorkshopTemplateCtrl
 * @description Displays the workshop-template list in the associated view
 */
mainAppCtrls.controller('WorkshopTemplateCtrl', ['$scope', "WorkshopTemplate",'$alert', "$modal",

    function ($scope, WorkshopTemplate, $alert,$modal) {

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:WorkshopTemplateCtrl#loadTemplates
         * @methodOf mainAppCtrls.controller:WorkshopTemplateCtrl
         * @description Loads the list of available Templates from the server
         */
        var loadTemplates = function() {
            $scope.loading = true;
            WorkshopTemplate.getAll()
                .$promise.then(function (value) {
                $scope.data = value;
                $scope.loading = false;

            }, function (httpResponse) {
                $scope.loading = false;
            });
        };
        loadTemplates();
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:WorkshopTemplateCtrl#delete
         * @methodOf mainAppCtrls.controller:WorkshopTemplateCtrl
         * @param {number} _id
         * @description Deletes the template with the passed id
         */
        $scope.delete = function (_id) {
            WorkshopTemplate.delete({id:_id}).$promise.then(function(httpresponse){
                    $alert({
                        title:'Success',
                        type: 'success',
                        container:'#alert',
                        show: true,
                        dismissable: false,
                        content: 'Successfully deleted',
                        duration: 20
                    });
                    loadTemplates();
                }
                , function (httpResponse) {
                    alert('Error');
                }
            )

        }


    }

]);




