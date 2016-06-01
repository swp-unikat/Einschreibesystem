var restSvcs = angular.module('restSvcs',['ngResource']);
/**
 * Service consuming API-function regarding workshops
 */
restSvcs.factory('Workshops',['$resource',function($resource){
    return $resource('/api/workshops/:id',{id: '@id'},{
        getAll: {method: 'GET',params: {id: 'all'}, isArray: true},
        get: {method: 'GET',params: {id: '@id'}, isArray: false}
    });
}]);