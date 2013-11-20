function isDefined(obj) {
    return typeof obj !== 'undefined';
}


(function() {

    var app = angular.module('Vatjob', ['Auth', 'Character']);

    app.value('fbURL', 'https://vatjob.firebaseio.com/');

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
        $routeProvider.otherwise({
            redirectTo: '/home'
        });
    }]);

    app.factory('UuidService', function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return {
            guid: function() {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
                }
        }
    });

    app.run(['authService', '$location', function(authService, $location){
        authService();
        $location.path('/');
    }]);

})();

