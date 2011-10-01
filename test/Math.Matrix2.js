/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global gladius: false, document: false, window: false, module: false, start,
  test: false, expect: false, ok: false, notEqual: false, stop, QUnit: false */

(function() {

    var math = null;
	
	// Does name matter?
    module( 'Math/Matrix', {
        setup: function () {
            stop();
            math = new _Math();
            start();
        },

        teardown: function () {
            math = null;
        }
    });

    test( 'Create Matrix2 & Compare', function() {
        expect( 5 );

        var matrix2 = new math.Matrix2( [1, 0, 0, 1] ); //Identity matrix
        ok(
                matrix2,
                'Construct a matrix2 instance'
        );
        ok(
                matrix2 instanceof math.ARRAY_TYPE,
                'matrix2 is an instance of ARRAY_TYPE'
        );
        deepEqual(
                new math.ARRAY_TYPE( [1, 2, 2, 1] ),
                new math.Matrix2( [1, 2, 2, 1] )
        );
        ok(
                4 === matrix2.length,
                'matrix2 has length 4'
        );
        ok(
                matrix2[0] === 1 && matrix2[1] === 0 
				&& matrix2[2] === 0 && matrix2[3] === 1,
                'matrix2 elements are [1, 0, 0, 1]'
        );
    });

    test( 'Default Matrix [0, 0, 0, 0]', function() {
        expect( 1 );

        deepEqual(
                new math.Matrix2(),
                new math.Matrix2( [0, 0, 0, 0] ),
                'Default matrix2 is the zero matrix [0, 0, 0, 0]'
        );
    });

    test( 'Matrix Constants', function() {
        expect( 1 );

        deepEqual(
                math.matrix2.identity,
                new math.Matrix2( [1, 0, 0, 1] ),
                'Matrix 2 identity - [1,0,0,1]'
        );
        // deepEqual(
                // math.vector2.y,
                // new math.Vector2( 0.0, 1.0 ),
                // 'Vector2.y'
        // );
        // deepEqual(
                // math.vector2.zero,
                // new math.Vector2( 0.0, 0.0 ),
                // 'Vector2.zero'
        // );
        // deepEqual(
                // math.vector2.one,
                // new math.Vector2( 1.0, 1.0 ),
                // 'Vector2.one'
        // );
    });

    // test( 'Clone', function() {
        // expect( 1 );

        // var vec1 = new math.Vector2( 0, 1 );
        // deepEqual(
                // new math.Vector2( vec1 ),
                // vec1,
                // 'Clone of vector is the same'
        // );
    // });

    test( 'Equality of 2 x 2 Matricies', function() {
        expect( 2 );

        var m1 = new math.Matrix2( [1, 1, 1, 1] );
        var m2 = new math.Matrix2( [1, 1, 1, 1] );
        var m3 = new math.Matrix2( [2, 3, 3, 2] );

        ok(
                math.matrix2.equal( m1, m2 ),
                'Two identical matricies are equal'
        );
        ok(
                !math.matrix2.equal( m1, m3 ),
                'Two different matricies are not equal'
        );
    });

    // test( 'Length', function() {
        // expect( 1 );

        // var vec1 = new math.Vector2( 1, 1 );
        // ok(
                // Math.sqrt( 2 ) === math.vector2.length( vec1 ),
                // '|(1, 1)| = sqrt(2)'
        // );
    // });

    // test( 'Addition', function() {
        // expect( 2 );

        // var vec1 = new math.Vector2( 1, 1 );
        // var vec2 = new math.Vector2( 1, 1 );
        // var vec3 = new math.Vector2( 2, 2 );

        // ok(
                // math.vector2.equal( vec3, math.vector2.add( vec1, vec2 ) ),
                // '(1,1) + (1,1) = (2,2)'
        // );

        // math.vector2.iadd( vec1, vec2 );
        // ok(
                // math.vector2.equal( vec1, vec3 ),
                // '(1, 1) += (1, 1)'
        // );
    // });

    // test( 'Subtraction', function() {
        // expect( 2 );

        // var vec1 = new math.Vector2( 1, 1 );
        // var vec2 = new math.Vector2( 1, 1 );
        // var vec3 = new math.Vector2( 2, 2 );
        // ok(
                // math.vector2.equal( vec1, math.vector2.subtract( vec3, vec2 ) ),
                // '(2, 2) - (1, 1) = (1, 1)'
        // );

        // math.vector2.isubtract( vec3, vec2 );
        // ok(
                // math.vector2.equal( vec1, vec3 ),
                // '(2, 2) -= (1, 1)'
        // );
    // });

    // test( 'Scalar multiplication', function() {
        // expect( 2 );

        // var vec1 = new math.Vector2( 2, 3 );
        // deepEqual(
                // math.vector2.multiply( vec1, 2 ),
                // new math.Vector2( 4, 6 ),
                // '(2, 3) * 2 = (4, 6)'
        // );

        // math.vector2.imultiply( vec1, 3 );
        // deepEqual(
                // vec1,
                // new math.Vector2( 6, 9 ),
                // '(2, 3) *= 3'
        // );
    // });

}());
