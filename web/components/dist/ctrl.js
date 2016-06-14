'use strict';
var mainAppCtrls = angular.module("mainAppCtrls");
// Source: web/components/controllers/dashboardCtrl.js

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:DashboardCtrl
 * @description Controller for showing administrator functions
 */
//TODO: if /dashboard is called, change hideDashboard to false
mainAppCtrls.controller('DashboardCtrl',['$scope',
    function($scope) {
        
    }

]);


// Source: web/components/controllers/AdminCreateCtrl.js
/**
 * Created by Valle on 31.05.2016.
 */

mainAppCtrls.controller('AdminCreateCtrl',['$scope', '$stateParams','$alert',
    function($scope,$stateParams,$alert) {
        //TODO: replace static text with translations
        $scope.placeholder =  {
            username: "Username",
            password: "Password",
            confirm_password: "Confirm Password"
        };
        //TODO: add errors for no username, no password, not authorozizied
        $scope.myAlert = $alert({

            title: 'Error',
            type: 'danger',
            content: 'Passwords must be identical',
            container: '#alert',
            show: false,
            dismissable: false
        });
        var token = $stateParams.token;

        //compare password and confirm_password and send data through API
        $scope.sendInfo = function(){
            var match = ($scope.password_confirm == $scope.password);
            if(!match){

                $scope.password_confirm = "";
                $scope.myAlert.show();
                return;
            }
            else{
                $scope.myAlert.hide();
                //TODO: send request to api to create new account
            }
        };
    }
]);


// Source: web/components/controllers/EmailTemplateCtrl.js
/**
 * Created by Ahmet on 04.06.2016.
 */

/**
 * @ngdoc controller
* @name mainAppCtrls.controller:EmailTemplateCtrl
* @description Module containing all email templates
*/
mainAppCtrls.controller('EmailTemplateCtrl', ['$scope', "EmailTemplate",'$alert','$modal',
    
    function ($scope, EmailTemplate, $alert,$modal) {
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:EmailTemplateCtrl#loadTemplates
         * @methodOf mainAppCtrls.controller:EmailTemplateCtrl
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
         * @name mainAppCtrls.controller:EmailTemplateCtrl#delete
         * @methodOf mainAppCtrls.controller:EmailTemplateCtrl
         * @description Function removes a single email template from the list
         * @params {number} _id email template id, which should be removed
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


// Source: web/components/controllers/adminEditWorkshopCtrl.js
/**
 * Created by hunte on 12/06/2016.
 */

/**
 * @ngdoc controller
 * @requires restSvcs.AdminWorkshop
 * @requires restSvcs.Workshops
 * @description Controller for editing a workshop . Provides
 * @name mainAppCtrls.controller:AdminEditWorkshopCtrl
 */
mainAppCtrls.controller('AdminEditWorkshopCtrl',['$scope','Workshops','AdminWorkshop','$stateParams','$translate','$alert',
    function($scope,Workshops,AdminWorkshop,$stateParams,$translate,$alert) {

        var _workshopId = $stateParams.id;

        //Initialize _originalData
        var _originalData = {};
        $scope.workshop ={};
        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_WORKSHOP_EDIT_SUCCESS',
            'ALERT_WORKSHOP_EDIT_FAIL','ALERT_WORKSHOP_NOT_FOUND']).
        then(function(translations){
            _translations = translations;
        });

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdminEditWorkshopCtrl#discardChanges
         * @description Discards changes and restores the original data
         * @methodOf mainAppCtrls.controller:AdminEditWorkshopCtrl
         */
        $scope.discardChanges = function () {
            $scope.workshop.title = _originalData.title;
            $scope.workshop.description = _originalData.description;
            $scope.workshop.cost = _originalData.cost;
            $scope.workshop.requirements = _originalData.requirements;
            $scope.workshop.location = _originalData.location;
            $scope.workshop.start_at = _originalData.start_at;
            $scope.workshop.end_at = _originalData.end_at;
            $scope.workshop.max_participants = _originalData.max_participants;




        }

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdminEditWorkshopCtrl#confirmChanges
         * @description Sends changes to the API and stores them as new original data
         * @methodOf mainAppCtrls.controller:AdminEditWorkshopCtrl
         */
        $scope.confirmChanges = function () {
            var _dataToSend = {
                title: '',
                description: '',
                cost: '',
                requirements: '',
                location: '',
                start_at: '',
                end_at: '',
                max_participants: ''

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

            //compare all properties of both objects
            if (_changedData.title != _originalData.title)
                _dataToSend.title = _changedData.title;
            if (_changedData.description != _originalData.description)
                _dataToSend.description = _changedData.description;
            if (_changedData.cost != _originalData.cost)
            if (_changedData.location != _originalData.location)
                _dataToSend.location = _changedData.location;
            if (_changedData.start_at != _originalData.start_at)
                _dataToSend.start_at = _changedData.start_at;
            if (_changedData.end_at != _originalData.end_at)
                _dataToSend.end_at = _changedData.end_at;
            if (_changedData.max_participants != _originalData.max_participants)
                _dataToSend.max_participants = _changedData.max_participants;



            Workshops.edit({id: _workshopId}, _dataToSend).$promise.then(function (value) {
                //Store answer from server
                _originalData = {
                    title: value.title,
                    description: value.title,
                    cost: value.title,
                    requirements: value.title,
                    location: value.title,
                    start_at: value.title,
                    end_at: value.end_at,
                    max_participants: value.max_participants

                };
                $alert({
                    title: '',
                    type: 'success',
                    content: _translations.ALERT_WORKSHOP_EDIT_SUCCESS + ' \"' + _originalData.title +'\"',
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 30
                });
            }, function (httpResponse) {
                $alert({
                    title: '',
                    type: 'danger',
                    content: _translations.ALERT_WORKSHOP_EDIT_FAIL + '(' + httpReponse.status +')',
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 60
                });
            });
        }

        //Fetch data from API
        $scope.loading = true;
        Workshops.get({id: _workshopId}).$promise.then(function (value) {

            //Store original data in case of discard
            _originalData = {
                title: value.title,
                description: value.description,
                cost: value.cost,
                requirements: value.requirements,
                location: value.location,
                start_at: value.start_at,
                end_at: value.end_at,
                max_participants: value.max_participants

            };
            //Store original data in ng-model
            $scope.workshop.title = _originalData.title;
            $scope.workshop.description = _originalData.description;
            $scope.workshop.cost = _originalData.cost;
            $scope.workshop.requirements = _originalData.requirements;
            $scope.workshop.location = _originalData.location;
            $scope.workshop.start_at = _originalData.start_at;
            $scope.workshop.end_at = _originalData.end_at;
            $scope.workshop.max_participants = _originalData.max_participants;



            $scope.loading = false;
        }, function (httpResponse) {
            if(httpResponse.status === 404)
                $alert({
                    title: '',
                    type: 'danger',
                    content: _translations.ALERT_WORKSHOP_NOT_FOUND,
                    container: '#alert',
                    dismissable: false,
                    show: true
                });

            $scope.loading = false;
        });
    }
]);

// Source: web/components/controllers/adminNewWorkshopCtrl.js
/**
 * Created by hunte on 12/06/2016.
 */

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:AdminNewWorkshopCtrl
 * @description Controller initializing the creation of a new workshop 
 */
mainAppCtrls.controller('AdminNewWorkshopCtrl',['$scope',"Workshops","AdminWorkshop",
    function($scope, Workshops, AdminWorkshop) {
        $scope.workshop = {};
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
            $scope.workshop.max.participants= "";



        }



    }

]);

// Source: web/components/controllers/adminWorkshopDetailsCtrl.js
/**
 * Created by Ahmet on 08.06.2016.
 */


/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:adminWorkshopDetailsCtrl
 * @requires restSvcs.Workshops
 * @description Controller for showing administrator functions
 */
mainAppCtrls.controller('adminWorkshopDetailsCtrl',['$scope','Workshops', '$stateParams', "$alert",
    function($scope,Workshops,$stateParams, $alert) {
        //TODO : replace with workshop details
        var workshopid;
        workshopid = $stateParams.id;
        $scope.loading = true;
        Workshops.get({id: workshopid}).$promise.then(function(value,httpResponse){
            $scope.workshop = value;

            $scope.loading = false;
        },function(httpResponse) {
            alert(httpResponse.status + '');
            $scope.loading = false;
        });

    }
])

// Source: web/components/controllers/adminWorkshopManagementCtrl.js
/**
 * Created by Ahmet on 08.06.2016.
 */

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:adminWorkshopManagementCtrl
 * @description Shows a list of past and future workshops
 */
mainAppCtrls.controller('adminWorkshopManagementCtrl',['$scope','AdminWorkshop','$alert','$translate',
    function($scope,AdminWorkshop,$alert,$translate) {

        //Define object to store the alert in
        $scope.myAlert;
        $scope.currentList = [];
        $scope.elapsedList = [];
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:adminWorkshopManagementCtrl#compareToCurrent
         * @params {Date} a Date to compare to current Date
         * @methodOf mainAppCtrls.controller:adminWorkshopManagementCtrl
         * @description Compares the give date to the current date
         * @returns {boolean} Returns true if passed date lies in the future
         **/
        var compareToCurrent = function (a){
           var  d1 = new Date();
           var  d2 = new Date(a);
           return (d2.getTime()>d1.getTime())
        };
        //Get and store translation for alert title.
        $translate(['TITLE_ERROR', 'ERROR_NO_WORKSHOPS']).then(function (translations) {
            $scope.errorTitle = translations.TITLE_ERROR;
            $scope.errorMsg = translations.ERROR_NO_WORKSHOPS;
        });
        $scope.loading = true;
        AdminWorkshop.gethistory().$promise.then(function(value){
            var workshopList = value;
            $scope.loading = false;
            for(var i=0;i<workshopList.length;i++) {
                if(compareToCurrent(workshopList[i].start_at))
                    $scope.currentList.push(workshopList[i]);
                else
                    $scope.elapsedList.push(workshopList[i]);
            }
        },function(httpResponse) {
            //switch through all possible errors
            switch(httpResponse.status){
                //Alert for error 404, no workshops available
                case 404:
                    $scope.myAlert = $alert({

                        title: $scope.errorTitle,
                        type: 'danger',
                        content: $scope.errorMsg,
                        container: '#alert',
                        dismissable: false,
                        show: true
                    });
                case 500:
                    $scope.myAlert = $alert({
                        title: $scope.errorTitle,
                        type: 'danger',
                        content: 'Internal server error.',
                        container: '#alert',
                        dismissable: false,
                        show: true
                    })
                    break;
            }
            $scope.loading = false;
        });

    }
]);

// Source: web/components/controllers/administratorManagementCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:AdministratorManagementCtrl
 * @descirption Controller for managing administrator list
 */
mainAppCtrls.controller('AdministratorManagementCtrl',['$scope','Admin',
    function($scope,Admin) {
        Admin.list().$promise.then(function(value){
            $scope.admins = value;
        },function(httpResponse){
            alert(httpResponse.status);
        });
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdministratorManagementCtrl#delete
         * @description Deletes the admin who has the selected id
         * @param {number} _id ID of the admin to delete
         * @methodOf mainAppCtrls.controller:AdministratorManagementCtrl
         */
        $scope.delete = function(_id) {
            Admin.delete({id: _id}).$promise.then(function(value){
                
            },function(httpResponse){
                
            });
        }
    }

]);

// Source: web/components/controllers/blacklistCtrl.js


/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:BlacklistCtrl
 * @description Controller show you a list of blacklisted users
 */
    mainAppCtrls.controller('BlacklistCtrl', ['$scope', "Participants",'$alert','$modal',

        function ($scope, Participants, $alert,$modal) {

                /**
                 * @ngdoc function
                 * @name mainAppCtrls.controller:BlacklistCtrl#loadingBlacklist
                 * @methodOf mainAppCtrls.controller:BlacklistCtrl
                 * @description Function load a list of persons, which were set on the blacklist
                 */
                var loadBlacklist = function (){
                $scope.loading = true;
                Participants.getblacklistall()
                    .$promise.then(function (value) {
                    $scope.userdata = value;
                    $scope.loading = false;

                }, function (httpResponse) {
                    $scope.loading = false;
                });
            };
            /**
             * @ngdoc function
             * @name mainAppCtrls.controller:BlacklistCtrl#delete
             * @methodOf mainAppCtrls.controller:BlacklistCtrl
             * @description Function removes a selected person from the blacklist
             * @params {number} _id user id of the person, which should be removed
             */
            $scope.delete = function (_id) {
                $scope.deleting = true;
                Participants.deleteParticipant({id:_id}).$promise.then(function(httpResponse){
                       $scope.deleting = false;
                        $alert({
                            title:'Success',
                            type: 'success',
                            container:'#alert',
                            show: true,
                            dismissable: false,
                            content: 'Successfully deleted',
                            duration: 20
                        });
                        loadBlacklist();
                    }
                    , function (httpResponse) {
                        $scope.deleting = false;
                        alert('Error');
                    }
                )

            }
            loadBlacklist();


            
        }
            
            
]);

// Source: web/components/controllers/contactCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:ContactCtrl
 * @description Controller for showing contacts
 */
mainAppCtrls.controller('ContactCtrl',['$scope',
    function($scope) {
        
    }

]);

// Source: web/components/controllers/editEmailTemplateCtrl.js

/**
 * @ngdoc controller
 * @requires restSvcs.EmailTemplate
 * @description Controller for editing a workshop template. Provide
 * @name mainAppCtrls.controller:EditEmailTemplateCtrl
 */
mainAppCtrls.controller('EditEmailTemplateCtrl',['$scope','EmailTemplate','$stateParams','$translate','$alert',
    function($scope,EmailTemplate,$stateParams,$translate,$alert) {
        
        var _workshopId = $stateParams.id;

        //Initialize _originalData
        var _originalData = {};

        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_EMAILTEMPLATE_EDIT_SUCCESS',
            'ALERT_EMAILTEMPLATE_EDIT_FAIL','ALERT_EMAILTEMPLATE_NOT_FOUND']).
        then(function(translations){
            _translations = translations;
        });

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:EditEmailTemplateCtrl#discardChanges
         * @description Discards changes and restores the original data
         * @methodOf mainAppCtrls.controller:EditEmailTemplateCtrl
         */
        $scope.discardChanges = function () {
            $scope.title = _originalData.title;
            $scope.email = _originalData.email;
        }

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:EditEmailTemplateCtrl#confirmChanges
         * @description Sends changes to the API and stores them as new original data
         * @methodOf mainAppCtrls.controller:EditEmailTemplateCtrl
         */
        $scope.confirmChanges = function () {
            var _dataToSend = {
                template_name: '',
                email_subject: '',
                email_body: ''
            };
            var _changedData = {
                title: $scope.title,
                email: $scope.email
            };

            //compare all properties of both objects
            if (_changedData.title != _originalData.title)
                _dataToSend.template_name = _changedData.title;
            if (_changedData.email.body != _originalData.email.body)
                _dataToSend.email_body = _changedData.email.body;
            if (_changedData.email.subject != _originalData.email.subject)
                _dataToSend.email_subject = _changedData.email.subject;

            EmailTemplate.edit({id: _workshopId}, _dataToSend).$promise.then(function (value) {
                //Store answer from server
                _originalData = {
                    title: value.template_name,
                    email: {
                        subject: value.email_subject,
                        body: value.email_body
                    }
                };
                $alert({
                    title: '',
                    type: 'success',
                    content: _translations.ALERT_EMAILTEMPLATE_EDIT_SUCCESS + ' \"' + _originalData.title +'\"',
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 30
                });
            }, function (httpResponse) {
                    $alert({
                        title: '',
                        type: 'danger',
                        content: _translations.ALERT_EMAILTEMPLATE_EDIT_FAIL + '(' + httpReponse.status +')',
                        container: '#alert',
                        dismissable: true,
                        show: true,
                        duration: 60
                    });
            });
        }

        //Fetch data from API
        $scope.loading = true;
        EmailTemplate.get({id: _workshopId}).$promise.then(function (value) {

            //Store original data in case of discard
            _originalData = {
                title: value.template_name,
                email: {
                    subject: value.email_subject,
                    body: value.email_body
                }
            };
            //Store original data in ng-model
            $scope.title = _originalData.title;
            //IMPORTANT DEEP COPY ARRAYS, SO NO REFERENCE IS CREATED
            $scope.email = {
                body: _originalData.email.body,
                subject: _originalData.email.subject
            };
            $scope.loading = false;
        }, function (httpResponse) {
            if(httpResponse.status === 404)
                $alert({
                    title: '',
                    type: 'danger',
                    content: _translations.ALERT_EMAILTEMPLATE_NOT_FOUND,
                    container: '#alert',
                    dismissable: false,
                    show: true
                });

            $scope.loading = false;
        });
    }
]);

// Source: web/components/controllers/editWorkshopTemplateCtrl.js

/**
 * @ngdoc controller
 * @requires restSvcs.WorkshopTemplate
 * @description Controller for editing a workshop template.
 * @name mainAppCtrls.controller:EditWorkshopTemplateCtrl
 */
mainAppCtrls.controller('EditWorkshopTemplateCtrl',['$scope','WorkshopTemplate','$stateParams','$translate','$alert',
    function($scope,WorkshopTemplate,$stateParams,$translate,$alert) {

        var _workshopId = $stateParams.id;
        $scope.workshop = {};
        //Initialize _originalData
        var _originalData = {};

        //Get translations for errors and store in array
        var _translations = {};
        //Pass all required translation IDs to translate service
        $translate(['ALERT_WORKSHOPTEMPLATE_EDIT_SUCCESS',
            'ALERT_WORKSHOPTEMPLATE_EDIT_FAIL','ALERT_WORKSHOPTEMPLATE_NOT_FOUND']).
        then(function(translations){
            _translations = translations;
        });

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:EditWorkshopTemplateCtrl#discard
         * @description Discards changes and restores the original data
         * @methodOf mainAppCtrls.controller:EditWorkshopTemplateCtrl
         */
        $scope.discard = function () {

            $scope.workshop.title = _originalData.title;
            $scope.workshop.description = _originalData.description;
            $scope.workshop.cost = _originalData.cost;
            $scope.workshop.requirements = _originalData.requirements;
            $scope.workshop.location = _originalData.location;
            $scope.workshop.start_at = _originalData.start_at;
            $scope.workshop.end_at = _originalData.end_at;
            $scope.workshop.max_participants = _originalData.max_participants;
        }

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:EditWorkshopTemplateCtrl#sendInfo
         * @description Sends changes to the API and stores them as new original data
         * @methodOf mainAppCtrls.controller:EditWorkshopTemplateCtrl
         */
        $scope.sendInfo = function () {
            var _dataToSend = {
                title: '',
                description: '',
                cost: '',
                requirements: '',
                location: '',
                start_at: '',
                end_at: '',
                max_participants: ''
                
            };
            var _sa = new Date(_originalData.start_at);
            var _duration = $scope.workshop.duration;
            var _ea = new Date(_duration + 1000*60*60);
            var _changedData = {
                
                title: $scope.workshop.title,
                description: $scope.workshop.description,
                cost: $scope.workshop.cost,
                requirements: $scope.workshop.requirements,
                location: $scope.workshop.location,
                start_at: $scope.workshop.start_at,
                end_at: $scope.workshop.end_at,
                max_participants: $scope.workshop.max_participants
            };

            //compare all properties of both objects
            if (_changedData.title != _originalData.title)
                _dataToSend.title = _changedData.title;
            if (_changedData.description != _originalData.description)
                _dataToSend.description = _changedData.description;
            if (_changedData.cost != _originalData.cost)
                _dataToSend.cost = _changedData.cost;
            if (_changedData.location != _originalData.location)
                _dataToSend.location = _changedData.location;
            if (_changedData.start_at != _originalData.start_at)
                _dataToSend.start_at = _changedData.start_at;
            if (_changedData.end_at != _originalData.end_at)
                _dataToSend.end_at = _changedData.end_at;
            if (_changedData.max_participants != _originalData.max_participants)
                _dataToSend.max_participants = _changedData.max_participants;



            WorkshopTemplate.edit({id: _workshopId}, _dataToSend).$promise.then(function (value) {
                //Store answer from server
                _originalData = {
                    title: value.title,
                    description: value.title,
                    cost: value.title,
                    requirements: value.title,
                    location: value.title,
                    start_at: value.title,
                    end_at: value.end_at,
                    max_participants: value.max_participants
                    
                };
                $alert({
                    title: '',
                    type: 'success',
                    content: _translations.ALERT_WORKSHOPTEMPLATE_EDIT_SUCCESS + ' \"' + _originalData.title +'\"',
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 30
                });
            }, function (httpResponse) {
                $alert({
                    title: '',
                    type: 'danger',
                    content: _translations.ALERT_WORKSHOPTEMPLATE_EDIT_FAIL + '(' + httpReponse.status +')',
                    container: '#alert',
                    dismissable: true,
                    show: true,
                    duration: 60
                });
            });
        }

        //Fetch data from API
        $scope.loading = true;
        WorkshopTemplate.get({id: _workshopId}).$promise.then(function (value) {

            //calculate duration
            var _ea = Date.parse(value.end_at);
            var _sa = Date.parse(value.start_at);
            var _duration = _ea - _sa;
            //Store original data in case of discard
            _originalData = {
                title: value.title,
                description: value.description,
                cost: value.cost,
                requirements: value.requirements,
                location: value.location,
                duration: _duration,
                max_participants: value.max_participants

            };

            //Store original data in ng-model
            $scope.workshop.title = _originalData.title;
            $scope.workshop.description = _originalData.description;
            $scope.workshop.cost = _originalData.cost;
            $scope.workshop.requirements = _originalData.requirements;
            $scope.workshop.location = _originalData.location;
            $scope.workshop.duration = _originalData.duration;
            $scope.workshop.max_participants = _originalData.max_participants;
            



            $scope.loading = false;
        }, function (httpResponse) {
            if(httpResponse.status === 404)
                $alert({
                    title: '',
                    type: 'danger',
                    content: _translations.ALERT_WORKSHOPTEMPLATE_NOT_FOUND,
                    container: '#alert',
                    dismissable: false,
                    show: true
                });

            $scope.loading = false;
        });
    }
]);

// Source: web/components/controllers/enrollmentConfirmCtrl.js
/**
 * Created by hunte on 30/05/2016.
 */

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:EnrollmentConfirmCtrl
 * @description Controller for showing enrollment confirm
 */
mainAppCtrls.controller('EnrollmentConfirmCtrl',['$scope',
    function($scope) {

    }

]);

// Source: web/components/controllers/legalNoticeCtrl.js
/**
 * Created by hunte on 08/06/2016.
 */

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:LegalNoticeCtrl
 * @description Controller for showing legal notice
 */
mainAppCtrls.controller('LegalNoticeCtrl',['$scope',
    function($scope) {
 
    }

]);

// Source: web/components/controllers/loginCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:LoginCtrl
 * @description Controller handling the login process. Associated with the login view
 */
mainAppCtrls.controller('LoginCtrl',['$scope','$http','store','$state','jwtHelper','$alert','$translate',
    function($scope,$http,store,$state,jwtHelper,$alert,$translate) {
        $scope.reset_panel = false;
        var jwt = store.get('jwt');
        
        var _translations;
        $translate(['TITLE_ERROR','ALERT_LOGIN_FAIL']).then(function(translation){
            _translations = translation;
        })
        
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:LoginCtrl#sendInfo
         * @description Sends password and username to the server and checks confirms validation
         * @methodOf mainAppCtrls.controller:LoginCtrl
         */
        $scope.sendInfo = function(){
            var _data = {
                _username: $scope.e_mail,
                _password: $scope.password
            };
            $scope.alertError;
            $scope.loading = true;
            if($scope.alertError != null)
                $scope.alertError.hide();
            $http({method:'POST',url: '/api/login_check',data: _data}).then(function(httpResponse) {
                $scope.loading = false;
                var token = httpResponse.data.token;
                store.set('jwt',token);
                $state.go('dashboard');
                $scope.show_login = false;
                $scope.show_logout = true;
            },function(httpResponse){
                $scope.loading = false;

                $scope.alertError = $alert({
                    title: _translations.TITLE_ERROR,
                    type: 'danger',
                    container: '#alert',
                    content: _translations.ALERT_LOGIN_FAIL,
                    dismissable: false,
                    show: true
                });
            });
        };

        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:LoginCtrl#showResetPanel
         * @description shows the button to reset the password
         * @methodOf mainAppCtrls.controller:LoginCtrl
         */
        $scope.showResetPanel = function() {
            $scope.reset_panel = !$scope.reset_panel;
            console.log($scope.reset_panel);
        }

        $scope.resetPassword = function(e_mail_for_reset) {
            if($scope.alertReset != null)
                $scope.alertReset.hide();
            if(!e_mail_for_reset.$valid) {
                $scope.alertReset = $alert({
                    title: _translations.TITLE_ERROR,
                    content: '',
                    type: 'danger',
                    dismissable: false,
                    show: true,
                    container: '#reset_alert'
                });
            }
        }
    }
]);

// Source: web/components/controllers/newEmailTemplateCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:NewEmailTemplateCtrl
 * @description Controller to create a new email template
 *
 */
mainAppCtrls.controller('NewEmailTemplateCtrl',['$scope',"EmailTemplate",
    function($scope, EmailTemplate) {
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:NewEmailTemplateCtrl#sendInfo
         * @description Sends the data of the created email template to the server
         * @methodOf mainAppCtrls.controller:NewEmailTemplateCtrl
         */
        $scope.sendInfo = function(){
            var data={
                template_name:$scope.email.template.title,
                email_subject:$scope.email.template.subject,
                email_body:$scope.email.template.body
            }
            EmailTemplate.put(data).$promise.then(function(httpResponse){
                alert('Success!' + httpResponse.status);
            },function(httpResponse){
                alert('Error'+httpResponse.statusText);
            });
        }
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:NewEmailTemplateCtrl#discard
         * @description Discards all data of the document
         * @methodOf mainAppCtrls.controller:NewEmailTemplateCtrl
         */
        $scope.discard = function(){
            $scope.email.template.title= "";
            $scope.email.template.subject= "";
            $scope.email.template.body= "";
            
        }

        
    }

]);


// Source: web/components/controllers/newWorkshopTemplateCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:AdminNewWorkshopCtrl
 * @description Controller initializing the creation of a new workshop template
 */
mainAppCtrls.controller('NewWorkshopTemplateCtrl',['$scope',"WorkshopTemplate",'$alert',
    function($scope, WorkshopTemplate,$alert) {
        $scope.workshop = {};
        $scope.myAlert;
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdminNewWorkshopCtrl#sendInfo
         * @methodOf mainAppCtrls.controller:AdminNewWorkshopCtrl
         * @description Validates the input data and sends a request to create a new Template to the server
         *
         */
        $scope.sendInfo = function(){
            //Adjusts the format of the date strings to fit the requirements of the API
            var reformatDate =  function(_date){
                if(!_date || _date == null)
                    return "";
                var _dateStr = _date.toJSON();
                if(_dateStr == null)
                    return "";
                _dateStr =  _dateStr.slice(0,_dateStr.length-5);
                return _dateStr.replace('T',' ');
            };
            //Initialize start_at to calculate duration with end_at 
            var _sa = new Date(0);
            var _duration = $scope.workshop.duration;
            var _ea = new Date(_duration);

            var data = {
                title:$scope.workshop.title,
                description:$scope.workshop.description,
                cost:$scope.workshop.cost,
                requirements:$scope.workshop.requirement,
                location:$scope.workshop.location,
                start_at:reformatDate(_sa),
                end_at:reformatDate(_ea),
                max_participants:$scope.workshop.max_participants
            };

            if($scope.myAlert != null)
                $scope.myAlert.hide();
            WorkshopTemplate.put(data).$promise.then(function(httpResponse){
                $scope.myAlert = $alert({
                   container: '#alert',
                   type: 'success',
                   title: 'Success',
                   content: 'Successfully created workshop-template '+$scope.workshop.title,
                   show: true,
                   dismissable: false,
                   duration: 20
                });
            },function(httpResponse){
                $scope.myAlert = $alert({
                    container: '#alert',
                    type: 'danger',
                    title: 'Error',
                    content: 'Failed to create template! '+httpResponse.status,
                    show: true,
                    dismissable: false,
                    duration: 20
                });
            });
        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:AdminNewWorkshopCtrl#discard
         * @methodOf mainAppCtrls.controller:AdminNewWorkshopCtrl
         * @description Discards the input
         *
         */
        $scope.discard = function(){
            $scope.workshop.title= "";
            $scope.workshop.description= "";
            $scope.workshop.cost= "";
            $scope.workshop.requirement= "";
            $scope.workshop.location= "";
            $scope.workshop.sharedDate= "";
            $scope.workshop.duration = "";
            $scope.workshop.max_participants= "";



        }



    }

]);

// Source: web/components/controllers/passwordResetCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:PasswordResetCtrl
 * @description To reset your password and create a new password
 */
mainAppCtrls.controller('PasswordResetCtrl',['$scope','$alert','$translate','Admin','$stateParams',
    function($scope,$alert,$translate,Admin,$stateParams) {

        var _translations;
        $translate(['TITLE_ERROR','PASSWORDS_IDENTICAL_ERROR','PASSWORD_EMPTY_ERROR']).then(function(translations){
           _translations = translations;
        });
        var pwAlert;
        var _token = $stateParams.token;
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:PasswordResetCtrl#validatePW
         * @methodOf mainAppCtrls.controller:PasswordResetCtrl
         * @description checks validity of passwords ( if both are identical )
         */
        $scope.validatePW = function () {
            var pw = $scope.password;
            var pwc = $scope.password_confirm;
            if(pwAlert != null){
                pwAlert.hide();
                pwAlert.destroy();
            }
            if (pw != pwc) {
                pwAlert = $alert({
                    container: '#alert',
                    title: _translations.TITLE_ERROR,
                    content: _translations.PASSWORDS_IDENTICAL_ERROR,
                    show: true,
                    dismissable: false,
                    type: 'danger'
                });
                return false;
            } else {
                if(pwAlert != null) {
                    pwAlert.hide();
                    pwAlert.destroy();
                }
                return true;
            }
        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:PasswordResetCtrl#sendInfo
         * @methodOf mainAppCtrls.controller:PasswordResetCtrl
         * @description checks validity and sends a request to change the password to the server
         */
        $scope.sendInfo = function () {
            if(!$scope.validatePW())
                return;

            var pw = $scope.password;
            if(pw == '' || pw == null){
                pwAlert = $alert({
                    container: '#alert',
                    title: _translations.TITLE_ERROR,
                    content: _translations.PASSWORD_EMPTY_ERROR,
                    show: true,
                    dismissable: false,
                    type: 'danger'
                });
                return;
            }
            var _msg = "";
            var _type = "";
            var _title = "";
            Admin.resetPassword({token: _token},{password: $scope.form.password}).$promise.then(function(httpResponse){
                pwAlert = $alert({
                    container: '#alert',
                    title: "Success",
                    content: _msg,
                    type: "success",
                    show: true,
                    dismissable: false
                });
            },function(httpResponse){
                switch(httpResponse.status){
                    case 404:
                        _msg = "Invalid token";
                        break;
                    case 500:
                        _msg = "Internal server error. Please contact your system admin";
                        break;
                }
                pwAlert = $alert({
                    container: '#alert',
                    title: "Error",
                    content: _msg,
                    type: "danger",
                    show: true,
                    dismissable: false
                });

            });

        };
    }

]);

// Source: web/components/controllers/settingsCtrl.js

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:SettingsCtrl
 * @description Controller for the Settings view
 */
mainAppCtrls.controller('SettingsCtrl',['$scope','$alert','$confirm',
    function($scope,$alert,$confirm) {
        var _originalData = {};
        $scope.form = {};
        //TODO: load i18n for Placeholders and Tabnames
        $scope.tabs = [

            {
                title: "Change Personal Info",
                page: "resources/views/adminEditPassword.html"
            },
            {
                title: "Edit Contact Info",
                page: "resources/views/adminEditInfo.html"
            },
            {
                title: "Edit Legal Notice",
                page: "resources/views/adminEditLegalNotice.html"
            }
        ];
        $scope.lnToolbar = [
            ['h1', 'h2', 'h3', 'p', 'bold', 'italics'],
            ['ul', 'ol'],
            ['redo', 'undo', 'clear'],
            ['html', 'insertImage', 'insertLink'],
            ['justifyLeft', 'justifyCenter', 'justifyRight', 'indent', 'outdent']
        ];
        $scope.pwAlert = $alert({
            title: "Error",
            type: 'danger',
            content: 'Internal server error.',
            container: '#pwalert',
            dismissable: false,
            show: false
        });
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:SettingsCtrl#loadContact
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description Loads the current contact data
         */
        $scope.loadContact = function() {

        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:SettingsCtrl#loadLegalNotice
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description Loads the current legalnotice
         */
        $scope.loadLegalNotice = function() {

        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:SettingsCtrl#validatePW
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @returns {boolean} True when valid, false when not. Used internally
         */
        $scope.validatePW = function() {
            var pw = $scope.form.password;
            var pwc = $scope.form.password_confirm;
            if(pw != pwc) {
                $scope.pwAlert.show();
                return false;
            }else {
                $scope.pwAlert.hide();
                return true;
            }
        };
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:SettingsCtrl#changePassword
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description Checks validity of password and sends request to change it to the servers
         */
        $scope.changePassword = function() {
            if(!$scope.validatePW())
                return;
            if($scope.form.password == null || $scope.form.password == '') {
                $scope.pwAlert.show();
                return;
            }
            var _data = {
                password: $scope.form.password_old,
                new_password: $scope.form.password
            };
            //TODO add confirm
            //TODO Send to server, handle response ( Missing API Function )
        }
        /**
         * @ngdoc function
         * @name  mainAppCtrls.controller:SettingsCtrl#changeEmail
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description checks validity of email and sends request to change it to the server
         */
        $scope.changeEmail = function() {
            var _personal_email = $scope.form.personal_email;
            if(_personal_email == null || _personal_email == '') {

            }
            //TODO confirm
            $confirm().show().then(function(res) {
                console.log(res);
            });
            //TODO Send to server, handle response ( Missing API function )
        }
        /**
         * @ngdoc function
         * @name  mainAppCtrls.controller:SettingsCtrl#discardContact
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description discards changes made to the contact data
         */
        $scope.discardContact = function() {
            $scope.form.telephone = _originalData.telephone;
            $scope.form.website = _originalData.website;
            $scope.form.address = _originalData.address;
            $scope.form.facebook = _originalData.facebook;
            $scope.form.email = _originalData.email;
        }
        /**
         * @ngdoc function
         * @name  mainAppCtrls.controller:SettingsCtrl#saveContactChange
         * @methodOf mainAppCtrls.controller:SettingsCtrl
         * @description checks validity of changes made to input and sends change request to server
         */
        $scope.saveContactChange = function() {
            var _dataToSend = $scope.form;
            if(!$scope.form.email.$valid) {
                //TODO error message
                return;
            }
            console.log('Uhm..');
            //TODO add confirm

        }
    }
]);

// Source: web/components/controllers/unsubscribeCtrl.js
/**
 * Created by hunte on 30/05/2016.
 */

/**
 *
 */
mainAppCtrls.controller('UnsubscribeCtrl',['$scope',
    function($scope) {

    }

]);

// Source: web/components/controllers/workshopDetails.js
/**
 * Created by Ahmet on 31.05.2016.
 */

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:WorkshopDetailsCtrl
 * @description Loads workshop details
 */
mainAppCtrls.controller('WorkshopDetailsCtrl',['$scope','Workshops', '$stateParams', "$alert",
    function($scope,Workshops,$stateParams, $alert) {
        //TODO : replace with workshop details
        var workshopid = $stateParams.id;
        /**
         * @ngdoc function
         * @name mainAppCtrls.controller:WorkshopDetailsCtrl#sendInfo
         * @description Sends the info entered for enrollment to the server
         * @methodOf mainAppCtrls.controller:WorkshopDetailsCtrl
         */
        $scope.sendInfo= function(){
            var first_name=$scope.first_name;   
            var last_name=$scope.last_name;
            var _email=$scope.e_mail;

            //check if input is valid
            var _data = {
              //Data to be send  
              name: first_name,
              surname: last_name,
              email:   _email
            };
            //parameters for url
            var _params = {
              id: workshopid
            };
            Workshops.enroll(_params,_data).$promise.then(function(value,httpResponse){
                $alert({
                    title: 'Success',
                    type: 'success',
                    content: 'Enrollment successful. Please check your E-Mail!',
                    container: '#alertEnroll',
                    dismissable: true,
                    duration: 20,
                    show: true,
                    animation: 'am-fade-and-slide-top'
                });
            },function(httpResponse){
                $alert({
                    title: 'Error',
                    type: 'danger',
                    content: httpResponse.status + ': '+ httpResponse.statusText,
                    container: '#alertEnroll',
                    dismissable: true,
                    duration: 20,
                    show: true,
                    animation: 'am-fade-and-slide-top'
                });
            });
        };


        $scope.loading = true;
        Workshops.get({id: workshopid}).$promise.then(function(value,httpResponse){
            $scope.workshop = value;

            $scope.loading = false;
        },function(httpResponse) {
            alert(httpResponse.status + '');
            $scope.loading = false;
        });
        Workshops.getParticipants({id: workshopid}).$promise.then(function(value,httpResponse){
            $scope.participants = value;

            $scope.loading = false;
        },function(httpResponse) {
            switch(httpResponse.status){
                case 404:
                    $alert({
                        title: '',
                        type: 'info',
                        content: 'No participants yet',
                        container: '#alertParticipant',
                        dismissable: false,
                        show: true,
                        animation: 'am-fade-and-slide-top'
                    });
            }
            $scope.loading = false;
        });

    }
]);

// Source: web/components/controllers/workshopListCtrl.js

/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:WorkshopListCtrl
 * @description
 */
mainAppCtrls.controller('WorkshopListCtrl',['$scope','Workshops','$alert','$translate',
    function($scope,Workshops,$alert,$translate) {
        
        //Define object to store the alert in
        $scope.myAlert;
        //Get and store translation for alert title.
        $translate(['TITLE_ERROR', 'ERROR_NO_WORKSHOPS']).then(function (translations) {
            $scope.errorTitle = translations.TITLE_ERROR;
            $scope.errorMsg = translations.ERROR_NO_WORKSHOPS;
        });
        $scope.loading = true;
        Workshops.getAll().$promise.then(function(value){
            $scope.workshopList = value;
            for(var i=0;i<value.length;i++){
                Workshops.getParticipants({id: $scope.workshopList[i].id}).$promise.then(function(value){
                    $scope.workshopList[i].numParticipants = value.length;
                },function(httpResponse) {
                    $scope.workshopList[i].numParticipants = 0;
                });
            }
            $scope.loading = false;
        },function(httpResponse) {
            //switch through all possible errors
            switch(httpResponse.status){
                //Alert for error 404, no workshops available
                case 404:
                    $scope.myAlert = $alert({

                        title: $scope.errorTitle,
                        type: 'danger',
                        content: $scope.errorMsg,
                        container: '#alert',
                        dismissable: false,
                        show: true
                    });
                case 500:
                    $scope.myAlert = $alert({
                        title: $scope.errorTitle,
                        type: 'danger',
                        content: 'Internal server error.',
                        container: '#alert',
                        dismissable: false,
                        show: true
                    })
                break;
            }
            $scope.loading = false;
        });

    }
]);

// Source: web/components/controllers/workshopTemplateCtrl.js
/**
 * Created by hunte on 31/05/2016.
 */


/**
 * @ngdoc controller
 * @name mainAppCtrls.controller:WorkshopTemplateCtrl
 * @description Displays the workshop-template list in the associated view
 */
mainAppCtrls.controller('WorkshopTemplateCtrl', ['$scope', "WorkshopTemplate",'$alert',

    function ($scope, WorkshopTemplate, $alert) {

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
                        title:"Warning",
                        type: 'warning',
                        container:'#alert',
                        show: true,
                        dismissable: false,
                        content: 'No workshops templates in list',
                        duration: 20
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




