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
        'getParticipants': {method: 'GET',url:'/api/workshops/:id/participants',params: {id: '@id'},isArray: true}
    });
}]);