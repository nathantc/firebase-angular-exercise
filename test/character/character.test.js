"use strict";

describe('character.js - Character Module', function() {

    beforeEach(angular.mock.module('Character'));

    describe('CharacterFbService', function() {

        var _fbService, _characterFbService;

        beforeEach(function() {
            inject(function(CharacterFbService, FbService) {
                _characterFbService = CharacterFbService;
                _fbService = FbService;
            })
        })

        it('calls FbService with path for characters by user uid', function() {
            var characters = [ { name: 'joe' }];
            spyOn(_fbService, 'getCollection').andReturn(characters);
            var result = _characterFbService.getCharactersByUserUid('joe-uid');
            expect(_fbService.getCollection).toHaveBeenCalledWith('characters/joe-uid');
            expect(result).toEqual(characters);
        })

        it('calls FbService for setting model to scope', function() {
            spyOn(_fbService, 'setModelToScopePath');
            var _scope = { data: {} }, path = 'data.character';
            _characterFbService.setUserCharacterToScopePath('bob-uid', 'character-uid', _scope, path)
            expect(_fbService.setModelToScopePath).toHaveBeenCalledWith('characters/bob-uid/character-uid', _scope, path);
        })

        it('calls FbService for creating to model on path', function() {
            var uid = 'new-uid', character = { name: 'steve' };
            spyOn(_fbService, 'addModelToPath').andReturn(uid);
            expect(_characterFbService.addUserCharacter('user-uid', character)).toBe(uid);
            expect(_fbService.addModelToPath).toHaveBeenCalledWith(character, 'characters/user-uid');
        })

        it('newCharacter', function() {
            expect(_characterFbService.newCharacter()).toEqual(newCharacter());
        })

        function newCharacter() {
            var attributes = ['body', 'agility', 'reaction', 'strength', 'charisma', 'intuition', 'logic', 'willpower', 'essence', 'edge', 'magicOrResonance'];
            var priorities = ['metatype', 'attributes', 'magicOrResonance', 'magicOrResonanceSelection', 'skills', 'resources'];
            var newCharacter = {
                uid: null,
                name: 'New Character',
                metatype: 'Human',
                gender: 'Male',
                magicOrResonance: '',
                priority: {},
                attribute: {},
                quality: {}
                };
            for (var i = 0; i < priorities.length; i++){
                newCharacter.priority[priorities[i]] = '';
            }
            for (var i = 0; i < attributes.length; i++){
                newCharacter.attribute[attributes[i]] = { points: 0, karma: 0 };
            }
            return newCharacter;
        }
    })

    describe('CharacterCalcService', function() {

        var _CharacterCalcService, _CharacterFbService, character;

        beforeEach(function() {
            inject(function(CharacterCalcService, NameArrays, CharacterFbService) {
                _CharacterCalcService = CharacterCalcService;
                _CharacterFbService = CharacterFbService;

                character = { metatype: 'Human', attribute: {} };
                for (var i=0; i<NameArrays.standardAttributes.length; i++) {
                    character.attribute[NameArrays.standardAttributes[i]]= {points: i};
                }
                character.attribute.edge = {points:3};
                character.attribute.magicOrResonance = {points:4};
            });
        });

        it('returns base value for human metatype attribute', function() {
            character.metatype = 'human'
            expect(_CharacterCalcService.baseAttributeScore(character, 'strength')).toEqual(1);
            expect(_CharacterCalcService.baseAttributeScore(character, 'edge')).toEqual(2);
            expect(_CharacterCalcService.baseAttributeScore(character, 'magicOrResonance')).toEqual(0);
        })

        it('returns base value for troll metatype attribute', function() {
            character.metatype = 'troll'
            expect(_CharacterCalcService.baseAttributeScore(character, 'strength')).toEqual(5);
            expect(_CharacterCalcService.baseAttributeScore(character, 'edge')).toEqual(1);
            expect(_CharacterCalcService.baseAttributeScore(character, 'magicOrResonance')).toEqual(0);
        })

        it('returns limit value for dwarf metatype attribute', function() {
            character.metatype = 'dwarf'
            expect(_CharacterCalcService.limitAttributeScore(character, 'body')).toEqual(8);
            expect(_CharacterCalcService.limitAttributeScore(character, 'strength')).toEqual(8);
            expect(_CharacterCalcService.limitAttributeScore(character, 'willpower')).toEqual(7);
        })

        it('returns elf value for troll metatype attribute', function() {
            character.metatype = 'elf'
            expect(_CharacterCalcService.limitAttributeScore(character, 'agility')).toEqual(7);
            expect(_CharacterCalcService.limitAttributeScore(character, 'reaction')).toEqual(6);
            expect(_CharacterCalcService.limitAttributeScore(character, 'intuition')).toEqual(6);
        })

        it('totals the allocated attribute points', function() {
            expect(_CharacterCalcService.totalAttributePoints(character)).toBe(28);
        })

        it('totals the allocated special attribute points', function() {
            expect(_CharacterCalcService.totalSpecialAttributePoints(character)).toBe(7);
        })

        it('retrieves the attribute score by name', function() {
            character.metatype = 'Human'
            character.attribute.strength.points = 5
            expect(_CharacterCalcService.attributeScore(character, 'strength')).toBe(6)
            character.metatype = 'Dwarf'
            character.attribute.strength.points = 6
            expect(_CharacterCalcService.attributeScore(character, 'strength')).toBe(9)
        })

        describe('character karma', function() {

            var character;

            beforeEach(function() {
                character = _CharacterFbService.newCharacter();
            })

            it('new characters have 25 karma', function() {
                expect(_CharacterCalcService.karma(character)).toBe(25);
            });

            it('reduces karma by the total positive qualities', function() {
                character.quality.ambidextrous = { karma: 5 };
                character.quality.guts = { karma: 3 };
                expect(_CharacterCalcService.karma(character)).toBe(17);
            })

            it('add karma by the total negative qualities', function() {
                character.quality.adiction = { karma: -5 };
                character.quality.allergy = { karma: -10 };
                expect(_CharacterCalcService.karma(character)).toBe(40);
            })
        })

    });

    describe('PriorityService', function() {

        var _PriorityService, character;

        beforeEach(function() {
            inject(function(PriorityService, NameArrays) {
                _PriorityService = PriorityService;
                character = { priority: { attributes: ''} };
            });
        });

        it('returns the attribute points for priority level A', function() {
            character.priority.attributes = 'A';
            expect(_PriorityService.attributePriorityPoints(character)).toBe(24);
            character.priority.attributes = 'B';
            expect(_PriorityService.attributePriorityPoints(character)).toBe(20);
            character.priority.attributes = 'C';
            expect(_PriorityService.attributePriorityPoints(character)).toBe(16);
            character.priority.attributes = 'D';
            expect(_PriorityService.attributePriorityPoints(character)).toBe(14);
            character.priority.attributes = 'E';
            expect(_PriorityService.attributePriorityPoints(character)).toBe(12);
        })
    })

    describe('CharacterListController', function() {

        var _scope, _authService, _characterFbService,
            characterList = [{ name:'joe' }];

        beforeEach(function() {
            inject(function($rootScope, $controller, AuthService, CharacterFbService)
            {
                _authService = AuthService;
                _characterFbService = CharacterFbService;

                spyOn(_authService, 'currentUser').andReturn({ uid: 'user-uid' });
                spyOn(_characterFbService, 'getCharactersByUserUid').andReturn(characterList);

                _scope = $rootScope.$new();
                $controller('CharactersListController', { $scope:_scope });
            });
        })

        it('retrieves current user from auth service', function() {
            expect(_authService.currentUser).toHaveBeenCalled();
        })

        it('retrieves list of characters for authenticated user', function() {
            expect(_characterFbService.getCharactersByUserUid).toHaveBeenCalledWith('user-uid');
        })

        it('assigns character list to $scope.data.characters', function() {
            expect(_scope.data.characters).toBe(characterList);
        })
    })

    describe('CharacterEditController', function() {

        var _scope, _authService, _characterFbService, _routeParams,
            character = { name:'bob' };

        beforeEach(function() {
            inject(function($rootScope, $controller, AuthService, CharacterFbService)
            {
                _authService = AuthService;
                _characterFbService = CharacterFbService;
                _routeParams = { characterUid: 'character-uid' };

                spyOn(_authService, 'currentUser').andReturn({ uid: 'edit-user-uid' });
                spyOn(_characterFbService, 'setUserCharacterToScopePath').andReturn(character);

                _scope = $rootScope.$new();
                $controller('CharactersEditController', { $scope:_scope, $routeParams: _routeParams });
            });
        })

        it('sets metatype names to scope.data.metatypes', function() {
            expect(_scope.data.metatypes).toEqual(['Human', 'Elf', 'Dwarf', 'Ork', 'Troll']);
        })

        it('retrieves current user from auth service', function() {
            expect(_authService.currentUser).toHaveBeenCalled();
        })

        it('retrieves list of characters for authenticated user', function() {
            expect(_characterFbService.setUserCharacterToScopePath).toHaveBeenCalledWith(
                'edit-user-uid', 'character-uid', _scope, 'data.character');
        })
    })

    describe('directive vatCharacterAttributes', function() {

        var element;

        beforeEach(inject(function($compile, $rootScope, $httpBackend) {

            $httpBackend.whenGET('character/attribute-table.html').respond('<table></table>')
            $rootScope.data = { character: { name: 'steve' } }
            element = angular.element('<div data-vat-character-attributes="data.character"></div>')

            $compile(element)($rootScope)
            $rootScope.$digest()
            $httpBackend.flush()
        }))

        it('should load template', function() {
            expect(element.find('table').length).toBeGreaterThan(0);
        })

        it('should set isolate scope', function() {
            expect(element.scope().character).toBeDefined();
            expect(element.scope().character.name).toEqual('steve');
        })
    })

    describe('directive vatNewCharacter', function() {

        var element, linked, _location;
        beforeEach(inject(function($compile, $rootScope,
                                   $httpBackend, $location) {
            _location = $location;
            element = angular.element('<button data-vat-new-character></button>');
            linked = $compile(element)($rootScope);
            $rootScope.$digest();
        }));

        var _characterFbService, _authService,
            character = { name: 'new-guy' };
        beforeEach(inject(function(CharacterFbService, AuthService) {
            _authService = AuthService;
            spyOn(_authService, 'currentUser').andReturn({ uid: 'current-user-id' });
            _characterFbService = CharacterFbService;
            spyOn(_characterFbService, 'newCharacter').andReturn(character);
            spyOn(_characterFbService, 'addUserCharacter').andReturn('new-guy-uid');
            element.triggerHandler('click');
        }));

        it('should retrieve new character model from service', function() {
            expect(_characterFbService.newCharacter).toHaveBeenCalled();
        });

        it('should persist new character model', function() {
            expect(_characterFbService.addUserCharacter).toHaveBeenCalledWith('current-user-id', character);
        })

        it('should set path to character uid on click', function() {
            expect(_location.path()).toEqual('/characters/new-guy-uid');
        });

    });

    describe('directive vatCharacterPriority', function() {

        var element;

        beforeEach(inject(function($compile, $rootScope, $httpBackend) {

            $httpBackend.whenGET('character/priority-table.html').respond('<table></table>')
            $rootScope.data = { character: { name: 'steve', priority: ['A'] } }
            element = angular.element('<div data-vat-character-priority="data.character.priority"></div>')

            $compile(element)($rootScope)
            $rootScope.$digest()
            $httpBackend.flush()
        }))

        it('should load template', function() {
            expect(element.find('table').length).toBeGreaterThan(0);
        })

        it('should set isolate scope', function() {
            expect(element.scope().priority).toBeDefined();
            expect(element.scope().priority[0]).toEqual('A');
        })
    })

    describe('directive vatCharacterQualities', function() {
        var element, _Qualities;

        beforeEach(inject(function($compile, $rootScope, $httpBackend, Qualities) {
            _Qualities = Qualities;

            $httpBackend.whenGET('character/qualities.html').respond('<table></table>')
            $rootScope.data = { character: { name: 'steve' } }
            element = angular.element('<div data-vat-character-qualities="data.character"></div>')

            $compile(element)($rootScope)
            $httpBackend.flush()
        }));

        it('should load template', function() {
            expect(element.find('table').length).toBeGreaterThan(0);
        })

        it('should set isolate scope', function() {
            expect(element.scope().character).toBeDefined();
            expect(element.scope().character.name).toEqual('steve');
        })

        it('should set Qualities to scope', function() {
            expect(element.scope().qualities).toBe(_Qualities);
        })

        describe('controller functions', function() {

            it('initializes qualityType to positive', function() {
                expect(element.scope().qualityType).toBe('positive');
            })

            describe('addQuality', function() {

                it('adds quality by key name', function() {
                    element.scope().addQuality('guts');
                    expect(element.scope().character.quality.guts).toBeDefined();
                    expect(element.scope().character.quality.guts.karma).toBe(10);
                    expect(element.scope().character.quality.guts.name).toBe("Guts");
                })

                it('initializes rating to 1', function() {
                    element.scope().addQuality('aptitude');
                    expect(element.scope().character.quality.aptitude.rating).toBe(1);
                })

                it('adds single rating quality', function() {
                    element.scope().addQuality('aptitude');
                    expect(element.scope().character.quality.aptitude.maxRating).toBeUndefined();
                })

                it('adds max rating quality', function() {
                    element.scope().addQuality('focusedConcentration');
                    expect(element.scope().character.quality.focusedConcentration).toBeDefined();
                    expect(element.scope().character.quality.focusedConcentration.maxRating).toBe(6);
                })

                it('does not copy quality description', function() {
                    element.scope().addQuality('catlike');
                    expect(element.scope().character.quality.catlike).toBeDefined();
                    expect(element.scope().character.quality.catlike.short).toBeUndefined();
                    expect(element.scope().character.quality.catlike.description).toBeUndefined();
                })

            })

            describe('removeQuality', function() {

                it('removes quality by key name', function() {
                    element.scope().character.quality = { catlike: { name: 'Catlike' } };
                    element.scope().removeQuality('catlike');
                    expect(element.scope().character.quality.catlike).toBeUndefined();
                })
            })

            describe('characterHasQuality', function() {

                it('returns true when character has quality', function() {
                    element.scope().character.quality = { catlike: { name: 'Catlike' } };
                    expect(element.scope().characterHasQuality('catlike')).toBeTruthy();
                })

                it('returns false when character does not have quality', function() {
                    expect(element.scope().characterHasQuality('guts')).toBeFalsy();
                })
            })

            describe('positiveQualities', function() {

                it('returns only qualities with positive karma', function() {
                    var qualities = element.scope().positiveQualities();
                    expect(Object.keys(qualities).length).toBeGreaterThan(0);
                    for (var i in qualities) {
                        expect(qualities[i].karma).toBeGreaterThan(-1);
                    }
                })
            })

            describe('negativeQualities', function() {

                it('returns only qualities with positive karma', function() {
                    var qualities = element.scope().negativeQualities();
                    expect(Object.keys(qualities).length).toBeGreaterThan(0);
                    for (var i in qualities) {
                        expect(qualities[i].karma).toBeLessThan(0);
                    }
                })
            })

        })

    })

    describe('directive vatQualityRatingAdjuster', function() {

        var element;

        beforeEach(inject(function($compile, $rootScope, $httpBackend) {
            $httpBackend.whenGET('character/qualityRatingAdjuster.html').respond('<div>Test</div>');
            $rootScope.quality = { name: 'Guts', rating: 1 };
            element = angular.element('<div data-vat-quality-rating-adjuster="quality"></div>');

            $compile(element)($rootScope);
            $httpBackend.flush();
        }))

        it('should load template', function() {
            expect(element.find('div').text()).toBe('Test');
        })

        it('should set isolate scope', function() {
            expect(element.scope().quality).toBeDefined();
            expect(element.scope().quality.name).toBe('Guts');
        })

        describe('controller functions', function() {

            beforeEach(inject(function($rootScope, $controller) {
                element.scope().quality = { name: 'focusedConcentration',  karma: 4, rating: 1, maxRating: 6 }
            }));

            describe('increaseRating', function() {

                it('increases rating by one point', function() {
                    element.scope().increaseRating();
                    expect(element.scope().quality.rating).toBe(2);
                    element.scope().increaseRating();
                    expect(element.scope().quality.rating).toBe(3);
                })

                it('does increase rating beyond maxRating value', function() {
                    element.scope().quality.rating = 6;
                    element.scope().increaseRating();
                    expect(element.scope().quality.rating).toBe(6);
                })

                it('does not increase rating for quality with undefined maxRating', function() {
                    element.scope().quality.maxRating = undefined;
                    element.scope().increaseRating();
                    expect(element.scope().quality.rating).toBe(1);
                })
            })

            describe('decreaseRating', function() {

                it('decreases rating by one point', function() {
                    element.scope().quality.rating = 3;
                    element.scope().decreaseRating();
                    expect(element.scope().quality.rating).toBe(2);
                    element.scope().decreaseRating();
                    expect(element.scope().quality.rating).toBe(1);
                })

                it('does not decrease rating below 1', function() {
                    element.scope().decreaseRating();
                    expect(element.scope().quality.rating).toBe(1);
                })
            })

        })
    })
});