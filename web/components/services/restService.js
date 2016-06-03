/**
 * @name restSvcs
 * @type {angular.Module}
 * @description Module containing the REST services
 */
var restSvcs = angular.module('restSvcs',['ngResource']);

/**
 * @ngdoc service
 * @name restSvcs.Workshops
 * @description Provides CRUD operations for Workshop-functions provided by the API
 */
restSvcs.factory('Workshops',['$resource',function($resource){
    return $resource('/api/workshops/:id',{},{
        /**
         * @ngdoc funtion
         * @name restSvcs.Workshops#getAll
         * @description get a list of all currently available workshops.
         * @methodOf restSvcs.Workshops
         * @returns {httpPromise} resolve with fetched data, or fails with error description.
         */
        'getAll': {method: 'GET',params: {id: 'all'}, isArray: true},
        /**
         * @ngdoc funtion
         * @name restSvcs.Workshops#get
         * @description get a single workshops
         * @methodOf restSvcs.Workshops
         * @param {integer} id Workshop-ID
         */
        'get': {method: 'GET',params: {id: '@id'}, isArray: false},
        /**
         * @ngdoc funtion
         * @name restSvcs.Workshops#getParticipants
         * @description Get list of enrolled participants to a workshop
         * @methodOf restSvcs.Workshops
         * @param {integer} id Workshop-ID
         */
        'getParticipants': {method: 'GET',url:'/api/workshops/:id/participants',params: {id: '@id'},isArray: true}, 
        /**
         * @ngdoc funtion
         * @name restSvcs.Workshops#enrollWorkshop
         * @description Action to enroll a Workshop
         * @methodOf restSvcs.Workshops
         * @param {integer} id Workshop-ID
         */
        'post': {method: 'POST',url:'/api/workshops/:id/enrolls',params: {id: '@id'},isArray: false},
        /**
         * @ngdoc funtion
         * @name restSvcs.Workshops#unsubscribeWorkshop
         * @description Action to unsubscribe a Workshop
         * @methodOf restSvcs.Workshops
         * @param {integer} id Workshop-ID
         * @param {string} token Unsubscribetoken
         */
        'getUnsubscribes': {method: 'GET',url:'/api/workshops/:id/unsubscribes/:token',params: {id: '@id', token: '@token'},isArray: false},
        /**
         * @ngdoc funtion
         * @name restSvcs.Workshops#unsubscribeWorkshop
         * @description Get Waitinglist of a Workshop
         * @methodOf restSvcs.Workshops
         * @param {integer} id Workshop-ID
         */
        'getWaitinglist': {method: 'GET',url:'/api/workshops/:id/waitinglist',params: {id: '@id'},isArray: true},
        /**
         * @ngdoc funtion
         * @name restSvcs.Workshops#unsubscribeWorkshop
         * @description Confirm Enrollment of the WOrkshop
         * @methodOf restSvcs.Workshops
         * @param {integer} id Workshop-ID, participantsid Participants-ID
         * @param {string} token Confirmtoken
         */
        'getConfirmEnrollment': {method: 'GET',url:'/api/workshops/:id/enrolls/:participantsid/confirms/:token',params: {id: '@id',participantsid: '@participantsid',token: '@token'},isArray: false},
    });
}]);
/**
 * @ngdoc service
 * @name restSvcs.WorkshopTemplate
 * @description Provides CRUD operations for Workshop-Template-functions provided by the API
 */
restSvcs.factory('WorkshopsTemplate',['$resource',function($resource){
    return $resource('/api/admin/workshops/templates/:id',{},{
        /**
         * @ngdoc funtion
         * @name restSvcs.WorkshopTemplate#getAll
         * @description get a list of all currently available workshoptemplates.
         * @methodOf restSvcs.Workshoptemplate
         * @returns {httpPromise} resolve with fetched data, or fails with error description.
         */
        'getAll': {method: 'GET',params: {id: 'all'}, isArray: true},
        /**
         * @ngdoc funtion
         * @name restSvcs.WorkshopTemplate#get
         * @description get a single workshoptemplate
         * @methodOf restSvcs.Workshoptemplate
         * @param {integer} id Workshop-ID
         */
        'get': {method: 'GET',params: {id: '@id'}, isArray: false},
        /**
         * @ngdoc function
         * @name restSvcs.WorkshopTemplate#patch
         * @description edit a single workshoptemplate
         * @methodOf restSvcs.Workshoptemplate
         * @param {integer} id Workshop-ID
         */
        'patch': {method: 'PATCH',params: {id: '@id'}, isArray: false},
        /**
         * @ngdoc function
         * @name restSvcs.WorkshopTemplate#put
         * @description create a new workshoptemplate
         * @methodOf restSvcs.Workshoptemplate
         */
         'put': {method: 'PUT', isArray: false},
         /**
          * @ngdoc function
          * @name restSvcs.WorkshopTemplate#delete
          * @description delete a workshoptemplate
          * @methodOf restSvcs.Workshoptemplate
          * @param {integer} id Workshop-ID
          */
          'delete': {method: 'DELETE',params: {id: '@id'}, isArray: false}
    });
}]);
restSvcs.factory('AdminWorkshop',['$resource',function($resource){
    return $resource('/api/admin/workshops/:id',{},{
         /**
          * @ngdoc function
          * @name restSvcs.AdminWorkshop#history
          * @description show all workshops
          * @methodOf restSvcs.AdminWorkshop
          * @returns {httpPromise} resolve with fetched data, or fails with error description.
         */
        'gethistory': {method: 'GET',params: {id: 'all'}, isArray: true},
         /**
          * @ngdoc function
          * @name restSvcs.Adminworkshop#put
          * @description create a new workshop
          * @methodOf restSvcs.AdminWorkshop
          */
          'put': {method: 'PUT', isArray:false},
         /**
         * @ngdoc function
         * @name restSvcs.AdminWorkshop#patch
         * @description edit a single workshop
         * @methodOf restSvcs.AdminWorkshop
         * @param {integer} id Workshop-ID
         */
        'patch': {method: 'PATCH',params: {id: '@id'}, isArray: false},
         /**
          * @ngdoc function
          * @name restSvcs.AdminWorkshop#delete
          * @description delete a workshop
          * @methodOf restSvcs.AdminWorkshop
          * @param {integer} id Workshop-ID
          */
          'delete': {method: 'DELETE',params: {id: '@id'}, isArray: false},
         /**
          * @ngdoc function
          * @name restSvcs.AdminWorkshop#patchWaitinglist
          * @description overbook the workshop
          * @methodOf restScvs.AdminWorkshop
          * @param {integer} id Workshop-ID, participantsid Participants-ID
          */
          'patchwaitinglist': {method: 'PATCH',url:'/api/admin/workshops/:id/waitinglists/:participantid' ,params: {id: '@id', participantsid: '@participantsid', isArray: false},
    });
}]);
