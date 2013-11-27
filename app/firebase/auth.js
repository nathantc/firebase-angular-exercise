"use strict";

(function () {
    var auth = angular.module('AuthModule', ['FbModule']);

    auth.factory('AuthService', ['$rootScope', '$location', 'fbURL', 'angularFireAuth', function($rootScope, $location, fbURL, angularFireAuth) {
        var auth = {};
        auth.initialize = function(targetRoute) {
                $rootScope.$on('angularFireAuth:logout', this._onLogout);
                $rootScope.$on('angularFireAuth:login', this._onLogin);
                $rootScope.$on('$routeChangeStart', this._onRouteChangeStart);

                $rootScope.auth = { targetRoute: targetRoute || '/' };
                angularFireAuth.initialize(new Firebase(fbURL), {
                        scope: $rootScope.auth,
                        name: 'user'
                    }
                );
            };

        auth.isAuthenticated = function() {
                return isNotNullOrUndefined($rootScope.auth.user);
            };

        auth.currentUser = function() {
                return $rootScope.auth.user;
            };

        auth._onRouteChangeStart = function() {
                if (!auth.isAuthenticated()) {
                    $location.path('/login');
                }
            };

        auth._onLogin = function() {
                $location.path($rootScope.auth.targetRoute);
            };

        auth._onLogout = function() {
                $location.path('/login');
            };
        return auth;
    }]);

    auth.controller('LoginCtrl', ['$scope', 'angularFireAuth',
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
            controller: ['$scope', 'angularFireAuth', function($scope, angularFireAuth) {
                $scope.logout = function() {
                    angularFireAuth.logout();
                }
            }],
            templateUrl: 'firebase/logout.html'
        }
    });
})();