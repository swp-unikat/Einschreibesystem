/**
 * Created by hunte on 06/06/2016.
 */

var prntSvcs = angular.module("prntSvcs",[]);

prntSvcs.factory('printer',['$rootScope','$compile','$http','$timeout', function($rootScope, $compile, $http, $timeout ){
    var printHtml = function (html) {
        var deferred = $q.defer();
        var hiddenFrame = $('<iframe style="display: none"></iframe>').appendTo('body')[0];
        hiddenFrame.contentWindow.printAndRemove = function() {
            hiddenFrame.contentWindow.print();
            $(hiddenFrame).remove();
        };

    };
    var print = function (templateUrl, data) {
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
    return print;


}]);


