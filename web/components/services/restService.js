var restSvcs = angular.module('restSvcs',['ngResource']);
/**
 * Service consuming API-function regarding workshops
 */
restSvcs.factory('Workshops',['$resource',function($resource){
    return $resource('/api/workshops/:id',{id: '@id'},{
        getAll: {method: 'GET', isArray: true,id: 'all'},
        get: {method: 'GET', isArray: false,id: '@id'}
    });
}]);