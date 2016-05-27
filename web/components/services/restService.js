var restSvcs = angular.module('restSvcs',['ngResource']);
/**
 * Service consuming API-function regarding workshops
 */
restSvcs.factory('Workshops',['$resource',function($resource){
    return $resource('/api/workshops/all',{},{
        getAll: {method: 'GET', isArray: true}
    });
}]);