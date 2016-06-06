/**
 * Created by hunte on 06/06/2016.
 */

var prntSvcs = angular.module("prntSvcs",['$rootScope', '$compile','$http','$timeout']);

prntSvcs.factory('printer',['printer', function($rootScope, $compile, $http, $timeout ){
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
            var printScope = $rootScope.$new()
            angular.extend(printScope, data);
            var element = $compile($('<div>' + template + '</div>'))(printScope);
            var waitForRenderAndPrint = function() {
                if(printScope.$$phase || $http.pendingRequests.length) {
                    $timeout(waitForRenderAndPrint);
                } else {
                    // Replace printHtml with openNewWindow for debugging
                    printHtml(element.html());
                    printScope.$destroy();
                }
            };
            waitForRenderAndPrint();
        });
    };
}]);


