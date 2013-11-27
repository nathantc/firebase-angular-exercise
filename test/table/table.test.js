describe('table.js - Table Module', function() {

    describe('tables', function() {

        beforeEach(function() {
            angular.mock.module('Tables');
        })

        it('defines TableMetatypeAttribute', inject(function(TableMetatypeAttribute) {
            expect(TableMetatypeAttribute).toBeDefined();
        }))

        it('defines TablePriority', inject(function(TablePriority) {
            expect(TablePriority).toBeDefined();
        }))

        it('defines NameArrays', inject(function(NameArrays) {
            expect(NameArrays).toBeDefined();
        }))

        it('defines NameArrayAttributes', inject(function(NameArrays, NameArrayAttributes) {
            expect(NameArrayAttributes).toBeDefined();
            expect(NameArrays.attributes).toEqual(NameArrayAttributes);
        }))

        it('defines NameArrayStandardAttributes', inject(function(NameArrays, NameArrayStandardAttributes) {
            expect(NameArrayStandardAttributes).toBeDefined();
            expect(NameArrays.standardAttributes).toEqual(NameArrayStandardAttributes);
        }))

        it('defines NameArraySpecialAttributes', inject(function(NameArrays, NameArraySpecialAttributes) {
            expect(NameArraySpecialAttributes).toBeDefined();
            expect(NameArrays.specialAttributes).toEqual(NameArraySpecialAttributes);
        }))
    })

});