/**
 * Created by Ahmet on 04.06.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:EmailTemplateCtrl
 * @description Module containing all email templates
 * @requires restSvscs.EmailTemplate
 */
mainAppCtrls.controller('EmailTemplateCtrl', ['$scope', "EmailTemplate", '$alert', '$modal', '$translate',

    function ($scope, EmailTemplate, $alert, $modal, $tramslate) {

        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_EMAILTEMPLATE_DELETE_SUCCESS', 'ALERT_EMAILTEMPLATE_DELETE_FAIL']).then(function (translations) {
            _translations = translations;
        });

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:EmailTemplateCtrl#loadTemplates
         * @methodOf mainAppCtrls.controller:EmailTemplateCtrl
         * @description Function loads the actual list of all email templates
         */
        var loadTemplates = function () {
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
         * @name mainAppCtrls.controller:EmailTemplateCtrl#delete
         * @methodOf mainAppCtrls.controller:EmailTemplateCtrl
         * @description Function removes a single email template from the list
         * @params {number} _id email template id, which should be removed
         */
        $scope.delete = function (_id) {
            EmailTemplate.delete({id: _id}).$promise.then(function (httpResponse) {
                    $alert({
                        title: 'Success',
                        type: 'success',
                        container: '#alert',
                        show: true,
                        dismissable: false,
                        content: _translations.ALERT_EMAILTEMPLATE_DELETE_SUCCESS,
                        duration: 20
                    });
                    loadTemplates();
                }
                , function (httpResponse) {
                    $alert({
                        title: '',
                        type: 'danger',
                        content: _translations.ALERT_EMAILTEMPLATE_DELETE_FAIL + ' (' + httpResponse.status + ')',
                        container: '#alert',
                        dismissable: false,
                        show: true
                    });
                }
            )

        }


    }

]);
