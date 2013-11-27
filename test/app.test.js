"use strict";

describe('app.js - Vatjob Module', function() {

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
})
