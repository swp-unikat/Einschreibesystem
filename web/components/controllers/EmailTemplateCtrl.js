/**
 * Created by Ahmet on 04.06.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
* @name mainAppCtrls
* @type {angular.Module}
* @description Module containing all email templates
*/
mainAppCtrls.controller('EmailTemplateCtrl', ['$scope', "EmailTemplate",'$alert','$modal',
    
    function ($scope, EmailTemplate, $alert,$modal) {
        /**
         * @ngdoc function
         * @name mainApp.controller:EmailTemplateCtrl#loadTemplates
         * @methodOf mainApp.controller:EmailTemplateCtrl
         * @description Function loads the actual list of all email templates
         */
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
        /**
         * @ngdoc function
         * @name mainApp.controller:EmailTemplateCtrl#delete
         * @methodOf mainApp.controller:EmailTemplateCtrl
         * @description Function removes a single email template from the list
         */
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
