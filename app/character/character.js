(function() {
    var character = angular.module('Character', ['Table','firebase']);

    character.factory('characterFbService', ['$rootScope', 'fbURL', 'angularFire', 'angularFireCollection', 'UuidService',
            function($rootScope, fbURL, angularFire, angularFireCollection, UuidService) {

        function getCharactersUrl() {
            return fbURL + '/characters/' + $rootScope.user.uid;
        }
        return {
            setCharacterScope: function(characterUid, $scope, scopeModelReference) {
                angularFire(new Firebase(getCharactersUrl() + '/' + characterUid), $scope, scopeModelReference);
            },

            getCharacterList: function() {
                return angularFireCollection(new Firebase(getCharactersUrl()));
            },

            createCharacter: function() {
                var uuid = UuidService.guid();
                var attributes = ['body', 'agility', 'reaction', 'strength', 'charisma', 'intuition', 'logic', 'willpower', 'essence', 'edge', 'magicOrResonance'];
                var priorities = ['metatype', 'attributes', 'magicOrResonance', 'magicOrResonanceSelection', 'skills', 'resources'];
                var newCharacter = {
                    id: uuid,
                    name: 'New Character',
                    metatype: 'Human',
                    magicOrResonance: '',
                    priority: {},
                    attribute: {}
                };
                for (var i = 0; i < priorities.length; i++){
                    newCharacter.priority[priorities[i]] = '';
                }
                for (var i = 0; i < attributes.length; i++){
                    newCharacter.attribute[attributes[i]] = { points: 0, karma: 0 };
                }
                new Firebase(getCharactersUrl() + '/' + uuid).set(newCharacter);
                return uuid;
            }
        }
    }]);

    character.factory('characterCalcService', ['table', function(table) {

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

        return {
            baseAttributeScore: function(character, attributeName) {
                return table.metatypeAttribute[character.metatype.toLowerCase()][attributeName].base;
            },

            limitAttributeScore: function(character, attributeName) {
                return table.metatypeAttribute[character.metatype.toLowerCase()][attributeName].limit;
            },

            totalAttributePoints: function(character) {
                return totalPoints(character, attributeNames);
            },

            totalSpecialAttributePoints: function(character) {
                return totalPoints(character, specialAttributeNames);
            },

            attributeScore: function(character, attributeName) {
                if (isDefined(character)) {
                    var meta = table.metatypeAttribute[character.metatype.toLowerCase()][attributeName];
                    var attr = character.attribute[attributeName];
                    return meta.base + attr.points;
                }
                return '';
            }

        }
    }]);

    character.factory('priorityService', ['table', function(table) {
        return {
            attributePriorityPoints: function(character) {
                if (isDefined(character) &&
                    isDefined(character.priority.attributes) &&
                    isDefined(table.priority[character.priority.attributes])) {
                    return table.priority[character.priority.attributes].attributes;
                }
                return 0;
            },

            specialAttributePriorityPoints: function(character) {
                return table.priority[character.priority.metatype].metatype[character.metatype.toLowerCase()];
            }
        }
    }]);

    character.controller('charactersListCtrl', ['$scope', 'characterFbService', function($scope, characterFbService) {
        $scope.data = {
            characters: characterFbService.getCharacterList()
        }
    }]);

    character.controller('charactersEditCtrl', ['$scope', '$routeParams', 'characterFbService', function($scope, $routeParams, characterFbService) {
        $scope.data = {
            metatypes: ['Human', 'Elf', 'Dwarf', 'Ork', 'Troll']
        }
        characterFbService.setCharacterScope($routeParams.characterUid, $scope, 'data.character');
    }]);

    character.filter('attributeBaseLimit', ['characterCalcService', function(characterCalcService) {
        return function(character, attribute) {
            if (isDefined(character)) {
                return characterCalcService.baseAttributeScore(character, attribute) + '/' +
                    characterCalcService.limitAttributeScore(character, attribute);
            }
            return '';
        }
    }]);

    character.filter('attributeScore', ['characterCalcService', function(characterCalcService) {
        return characterCalcService.attributeScore;
    }]);

    character.filter('attributeTotalPoints', ['characterCalcService', function(characterCalcService) {
        return characterCalcService.totalAttributePoints;
    }]);

    character.filter('attributePriorityPoints', ['priorityService', function(priorityService) {
        return priorityService.attributePriorityPoints;
    }]);

    character.filter('specialAttributeTotalPoints', ['characterCalcService', function(characterCalcService) {
        return characterCalcService.totalSpecialAttributePoints;
    }]);

    character.filter('specialAttributePriorityPoints', ['priorityService', function(priorityService) {
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
            controller: ['$scope', '$location', 'characterFbService', function($scope, $location, characterFbService) {
                $scope.newCharacter = function() {
                    $location.path('characters/' + characterFbService.createCharacter());
                }
            }],
            link: function($scope, element) {
                element.bind("click", function(e) {
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
            controller: ['$scope', 'table', function($scope, table) {
                $scope.priorityTable = table.priority;
            }]
        }
    });

})();