/**
 * Created by hunte on 05/06/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");


mainAppCtrls.controller( , data) {
    $http.get(templateUrl).success(function(template){
        var printScope = angular.extend($rootScope.$new(), data);
        var element = $compile($('<div>' + template + '</div>'))(printScope);
        var waitForRenderAndPrint = function() {
            if(printScope.$$phase || $http.pendingRequests.length) {
                $timeout(waitForRenderAndPrint);
            } else {
                printHtml(element.html());
                printScope.$destroy(); // To avoid memory leaks from scope create by $rootScope.$new()
            }
        }
        waitForRenderAndPrint();
    });
};
