(function() {
    var character = angular.module('Character', ['AuthModule', 'FbModule', 'Tables']);

    character.factory('CharacterFbService', ['FbService', function(FbService) {
        return {
            newCharacter: function() {
                var attributes = ['body', 'agility', 'reaction', 'strength', 'charisma', 'intuition', 'logic', 'willpower', 'essence', 'edge', 'magicOrResonance'];
                var priorities = ['metatype', 'attributes', 'magicOrResonance', 'magicOrResonanceSelection', 'skills', 'resources'];
                var character = {
                    uid: null,
                    name: 'New Character',
                    metatype: 'Human',
                    magicOrResonance: '',
                    priority: {},
                    attribute: {}
                };
                for (var i = 0; i < priorities.length; i++){
                    character.priority[priorities[i]] = '';
                }
                for (var i = 0; i < attributes.length; i++){
                    character.attribute[attributes[i]] = { points: 0, karma: 0 };
                }
                return character;
            },

            getCharactersByUserUid: function(userUid) {
                return FbService.getCollection('characters/' + userUid);
            },

            setUserCharacterToScopePath: function(userUid, characterUid, scope, scopePath) {
                FbService.setModelToScopePath('characters/' + userUid + '/' + characterUid, scope, scopePath);
            },

            addUserCharacter: function(userUid, character) {
                return FbService.addModelToPath(character, 'characters/' + userUid)
            }
        }

    }]);

    character.factory('CharacterCalcService', ['TableMetatypeAttribute', function(tableMetatypeAttribute) {

        var attributeNames = ['body', 'agility', 'reaction', 'strength', 'charisma', 'intuition', 'logic', 'willpower'];
        var specialAttributeNames = ['edge', 'magicOrResonance'];

        function totalPoints(character, attributes) {
            if (isDefined(character)) {
                var total = 0;
                for (var i = 0; i < attributes.length; i++) {
                    total += character.attribute[attributes[i]].points;
                }
                return total;
            }
            return '';
        }

        var calc = {}
        calc.baseAttributeScore = function(character, attributeName) {
                return tableMetatypeAttribute[character.metatype.toLowerCase()][attributeName].base;
            };

        calc.limitAttributeScore = function(character, attributeName) {
                return tableMetatypeAttribute[character.metatype.toLowerCase()][attributeName].limit;
            };

        calc.totalAttributePoints = function(character) {
                return totalPoints(character, attributeNames);
            };

        calc.totalSpecialAttributePoints = function(character) {
                return totalPoints(character, specialAttributeNames);
            };

        calc.attributeScore = function(character, attributeName) {
                var meta = calc.baseAttributeScore(character, attributeName);
                var attr = character.attribute[attributeName];
                return meta + attr.points;
            };

        return calc;
    }]);

    character.factory('PriorityService', ['TablePriority', function(TablePriority) {
        return {
            attributePriorityPoints: function(character) {
                if (isDefined(character) &&
                    isDefined(character.priority.attributes) &&
                    isDefined(TablePriority[character.priority.attributes])) {
                    return TablePriority[character.priority.attributes].attributes;
                }
                return 0;
            },

            specialAttributePriorityPoints: function(character) {
                return TablePriority[character.priority.metatype].metatype[character.metatype.toLowerCase()];
            }
        }
    }]);

    character.controller('CharactersListCtrl', ['$scope', 'AuthService', 'CharacterFbService',
        function($scope, authService, characterFbService)
    {
        $scope.data = {
            characters: characterFbService.getCharactersByUserUid(authService.currentUser().uid)
        }
    }]);

    character.controller('CharactersEditCtrl', ['$scope', '$routeParams', 'AuthService', 'CharacterFbService',
        function($scope, $routeParams, authService, characterFbService)
    {
        $scope.data = {
            metatypes: ['Human', 'Elf', 'Dwarf', 'Ork', 'Troll']
        }
        characterFbService.setUserCharacterToScopePath(authService.currentUser().uid, $routeParams.characterUid, $scope, 'data.character');
    }]);

    character.filter('attributeBaseLimit', ['CharacterCalcService', function(characterCalcService) {
        return function(character, attribute) {
            if (isDefined(character)) {
                return characterCalcService.baseAttributeScore(character, attribute) + '/' +
                    characterCalcService.limitAttributeScore(character, attribute);
            }
            return '';
        }
    }]);

    character.filter('attributeScore', ['CharacterCalcService', function(characterCalcService) {
        return characterCalcService.attributeScore;
    }]);

    character.filter('attributeTotalPoints', ['CharacterCalcService', function(characterCalcService) {
        return characterCalcService.totalAttributePoints;
    }]);

    character.filter('attributePriorityPoints', ['PriorityService', function(priorityService) {
        return priorityService.attributePriorityPoints;
    }]);

    character.filter('specialAttributeTotalPoints', ['CharacterCalcService', function(characterCalcService) {
        return characterCalcService.totalSpecialAttributePoints;
    }]);

    character.filter('specialAttributePriorityPoints', ['PriorityService', function(priorityService) {
        return priorityService.specialAttributePriorityPoints;
    }]);

    character.directive('vatCharacterAttributes', function() {
        return {
            templateUrl: 'character/attribute-table.html',
            scope: {
                character: '=vatCharacterAttributes'
            }
        }
    })

    character.directive('vatNewCharacter', function() {
        return {
            scope: {},
            controller: ['$scope', '$location', 'AuthService', 'CharacterFbService', function($scope, $location, authService, characterFbService) {
                $scope.newCharacter = function() {
                    var character = characterFbService.newCharacter();
                    $location.path('characters/' + characterFbService.addUserCharacter(authService.currentUser().uid, character));
                }
            }],
            link: function($scope, element) {
                element.bind("click", function() {
                    $scope.newCharacter();
                })
            }
        }
    });

    character.directive('vatCharacterPriority', function() {
        return {
            templateUrl: 'character/priority-table.html',
            scope: {
                priority: '=vatCharacterPriority'
            },
            controller: ['$scope', 'TablePriority', function($scope, TablePriority) {
                $scope.priorityTable = TablePriority;
            }]
        }
    });

})();