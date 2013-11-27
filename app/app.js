"use strict";

(function() {

    var app = angular.module('Vatjob', ['AuthModule', 'Character']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'firebase/login.html'
        });
        $routeProvider.when('/home', {
            templateUrl: 'home.html'
        });
        $routeProvider.when('/characters', {
            templateUrl: 'character/characters-list.html'
        });
        $routeProvider.when('/characters/:characterUid', {
            templateUrl: 'character/characters-edit.html'
        });
        $routeProvider.otherwise('/home');
    }]);

    app.run(['AuthService', '$rootScope', '$location', function(AuthService, $rootScope, $location){
        AuthService.initialize($location.path());
    }]);

})();

