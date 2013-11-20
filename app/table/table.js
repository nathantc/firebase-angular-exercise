(function() {

    var table = angular.module('Table', ['firebase']);

    var _table = {
        metatypeAttribute: {},
        priority: {}
    };

    table.constant('table', _table);

    table.run(['fbURL', function(fbURL) {
        var root = fbURL + '/tables';
        new Firebase(root + '/metatypeAttribute').once('value', function(data) {
            _table.metatypeAttribute = data.val();
        });
        new Firebase(root + '/priority').once('value', function(data) {
            _table.priority = data.val();
        });
    }]);

})();
