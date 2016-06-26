/**
 * Created by hunte on 31/05/2016.
 */

var mainAppCtrls = angular.module("mainAppCtrls");
/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:WorkshopTemplateCtrl
 * @description Displays the workshop-template list in the associated view
 * @requires restSvcs.WorkshopTemplate
 */
mainAppCtrls.controller('WorkshopTemplateCtrl', ['$scope', "WorkshopTemplate",'$translate','$alert',

    function ($scope, WorkshopTemplate,$translate,$alert) {


        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_WORKSHOPTEMPLATE_LIST_EMPTY',
            'ALERT_WORKSHOPTEMPLATE_DELETED_SUCCESS','ALERT_WORKSHOPTEMPLATE_DELETED_FAIL']).
        then(function(translations){
            _translations = translations;
        });
        
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
                if(httpResponse.status == 404){
                    $scope.data = {};
                    $alert({
                        title: '',
                        type: 'warning',
                        container:'#alert',
                        show: true,
                        dismissable: false,
                        content: _translations.ALERT_WORKSHOPTEMPLATE_LIST_EMPTY + ' (' + httpResponse.status +')',
                    })
                }
                $scope.loading = false;
            });
        };
        loadTemplates();
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:WorkshopTemplateCtrl#delete
         * @methodOf mainAppCtrls.controller:WorkshopTemplateCtrl
         * @param {number} _id id of the workshop, which should be deleted
         * @description Deletes the template with the passed id
         */
        $scope.delete = function (_id) {
            WorkshopTemplate.delete({id:_id}).$promise.then(function(httpresponse){
                    $alert({
                        title:'',
                        type: 'success',
                        container:'#alert',
                        show: true,
                        dismissable: false,
                        content: _translations.ALERT_WORKSHOPTEMPLATE_DELETED_SUCCESS,
                        duration: 20
                    });
                    loadTemplates();
                }
                , function (httpResponse) {
                    $alert({
                        title: '',
                        type: 'danger',
                        content: _translations.ALERT_WORKSHOPTEMPLATE_DELETED_FAIL + ' (' + httpReponse.status +')',
                        container: '#alert',
                        dismissable: false,
                        show: true
                    });
                }
            )

        }


    }

]);




