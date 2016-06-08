/**
 * Created by hunte on 31/05/2016.
 */
var mainAppCtrls = angular.module("mainAppCtrls");
/**
 *
 */
mainAppCtrls.controller('LoginCtrl',['$scope','$http','store','$state',
    function($scope,$http,store,$state) {
        $scope.sendInfo = function(){
            var _data = {
                _username: $scope.e_mail,
                _password: $scope.password
            };
            $http({method:'POST',url: '/api/login_check',data: _data}).then(function(httpResponse) {
                var token = httpResponse.data.token;
                store.set('jwt',token);
                $state.go('dashboard');
            },function(httpResponse){
                //TODO: Show alert in view
                alert(httpResponse.status+'\n'+httpResponse.statusText);
            });
        }
    }
]);