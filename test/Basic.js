/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global gladius: false, document: false, window: false, module: false, start,
  test: false, expect: false, ok: false, notEqual: false, stop, QUnit: false */

(function() {

    var m = null;

    module( 'Math', {
        setup: function () {
            math.create( {}, function( instance ) {
                m = instance;
                start();
            });
        },

        teardown: function () {
            m = null;
        }
    });

    test( 'Basic', function() {
        expect( 0 );        
    });

}());
