(function () {
    var auth = angular.module('Auth', ['firebase']);

    auth.factory('authService', ['$rootScope', '$location', 'angularFireAuth', 'fbURL', function($rootScope, $location, angularFireAuth, fbURL) {
        return function() {
            angularFireAuth.initialize(new Firebase(fbURL), {
                scope: $rootScope,
                name: 'user'
            });

//            $rootScope.$on('angularFireAuth:login', _login);
//            $rootScope.$on('angularFireAuth:logout', _logout);
//
//            function _login(evt, user) {
//                $location.path('/');
//            }
//
//            function _logout(evt) {
//                $location.path('/login');
//            }
        }
    }]);

    auth.controller('loginCtrl', ['$scope', 'angularFireAuth',
        function($scope, angularFireAuth) {
            $scope.options = [
                    { name: 'Facebook', key: 'facebook' },
                    { name: 'GitHub', key: 'github' },
                    { name: 'Twitter', key: 'twitter' }
                ];
            $scope.option = $scope.options[0];

            $scope.login = function() {
                angularFireAuth.login($scope.option.key);
            };
        }]
    );

    auth.directive('vatLogout', function() {
        return {
            scope: {
                user: '='
            },
            controller: ['$scope', 'angularFireAuth', function($scope, angularFireAuth) {
                $scope.logout = function() {
                    angularFireAuth.logout();
                }
            }],
            templateUrl: 'firebase/logout.html'
        }
    });
})();