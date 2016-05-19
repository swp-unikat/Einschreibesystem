/**
 *
 * @type {angular.Module}
 */
var mainApp = angular.module('mainApp',[
    'ngRoute',
    'mainAppCtrls'
]);
/**
 *
 * @type {angular.Module}
 */
var mainAppCtrls = angular.module('mainAppCtrls',[]);
/**
 * Configure routing
 */
mainApp.config(['$routeProvider',
    function($routeProvider)
    {
        $routeProvider.when('/workshops', {
            templateUrl: 'resources/views/workshopList.html',
            controller: 'WorkshopListCtrl'
        });
    }
]);
