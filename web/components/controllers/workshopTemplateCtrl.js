/**
 * Created by hunte on 31/05/2016.
 */

var mainAppCtrls = angular.module("mainAppCtrls");
/**
 *
 */
mainAppCtrls.controller('WorkshopTemplateCtrl', ['$scope', "WorkshopTemplate",'$alert',

    function ($scope, WorkshopTemplate, $alert) {


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

        $scope.delete = function (_id) {
            WorkshopTemplate.deleteWorkshopTemplate({id:_id}).$promise.then(function(httpresponse){
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




