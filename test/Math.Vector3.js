/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global gladius: false, document: false, window: false, module: false, start,
  test: false, expect: false, ok: false, notEqual: false, stop, QUnit: false */

(function() {

    var math = null;

    // Name of our module
    module( 'Vector3 Tests', {
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
        expect( 6 );

        var vec2 = new math.Vector2( [1, 2] );
        ok(
                vec2,
                'Construct a Vector2 instance'
        );
        ok(
                vec2 instanceof math.ARRAY_TYPE,
                'vec2 is an instance of ARRAY_TYPE'
        );
        deepEqual(
                new math.ARRAY_TYPE( [1, 2] ),
                new math.Vector2( [1, 2] )
        );
        ok(
                2 === vec2.length,
                'vec2 has length 2'
        );
        ok(
                vec2[0] === 1 && vec2[1] === 2,
                'vec2 elements are [1, 2]'
        );
        
        // Test vector clear
        var vec1 = new math.Vector2( [17 , 22] );
        var vec3 = new math.Vector2( [0, 0] );
        math.vector2.clear(vec1);
        ok(
                math.vector2.equal( vec1, vec3 ),
                vec1[0] + ' vector.clear, set to 0,0|' + vec1[1]
        );
        
    });

    test( 'Defaults', function() {
        expect( 1 );

        deepEqual(
                new math.Vector2(),
                new math.Vector2( [0, 0] ),
                'Default vector is the zero vector'
        );
    });

    test( 'Constants', function() {
        expect( 4 );

        deepEqual(
                math.vector2.x,
                new math.Vector2( 1.0, 0.0 ),
                'Vector2.x'
        );
        deepEqual(
                math.vector2.y,
                new math.Vector2( 0.0, 1.0 ),
                'Vector2.y'
        );
        deepEqual(
                math.vector2.zero,
                new math.Vector2( 0.0, 0.0 ),
                'Vector2.zero'
        );
        deepEqual(
                math.vector2.one,
                new math.Vector2( 1.0, 1.0 ),
                'Vector2.one'
        );
    });

    test( 'Clone', function() {
        expect( 1 );

        var vec1 = new math.Vector2( 0, 1 );
        deepEqual(
                new math.Vector2( vec1 ),
                vec1,
                'Clone of vector is the same'
        );
    });

    test( 'Equality', function() {
        expect( 2 );

        var vec1 = new math.Vector2( 1, 1 );
        var vec2 = new math.Vector2( 1, 1 );
        var vec3 = new math.Vector2( 2, 3 );

        ok(
                math.vector2.equal( vec1, vec2 ),
                'Two identical vectors are equal'
        );
        ok(
                !math.vector2.equal( vec1, vec3 ),
                'Two different vectors are not equal'
        );
    });

    test( 'Length', function() {
        expect( 1 );

        var vec1 = new math.Vector2( 1, 1 );
        ok(
                Math.sqrt( 2 ) === math.vector2.length( vec1 ),
                '|(1, 1)| = sqrt(2)'
        );
    });

    test( 'Addition', function() {
        expect( 2 );

        var vec1 = new math.Vector2( [1, 1] );
        var vec2 = new math.Vector2( [1, 1] );
        var vec3 = new math.Vector2( [2, 2] );

        ok(
                math.vector2.equal( vec3, math.vector2.add( vec1, vec2 ) ),
                '(1,1) + (1,1) = (2,2)'
        );

        var test = math.vector2.add( vec1, vec2 );
        ok(
                math.vector2.equal( test, vec3 ),
                '(1, 1) += (2, 2)'
        );
    });

    test( 'Subtraction', function() {
        expect( 2 );

        var vec1 = new math.Vector2( [1, 1] );
        var vec2 = new math.Vector2( [1, 1] );
        var vec3 = new math.Vector2( [2, 2] );
        ok(
                math.vector2.equal( vec1, math.vector2.subtract( vec3, vec2 ) ),
                '(2, 2) - (1, 1) = (1, 1)'
        );

        var test = math.vector2.subtract( vec3, vec2 );
        ok(
                math.vector2.equal( vec1, test ),
                '(2, 2) -= (1, 1)'
        );
    });

    test( 'Scalar multiplication', function() {
        expect( 2 );

        var vec1 = new math.Vector2( [2, 3] );
        deepEqual(
                math.vector2.multiply( vec1, 2 ),
                new math.Vector2( [4, 6] ),
                '(2, 3) * 2 = (4, 6)'
        );

        var test = math.vector2.multiply( vec1, 3 );
        deepEqual(
                test,
                new math.Vector2( [6, 9] ),
                '(2, 3) *= 3'
        );
    });
    
    test( 'Dot Product / Normalize', function() {
        expect( 2 );

        var vec1 = new math.Vector2( [12, -5] );
        deepEqual(
                math.vector2.normalize( vec1 ),
                new math.Vector2( [(12/13), (-5/13)] ),
                'normalize( [12, -5] ) = [ (12/13), (-5/13) ]'
        );

        var vec2 = new math.Vector2( [10, 4] );
        var cond = math.vector2.dot( math.vector2.normalize( vec1 ), vec2 );
        deepEqual(
                Math.round ( cond * Math.pow(10,6) ),
                Math.round ( (100/13) * Math.pow(10,6) ), // Correct to 6 digits
                ' [ (12/13), (-5/13) ] . [ 10, 4 ] = (100/13) '
        );
    });
    
    test( 'Angle()', function() {
        expect( 1 );

        var vec1 = new math.Vector2( [10, 8] );
        var vec2 = new math.Vector2( [6, 6] );
        
        var cond = math.vector2.angle( vec1, vec2 );
        var res = Math.acos(9/(Math.sqrt(82)));
        deepEqual(
                Math.round ( cond * Math.pow(10,6) ),
                Math.round ( res * Math.pow(10,6) ), // Correct to 6 digits
                ' angle( vec1, vec2 ) = acos(9/(Math.sqrt(82)))'
        );
    });

}());
