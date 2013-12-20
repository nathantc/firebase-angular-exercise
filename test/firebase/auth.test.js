"use strict";

describe('AuthModule', function() {

    beforeEach(function() {
        angular.mock.module('AuthModule');
    })

    describe('AuthService', function() {

        var _rootScope, _location, _AuthService, _angularFireAuth;

        beforeEach(inject(function($rootScope, $location, fbURL, AuthService, angularFireAuth) {
            _rootScope = $rootScope;
            _location = $location;
            _AuthService = AuthService;
            _angularFireAuth = angularFireAuth;
        }));

        describe('initialization', function() {

            var database = { firebase: 'ref' }

            beforeEach(inject(function($location) {
                spyOn(_angularFireAuth, 'initialize');
                spyOn(window, 'Firebase').andReturn(database);
                spyOn(_rootScope, '$on')

                _AuthService.initialize();
            }))

            it('sets auth scope on $rootScope', function() {
                expect(_rootScope.auth).toBeDefined();
            })

            it('sets route path to "/" if targetRoute is undefined', function() {
                expect(_rootScope.auth.targetRoute).toBe('/')
            })

            it('initializes firebase authentication', function() {
                expect(window.Firebase).toHaveBeenCalled();
                expect(_angularFireAuth.initialize).toHaveBeenCalled();
            })

            it('assigns logout event', function() {
                expect(_rootScope.$on).toHaveBeenCalledWith('angularFireAuth:logout', _AuthService._onLogout);
            })

            it('assigns login event', function() {
                expect(_rootScope.$on).toHaveBeenCalledWith('angularFireAuth:login', _AuthService._onLogin);
            })

            it('assigns on route change event', function() {
                expect(_rootScope.$on).toHaveBeenCalledWith('$routeChangeStart', _AuthService._onRouteChangeStart);
            })
        })

        describe('initialize with target route', function (){
            var database = { firebase: 'ref' }

            beforeEach(inject(function($location) {
                spyOn(_angularFireAuth, 'initialize');
                spyOn(window, 'Firebase').andReturn(database);
                spyOn(_rootScope, '$on')

                _AuthService.initialize('/home');
            }))

            it('sets route path to targetLocation', function() {
                expect(_rootScope.auth.targetRoute).toBe('/home')
            })

        })

        describe('isAuthenticated', function() {
            it('returns true when user object is populated', function() {
                _rootScope.auth = { user: {} };
                expect(_AuthService.isAuthenticated()).toBe(true);
            })

            it('returns false when user object is undefined', function() {
                _rootScope.auth = { user: undefined };
                expect(_AuthService.isAuthenticated()).toBe(false);
            })

            it('returns false when user object is null', function() {
                _rootScope.auth = { user: null };
                expect(_AuthService.isAuthenticated()).toBe(false);
            })
        })

        describe('currentUser', function() {

            it('returns current authenticated user', function() {
                _rootScope.auth = { user: { id: 'current-id' } };
                expect(_AuthService.currentUser()).toBe(_rootScope.auth.user);
            })
        })

        describe('Logout Event', function() {

            beforeEach(function() {
                spyOn(_location, 'path');
                _AuthService._onLogout();
            })

            it('sets location path /login', function() {
                expect(_location.path).toHaveBeenCalledWith('/login')
            })
        })

        describe('Login Event', function() {

            beforeEach(function() {
                spyOn(_location, 'path');
            })

            it('sets location path /', function() {
                _rootScope.auth = { targetRoute: '/' };
                _AuthService._onLogin();
                expect(_location.path).toHaveBeenCalledWith('/')
            })

            it('sets location path /home', function() {
                _rootScope.auth = { targetRoute: '/home' };
                _AuthService._onLogin();
                expect(_location.path).toHaveBeenCalledWith('/home')
            })
        })

        describe('Route Change Start Event', function() {
            beforeEach(function() {
                spyOn(_location, 'path');
            })

            it('sets path to /login when not authorized', function() {
                spyOn(_AuthService, 'isAuthenticated').andReturn(false);
                _AuthService._onRouteChangeStart();
                expect(_location.path).toHaveBeenCalledWith('/login')
            })

            it('does not change path when authenticated', function() {
                spyOn(_AuthService, 'isAuthenticated').andReturn(true);
                _AuthService._onRouteChangeStart();
                expect(_location.path).not.toHaveBeenCalled()
            })
        })

    })

    describe('LoginController', function() {

        var _scope, _angularFireAuth;

        beforeEach(inject(function($rootScope, $controller, angularFireAuth) {
            _scope = $rootScope.$new();
            _angularFireAuth = angularFireAuth;
            spyOn(angularFireAuth, 'login');

            $controller('LoginController', {$scope: _scope});
        }));

        it('sets login options to scope', function() {
            var options = [
                { name: 'Facebook', key: 'facebook' },
                { name: 'GitHub', key: 'github' },
                { name: 'Twitter', key: 'twitter' }
            ];
            expect(_scope.options).toEqual(options);
            expect(_scope.option).toEqual(options[0]);
        });

        it('calls angularFireAuth login', function() {
            _scope.option = _scope.options[1];
            _scope.login();
            expect(_angularFireAuth.login).toHaveBeenCalledWith('github');
        });
    });

    describe('vatLogout directive', function() {

        var element, _angularFireAuth;

        beforeEach(inject(function($compile, $rootScope, $httpBackend, angularFireAuth) {
            _angularFireAuth = angularFireAuth;
            spyOn(_angularFireAuth, 'logout');

            $httpBackend.whenGET('firebase/logout.html').respond('<button ng-click="logout()"></button>')

            element = angular.element('<div data-vat-logout></div>')
            $compile(element)($rootScope);
            $rootScope.$digest();
            $httpBackend.flush();
            element.find('button').triggerHandler('click');
        }))

        it('clicking logout button calls logout', function() {
            expect(_angularFireAuth.logout).toHaveBeenCalled();
        })
    })
})