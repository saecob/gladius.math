/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global gladius: false, document: false, window: false, module: false, start,
  test: false, expect: false, ok: false, notEqual: false, stop, QUnit: false */

(function() {

    var math = null;

    // Name of our module
    module( 'Quaternion Tests', {
        setup: function () {
            stop();
            _math.create( {}, function( instance ) {
                math = instance;
                start();
            });
        },

        teardown: function () {
            math = null;
        }
    });

}());
