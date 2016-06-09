/**
 * Created by Ahmet on 04.06.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 *
 */
mainAppCtrls.controller('EmailTemplateCtrl', ['$scope', "EmailTemplate",
    function ($scope, EmailTemplate) {


        var loadTemplates = function() {
            EmailTemplate.getAll()
                .$promise.then(function (value) {
                $scope.data = value;
            }, function (httpResponse) {
                alert('Error' + httpResponse.statusText);
            });
        };
        loadTemplates();

        $scope.delete = function (_id) {
            EmailTemplate.deleteEmailTemplate({id:_id}).$promise.then(function(httpresponse){
                alert('Workshop deleted');
                loadTemplates();
            }
                , function (httpResponse) {
                    alert('Error');
                }
            )

        }


    }

]);
