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

        var vec3 = new math.Vector3( [1, 2, 3] );
        ok(
                vec3,
                'Construct a Vector3 instance'
        );
        ok(
                vec3 instanceof math.ARRAY_TYPE,
                'vec3 is an instance of ARRAY_TYPE'
        );
        deepEqual(
                new math.ARRAY_TYPE( [1, 2, 3] ),
                new math.Vector3( [1, 2, 3] )
        );
        ok(
                3 === vec3.length,
                'vec3 has length 3'
        );
        ok(
                vec3[0] === 1 && vec3[1] === 2 && vec3[2] === 3,
                'vec3 elements are [1, 2, 3]'
        );
        
        // Test vector clear
        var vec1 = new math.Vector3( [17 , 22, 14] );
        var vec4 = new math.Vector3( [0, 0, 0] );
        math.vector3.clear(vec1);
        ok(
                math.vector3.equal( vec1, vec4 ),
                'vector.clear, set to [0,0,0]'
        );
        
    });

    test( 'Defaults', function() {
        expect( 1 );

        deepEqual(
                new math.Vector3(),
                new math.Vector3( [0, 0, 0] ),
                'Default vector is the zero vector'
        );
    });

    // test( 'Constants', function() {
        // expect( 4 );

        // deepEqual(
                // math.vector3.x,
                // new math.Vector3( [1.0, 0.0, 0.0] ),
                // 'Vector3.x'
        // );
        // deepEqual(
                // math.vector3.y,
                // new math.Vector3( [0.0, 1.0, 0.0] ),
                // 'Vector3.y'
        // );
        // deepEqual(
                // math.vector3.zero,
                // new math.Vector3( [0.0, 0.0, 0.0] ),
                // 'Vector3.zero'
        // );
        // deepEqual(
                // math.vector3.one,
                // new math.Vector3( [1.0, 1.0, 1.0] ),
                // 'Vector3.one'
        // );
    // });

    test( 'Clone', function() {
        expect( 1 );

        var vec1 = new math.Vector3( [0, 1, 3] );
        deepEqual(
                new math.Vector3( vec1 ),
                vec1,
                'Clone of vector is the same'
        );
    });

    test( 'Equality', function() {
        expect( 2 );

        var vec1 = new math.Vector3( [1, 1, 1] );
        var vec2 = new math.Vector3( [1, 1, 1] );
        var vec3 = new math.Vector3( [2, 3, 4] );

        ok(
                math.vector3.equal( vec1, vec2 ),
                'Two identical vectors are equal'
        );
        ok(
                !math.vector3.equal( vec1, vec3 ),
                'Two different vectors are not equal'
        );
    });

    test( 'Length', function() {
        expect( 1 );

        var vec1 = new math.Vector3( [1, 1, 1] );
        ok(
                Math.sqrt( 3 ) === math.vector3.length( vec1 ),
                '|(1, 1, 1)| = sqrt(3)'
        );
    });

    test( 'Addition', function() {
        expect( 2 );

        var vec1 = new math.Vector3( [1, 1, 1] );
        var vec2 = new math.Vector3( [1, 1, 1] );
        var vec3 = new math.Vector3( [2, 2, 2] );

        ok(
                math.vector3.equal( vec3, math.vector3.add( vec1, vec2 ) ),
                '(1, 1, 1) + (1, 1, 1) = (2, 2, 2)'
        );

        var test = math.vector3.add( vec1, vec2 );
        ok(
                math.vector3.equal( test, vec3 ),
                '(1, 1, 1) += (2, 2, 2)'
        );
    });

    test( 'Subtraction', function() {
        expect( 2 );

        var vec1 = new math.Vector3( [1, 1, 1] );
        var vec2 = new math.Vector3( [1, 1, 1] );
        var vec3 = new math.Vector3( [2, 2, 2] );
        ok(
                math.vector3.equal( vec1, math.vector3.subtract( vec3, vec2 ) ),
                '(2, 2, 2) - (1, 1, 1) = (1, 1, 1)'
        );

        var test = math.vector3.subtract( vec3, vec2 );
        ok(
                math.vector3.equal( vec1, test ),
                '(2, 2, 2) -= (1, 1, 1)'
        );
    });

    test( 'Scalar multiplication', function() {
        expect( 2 );

        var vec1 = new math.Vector3( [2, 3, 4] );
        deepEqual(
                math.vector3.multiply( vec1, 2 ),
                new math.Vector3( [4, 6, 8] ),
                '(2, 3, 4) * 2 = (4, 6, 8)'
        );

        var test = math.vector3.multiply( vec1, 3 );
        deepEqual(
                test,
                new math.Vector3( [6, 9, 12] ),
                '(2, 3, 4) * 3 = [6, 9, 12]'
        );
    });
    
    test( 'Cross Product', function() {
        expect (1);
        
        var vec1 = new math.Vector3( [3, -3, 2] ); // x,y,1
        var vec2 = new math.Vector3( [-12, 12, -4] );
        deepEqual(
                math.vector3.cross( vec1, vec2 ),
                new math.Vector3( [-12, -12, 0] ), // 0,0,0
                '[3, -3, 1] X [-12, 12, -4] = [0, 0, 0]'
        );
    });
    
    test( 'Dot Product / Normalize', function() {
        expect( 2 );

        var vec1 = new math.Vector3( [12, -5, 7] );
        var den = Math.sqrt(218);
        deepEqual(
                math.vector3.normalize( vec1 ),
                new math.Vector3( [(6*(Math.sqrt(2/109))), (-5/den), (7/den)] ),
                'normalize( [12, -5, 7] ) = [(6*(Math.sqrt(2/109))), (-5/den), (7/den)]'
        );

        var vec2 = new math.Vector3( [10, 4, 2] );
        var cond = math.vector3.dot( math.vector3.normalize( vec1 ), vec2 );
        deepEqual(
                Math.round ( cond * Math.pow(10,6) ),
                Math.round ( (57 * Math.sqrt(2/109)) * Math.pow(10,6) ), // Correct to 6 digits
                ' [(6*sqrt(2/109), -5/sqrt(218), 7/sqrt(218))] . [ 10, 4, 2 ] = (57 * Math.sqrt(2/109)) '
        );
    });
    
    test( 'Angle()', function() {
        expect( 1 );

        var vec1 = new math.Vector3( [10, 8, 2] );
        var vec2 = new math.Vector3( [6, 6, 1] );
        
        var cond = math.vector3.angle( vec1, vec2 );
        var res = Math.acos(55/(Math.sqrt(3066)));
        deepEqual(
                Math.round ( cond * Math.pow(10,6) ),
                Math.round ( res * Math.pow(10,6) ), // Correct to 6 digits
                ' angle( vec1, vec2 ) = acos(55/(Math.sqrt(3066)))'
        );
    });

}());
