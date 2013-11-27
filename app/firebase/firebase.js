"use strict";

(function() {

    var fb = angular.module('FbModule', ['firebase']);

    fb.constant('fbURL', 'https://vatjob.firebaseio.com');

    fb.factory('UuidService', function() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return {
            guid: function() {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            }
        }
    });

    fb.factory('FbService', ['fbURL', 'angularFire', 'angularFireCollection', 'UuidService',
        function(fbURL, angularFire, angularFireCollection, UuidService)
    {
        function getFbURL(url) {
            if (url.indexOf('/') != 0){
                url = '/' + url;
            }
            return fbURL + url;
        }

        return {
            setModelToScopePath: function(url, $scope, path) {
                angularFire(new Firebase(getFbURL(url)), $scope, path);
            },

            getCollection: function(url) {
                return angularFireCollection(new Firebase(getFbURL(url)));
            },

            setDetachedModelToProperty: function(url, model, property, callback) {
                new Firebase(getFbURL(url)).once('value', function(data) {
                    model[property] = data.val();
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            },

            addModelToPath: function(model, url) {
                var uuid = UuidService.guid();
                model.uid = uuid;
                new Firebase(getFbURL(url) + '/' + uuid).set(model);
                return uuid;
            }
        };

    }]);
})()