/**
 * Created by Ahmet on 04.06.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 *
 */
mainAppCtrls.controller('EmailTemplateCtrl', ['$scope', "EmailTemplate",'$alert','$modal',
    
    function ($scope, EmailTemplate, $alert,$modal) {


        var loadTemplates = function() {
            $scope.loading = true;
            EmailTemplate.getAll()
                .$promise.then(function (value) {
                $scope.data = value;
                $scope.loading = false;

            }, function (httpResponse) {
                $scope.loading = false;
            });
        };
        loadTemplates();

        $scope.delete = function (_id) {
            EmailTemplate.delete({id:_id}).$promise.then(function(httpResponse){
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
