/*jshint white: false, strict: false, plusplus: false, onevar: false,
nomen: false */
/*global gladius: false, document: false, window: false, module: false, start,
test: false, expect: false, ok: false, notEqual: false, stop, QUnit: false */

(function() {

    var math = null;

// Name of our module
    module( 'Math/Transform', {
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

    test( 'Translation (return)', function() {
        expect( 1 );

        var position = math.Vector3( 1, 2, 3 );
        var result = math.transform.translate( position );

        ok(
            math.matrix4.equal( result,
            [ 1, 0, 0, 1,
              0, 1, 0, 2,
              0, 0, 1, 3,
              0, 0, 0, 1 ] ),
            'Translation matrix is correct'
        );
    });

    test( 'Rotation', function() {
        expect( 1 );

        var rotation = math.Vector3( math.TAU/2, math.TAU/3, math.TAU/4 );
        var result = math.transform.rotate( rotation );
        var expected = [ 0, -1/2, -Math.sqrt(3)/2, 0,
                         1, 0, 0, 0,
                         0, -Math.sqrt(3)/2, 1/2, 0,
                         0, 0, 0, 1 ];

        ok(
            math.matrix4.equal( result, expected ),
            'Expected: [ 0, -1/2, -0.866, 0, 1, 0, 0, 0, 0, -0.866, 1/2, 0, 0, 0, 0, 1 ] \n Returned: ' 
            + result[0] + ', ' + result[1] + ', ' + result[2] + ', ' + result[3]
            + ', ' + result[4] + ', ' + result[5] + ', ' + result[6] + ', ' + result[7]
            + ', ' + result[8] + ', ' + result[9] + ', ' + result[10] + ', ' + result[11]
            + ', ' + result[12] + ', ' + result[13] + ', ' + result[14] + ', ' + result[15]
        );

    });

    test( 'Scale', function() {
        expect( 1 );

        var scale = math.Vector3( 2, 2, 2 );
        var result = math.transform.scale( scale );

        ok(
            math.matrix4.equal( result,
            [ 2, 0, 0, 0,
              0, 2, 0, 0,
              0, 0, 2, 0,
              0, 0, 0, 1 ] ),
            'Scale matrix is correct'
        );
    });
}());