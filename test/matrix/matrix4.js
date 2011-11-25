/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global gladius: false, document: false, window: false, module: false, start,
  test: false, expect: false, ok: false, notEqual: false, stop, QUnit: false */

(function() {

    var math = null;
	
	// Name of our module
    module( 'Matrix4', {
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

    test( 'Multiplication', function() {
        expect( 1 );

        var m1 = math.Matrix4( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ] );
        var m2 = math.Matrix4( [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ] );
        
        ok(
            math.matrix4.equal( math.matrix4.multiply( m1, m2 ),
                [ 100, 110, 120, 130,
                  228, 254, 280, 306,
                  356, 398, 440, 482,
                  484, 542, 600, 658 ] ),
            'Result is correct when returned'
        );

    });

}());
