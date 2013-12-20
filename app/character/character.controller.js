(function() {

    var character = angular.module('CharacterController', ['Tables']);

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

    character.controller('CharacterQualityController', ['$scope', 'Qualities', function($scope, Qualities) {
        $scope.qualities = Qualities;
        $scope.qualityType = 1;

        $scope.addQuality = function(key) {
            $scope.character.quality = $scope.character.quality || {};
            $scope.character.quality[key] = {
                name: Qualities[key].name,
                karma: Qualities[key].karma
            }
        }

        $scope.removeQuality = function(key) {
            delete $scope.character.quality[key];
        }

        $scope.characterHasQuality = function(key) {
            return validObjectPathName($scope.character, 'quality.' + key);
        }

    }])

})()
