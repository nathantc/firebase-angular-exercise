describe('character.js - Character Module', function() {

    describe('configuration', function() {

        var module, dependencies;

        var hasModule = function(m) {
            return dependencies.indexOf(m) >= 0;
        }

        beforeEach(function() {
            module = angular.module('Character');
            dependencies = module.value('appName').requires;
        })

        it('should be registered', function() {
            expect(module).toBeDefined();
        })

        it('should have Table as a dependency', function() {
            expect(hasModule('Table')).toEqual(true);
        })

        it('should have firebase as a dependency', function() {
            expect(hasModule('firebase')).toEqual(true);
        })
    })
});