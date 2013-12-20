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
                    gender: 'Male',
                    magicOrResonance: '',
                    priority: {},
                    attribute: {},
                    quality: {}
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

        calc.karma = function(character) {
            var karma = 25;
            for (var quality in character.quality) {
                karma = karma - character.quality[quality].karma;
            }
            return karma;
        }

        return calc;
    }]);

    character.factory('PriorityService', ['TablePriority', function(TablePriority) {
        return {
            attributePriorityPoints: function(character) {
                return TablePriority[character.priority.attributes].attributes;
            },

            specialAttributePriorityPoints: function(character) {
                return TablePriority[character.priority.metatype].metatype[character.metatype.toLowerCase()];
            }
        }
    }]);

    character.controller('CharactersListController', ['$scope', 'AuthService', 'CharacterFbService',
        function($scope, authService, characterFbService)
    {
        $scope.data = {
            characters: characterFbService.getCharactersByUserUid(authService.currentUser().uid)
        }
    }]);

    character.controller('CharactersEditController', ['$scope', '$routeParams', '$location', 'AuthService', 'CharacterFbService',
        function($scope, $routeParams, $location, authService, characterFbService)
    {
        $scope.data = {
            metatypes: ['Human', 'Elf', 'Dwarf', 'Ork', 'Troll'],
            tab: 'metatype',
            setTab: function(name) {
                $scope.data.tab = name;
               // $location.search('tab', name);
            }
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
        return function(character, attributeName) {
            if (validObjectPathName(character, 'metatype')){
                return characterCalcService.attributeScore(character, attributeName);
            }
            return '';
        }
    }]);

    character.filter('attributeTotalPoints', ['CharacterCalcService', function(characterCalcService) {
        return characterCalcService.totalAttributePoints;
    }]);

    character.filter('attributePriorityPoints', ['PriorityService', function(priorityService) {
        return function(character) {
            if (validObjectPathName(character, 'priority.attributes')) {
                return priorityService.attributePriorityPoints(character);
            }
            return '';
        }
    }]);

    character.filter('specialAttributeTotalPoints', ['CharacterCalcService', function(characterCalcService) {
        return characterCalcService.totalSpecialAttributePoints;
    }]);

    character.filter('specialAttributePriorityPoints', ['PriorityService', function(priorityService) {
        return function(character) {
            if (validObjectPathName(character, 'priority.metatype')){
                return priorityService.specialAttributePriorityPoints(character);
            }
            return '';
        }
    }]);

    character.filter('hasQuality', function() {
        return function(character, name) {
            return validObjectPathName(character, 'quality.' + name);
        }
    });

    character.filter('karma', ['CharacterCalcService', function(CharacterCalcService) {
        return function(character) {
            if (validObjectPathName(character, 'quality')){
                return CharacterCalcService.karma(character);
            }
            return '';
        }
    }]);

    character.filter('positiveQuality', function() {
        return function(quality, value) {
            var result = {}
            for (var key in quality) {
                if (quality[key].karma * value >= 0) {
                    result[key] = quality[key];
                }
            }
            return result;
        }
    })

    character.directive('vatCharacterAttributes', function() {
        return {
            templateUrl: 'character/attribute-table.html',
            scope: {
                character: '=vatCharacterAttributes'
            }
        }
    })

    character.directive('vatNewCharacter', ['$location', 'AuthService', 'CharacterFbService',
        function($location, authService, characterFbService) {
        return {
            scope: {},
            link: function($scope, element) {
                element.bind("click", function() {
                    var character = characterFbService.newCharacter();
                    $location.path('characters/' + characterFbService.addUserCharacter(authService.currentUser().uid, character));
                })
            }
        }
    }]);

    character.directive('vatCharacterPriority', ['TablePriority', function(TablePriority) {
        return {
            templateUrl: 'character/priority-table.html',
            scope: {
                priority: '=vatCharacterPriority'
            },
            link: function($scope) {
                $scope.priorityTable = TablePriority;
            }
        }
    }]);

    character.directive('vatCharacterQualities', function() {
        return {
            templateUrl: 'character/qualities.html',
            scope: {
                character: '=vatCharacterQualities'
            },
            controller: ['$scope', 'Qualities', function($scope, Qualities) {
                $scope.qualities = Qualities;
                $scope.qualityType = 'positive';

                $scope.addQuality = function(key) {
                    $scope.character.quality = $scope.character.quality || {};
                    $scope.character.quality[key] = {
                        name: Qualities[key].name,
                        karma: Qualities[key].karma,
                        rating: 1,
                        maxRating: Qualities[key].maxRating
                    }
                }

                $scope.removeQuality = function(key) {
                    delete $scope.character.quality[key];
                }

                $scope.characterHasQuality = function(key) {
                    return validObjectPathName($scope.character, 'quality.' + key);
                }

                function qualities(value) {
                    var result = {}
                    for (var key in $scope.qualities) {
                        if ($scope.qualities[key].karma >= 0) {
                            result[key] = $scope.qualities[key];
                        }
                    }
                    return result;
                }

                $scope.positiveQualities = function() {
                    var result = {}
                    for (var key in $scope.qualities) {
                        if ($scope.qualities[key].karma >= 0) {
                            result[key] = $scope.qualities[key];
                        }
                    }
                    return result;
                }

                $scope.negativeQualities = function() {
                    var result = {}
                    for (var key in $scope.qualities) {
                        if ($scope.qualities[key].karma < 0) {
                            result[key] = $scope.qualities[key];
                        }
                    }
                    return result;
                }
            }]
        }
    })

    character.directive('vatQualityRatingAdjuster', function() {
        return {
            templateUrl: 'character/qualityRatingAdjuster.html',
            scope: {
                quality: '=vatQualityRatingAdjuster'
            },
            controller: ['$scope', function($scope) {
                $scope.increaseRating = function() {
                    if (isDefined($scope.quality.maxRating) && $scope.quality.rating < $scope.quality.maxRating) {
                        $scope.quality.rating++;
                    }
                }

                $scope.decreaseRating = function() {
                    if ($scope.quality.rating > 1) {
                        $scope.quality.rating--;
                    }
                }
            }]
        }
    })

})();