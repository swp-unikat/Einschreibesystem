/**
 * Created by hunte on 06/06/2016.
 */
/**
 * @ngdoc overview
 * @name prntSvcs
 * @description Module containing print service and helper functions
 */
var prntSvcs = angular.module("prntSvcs",[]);
/**
 * @ngdoc service
 * @name prntSvcs.printer
 * @description Providing a function to print a html-template
 */
prntSvcs.factory('printer',['$rootScope','$compile','$http','$timeout', function($rootScope, $compile, $http, $timeout ){
    /**
     * @ngdoc function
     * @name prntSvcs.printer#printHtml
     * @param {object} html a compiled html-template
     * @methodOf prntSvcs.printer
     * @description Prints the passed html template. Only used internally
     */
    var printHtml = function (html) {
        var deferred = $q.defer();
        var hiddenFrame = $('<iframe style="display: none"></iframe>').appendTo('body')[0];
        hiddenFrame.contentWindow.printAndRemove = function() {
            hiddenFrame.contentWindow.print();
            $(hiddenFrame).remove();
        };

    };
    /**
     * @ngdoc function
     * @name prntSvcs.printer#print
     * @methodOf prntSvcs.printer
     * @description compiles the passed template file and the given data and prints the result
     * @param {string} templateUrl URL to the template to be rendered
     * @param {object} data data to be rendered in the template
     */
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
    /**
     * @ngdoc function
     * @name prntSvcs.printer#printFromScope
     * @methodOf prntSvcs.printer
     * @description compiles the passed template file and the given scope and prints the result
     * @param {string} templateUrl URL to the template to be rendered
     * @param {object} scope The scope where the data to be rendered in the template is located
     */
    var printFromScope = function (templateUrl, scope) {
        $rootScope.isBeingPrinted = true;
        $http.get(templateUrl).success(function(template){
            var printScope = scope;
            var element = $compile($('<div>' + template + '</div>'))(printScope);
            var waitForRenderAndPrint = function() {
                if (printScope.$$phase || $http.pendingRequests.length) {
                    $timeout(waitForRenderAndPrint);
                } else {
                    printHtml(element.html()).then(function() {
                        $rootScope.isBeingPrinted = false;
                    });

                }
            };
            waitForRenderAndPrint();
        });
    };
    return {
        print: print,
        printFromScope:printFromScope
    }
}]);


