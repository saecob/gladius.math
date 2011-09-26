/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global gladius: false, document: false, window: false, module: false, start,
  test: false, expect: false, ok: false, notEqual: false, stop, QUnit: false */

(function() {

    var math = null;

    module( 'Math', {
        setup: function () {
            stop();
            math = new _Math();
            start();
        },

        teardown: function () {
            math = null;
        }
    });

    test( 'Basic', function() {
        expect( 2 );

        ok(
                math,
                'Math found'
        );
        ok(
                math.ARRAY_TYPE,
                'Found ARRAY_TYPE'
        );
    });

}());
