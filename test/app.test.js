describe('app.js - Vatjob Module', function() {

    describe('Module configuration', function() {

        var module, dependencies;

        var hasModule = function(m) {
            return dependencies.indexOf(m) >= 0;
        }

        beforeEach(function() {
            module = angular.module('Vatjob');
            dependencies = module.value('appName').requires;
        })

        it('should be registered', function() {
            expect(module).toBeDefined();
        })

        it('should have Auth as a dependency', function() {
            expect(hasModule('Auth')).toEqual(true);
        })

        it('should have Character as a dependency', function() {
            expect(hasModule('Character')).toEqual(true);
        })
    })

    describe('Sets the application values', function() {

        var _fbURL;

        beforeEach(function() {
            angular.mock.module('Vatjob');
            inject(function(fbURL) {
                _fbURL = fbURL;
            });
        })

        it('should set fbURL', function() {
            expect(_fbURL).toEqual('https://vatjob.firebaseio.com/');
        })
    })

    describe('RouteProvider', function() {

        var _routes;

        beforeEach(function() {
            angular.mock.module('Vatjob');
            inject(function($route) {
                _routes = $route.routes;
            });
        });

        it('should contain /login route', function() {
            var route = _routes['/login'];
            expect(route).toBeDefined();
            expect(route.templateUrl).toEqual('firebase/login.html');
        });

        it('should contain /edit route', function() {
            var route = _routes['/home'];
            expect(route).toBeDefined();
            expect(route.templateUrl).toEqual('home.html');
        });

        it('should contain /characters route', function() {
            var route = _routes['/characters'];
            expect(route).toBeDefined();
            expect(route.templateUrl).toEqual('character/characters-list.html');
        });

        it('should contain /characters route', function() {
            var route = _routes['/characters/:characterUid'];
            expect(route).toBeDefined();
            expect(route.templateUrl).toEqual('character/characters-edit.html');
        });
    });

    describe('UuidService', function() {

        var _uuidService;

        beforeEach(function() {
            angular.mock.module('Vatjob');
            inject(function(UuidService) {
                _uuidService = UuidService;
            })
        })

        it('should generate random uuid', function() {
            var id1, id2
            id1 = _uuidService.guid();
            id2 = _uuidService.guid();
            expect(id1.length).toBe(36);
            expect(id2.length).toBe(36);
            expect(id1).not.toEqual(id2);
        })
    })
})