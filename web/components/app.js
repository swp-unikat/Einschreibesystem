/**
 *
 * @type {angular.Module}
 */
var regApp = angular.module('regApp',[
    'ngRoute',
    'regAppCtrls'
]);
/**
 *
 * @type {angular.Module}
 */
var regAppCtrls = angular.module('regAppCtrls',[]);
/**
 * Configure routing
 */
app.config([$routeProvider,function ($routeProvider) {

    $routeProvider.when('/workshops', {
        templateUrl: 'resources/views/workshopList.html',
        controller: 'WorkshopListCtrl'
    });
}]);
