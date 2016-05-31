/**
 * Created by Valle on 31.05.2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
mainAppCtrls.controller('AdminCreateCtrl',['$scope', '$stateParams',
    function($scope,$stateParams) {
        var token = $stateParams.token;
    }
]);
