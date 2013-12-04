(function() {

    var character = angular.module('CharacterCtrl', ['Tables']);

    character.controller('CharacterQualityCtrl', ['$scope', 'Qualities', function($scope, Qualities) {
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
