describe('firebase.js - FbModule Module', function() {

    beforeEach(function() {
        angular.mock.module('FbModule');
    })

    describe('Sets the application values', function() {
        it('should set fbURL', inject(function(fbURL) {
            expect(fbURL).toEqual('https://vatjob.firebaseio.com');
        }))
    })

    describe('UuidService', function() {

        var _uuidService;

        beforeEach(function() {
            angular.mock.module('FbModule');
            inject(function(UuidService) {
                _uuidService = UuidService;
            })
        })

        it('should generate random uuid', function() {
            var id1, id2
            id1 = _uuidService.guid();
            id2 = _uuidService.guid();
            expect(id1.length).toBe(36);
            expect(id2.length).toBe(36);
            expect(id1).not.toEqual(id2);
        })
    })
});