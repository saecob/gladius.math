/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global gladius: false, document: false, window: false, module: false, start,
  test: false, expect: false, ok: false, notEqual: false, stop, QUnit: false */

(function() {

    var math = null;

    // Name of our module
    module( 'Vector4 Tests', {
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

        var vec4 = new math.Vector4( [1, 2, 3, 4] );
        ok(
                vec4,
                'Construct a Vector4 instance'
        );
        ok(
                vec4 instanceof math.ARRAY_TYPE,
                'vec3 is an instance of ARRAY_TYPE'
        );
        deepEqual(
                new math.ARRAY_TYPE( [1, 2, 3, 4] ),
                new math.Vector4( [1, 2, 3, 4] )
        );
        ok(
                4 === vec4.length,
                'vec4 has length 4'
        );
        ok(
                vec4[0] === 1 && vec4[1] === 2 && vec4[2] === 3 && vec4[3] === 4,
                'vec4 elements are [1, 2, 3, 4]'
        );
        
        // Test vector clear
        var vec1 = new math.Vector4( [17 , 22, 14, 2] );
        var vec3 = new math.Vector4( [0, 0, 0, 0] );
        math.vector4.clear(vec1);
        ok(
                math.vector4.equal( vec1, vec3 ),
                'vector.clear, set to [0,0,0, 0]'
        );
        
    });

    test( 'Defaults', function() {
        expect( 1 );

        deepEqual(
                new math.Vector4(),
                new math.Vector4( [0, 0, 0, 0] ),
                'Default vector is the zero vector'
        );
    });

    // test( 'Constants', function() {
        // expect( 4 );

        // deepEqual(
                // math.vector4.x,
                // new math.Vector4( [1.0, 0.0, 0.0] ),
                // 'Vector4.x'
        // );
        // deepEqual(
                // math.vector4.y,
                // new math.Vector4( [0.0, 1.0, 0.0] ),
                // 'Vector4.y'
        // );
        // deepEqual(
                // math.vector4.zero,
                // new math.Vector4( [0.0, 0.0, 0.0] ),
                // 'Vector4.zero'
        // );
        // deepEqual(
                // math.vector4.one,
                // new math.Vector4( [1.0, 1.0, 1.0] ),
                // 'Vector4.one'
        // );
    // });

    test( 'Clone', function() {
        expect( 1 );

        var vec1 = new math.Vector4( [0, 1, 3, 4] );
        deepEqual(
                new math.Vector4( vec1 ),
                vec1,
                'Clone of vector is the same'
        );
    });

    test( 'Equality', function() {
        expect( 2 );

        var vec1 = new math.Vector4( [1, 1, 1, 1] );
        var vec2 = new math.Vector4( [1, 1, 1, 1] );
        var vec3 = new math.Vector4( [2, 3, 4, 5] );

        ok(
                math.vector4.equal( vec1, vec2 ),
                'Two identical vectors are equal'
        );
        ok(
                !math.vector4.equal( vec1, vec3 ),
                'Two different vectors are not equal'
        );
    });

    test( 'Length', function() {
        expect( 1 );

        var vec1 = new math.Vector4( [1, 1, 1, 1] );
        ok(
                Math.sqrt( 4 ) === math.vector4.length( vec1 ),
                '|(1, 1, 1, 1)| = sqrt(4)'
        );
    });

    test( 'Addition', function() {
        expect( 2 );

        var vec1 = new math.Vector4( [1, 1, 1, 1] );
        var vec2 = new math.Vector4( [1, 1, 1, 1] );
        var vec3 = new math.Vector4( [2, 2, 2, 2] );

        ok(
                math.vector4.equal( vec3, math.vector4.add( vec1, vec2 ) ),
                '(1, 1, 1, 1) + (1, 1, 1, 1) = (2, 2, 2, 2)'
        );

        var test = math.vector4.add( vec1, vec2 );
        ok(
                math.vector4.equal( test, vec3 ),
                '(1, 1, 1, 1) += (2, 2, 2, 2)'
        );
    });

    test( 'Subtraction', function() {
        expect( 2 );

        var vec1 = new math.Vector4( [1, 1, 1, 1] );
        var vec2 = new math.Vector4( [1, 1, 1, 1] );
        var vec3 = new math.Vector4( [2, 2, 2, 2] );
        ok(
                math.vector4.equal( vec1, math.vector4.subtract( vec3, vec2 ) ),
                '(2, 2, 2, 2) - (1, 1, 1, 1) = (1, 1, 1, 1)'
        );

        var test = math.vector4.subtract( vec3, vec2 );
        ok(
                math.vector4.equal( vec1, test ),
                '(2, 2, 2, 2) -= (1, 1, 1, 1)'
        );
    });

    test( 'Scalar multiplication', function() {
        expect( 2 );

        var vec1 = new math.Vector4( [2, 3, 4, 5] );
        deepEqual(
                math.vector4.multiply( vec1, 2 ),
                new math.Vector4( [4, 6, 8, 10] ),
                '(2, 3, 4, 5) * 2 = (4, 6, 8, 10)'
        );

        var test = math.vector4.multiply( vec1, 3 );
        deepEqual(
                test,
                new math.Vector4( [6, 9, 12, 15] ),
                '(2, 3, 4, 5) * 3 = [6, 9, 12, 15]'
        );
    });
    
    // test( 'Cross Product', function() {
        // expect (1);
        
        // var vec1 = new math.Vector4( [3, -3, 1] );
        // var vec2 = new math.Vector4( [-12, 12, -4] );
        // deepEqual(
                // math.vector4.cross( vec1, vec2 ),
                // new math.Vector4( [0, 0, 0] ),
                // '[3, -3, 1] X [-12, 12, -4] = [0, 0, 0]'
        // );
    // });
    
    // test( 'Dot Product / Normalize', function() {
        // expect( 2 );

        // var vec1 = new math.Vector4( [12, -5, 7] );
        // var den = Math.sqrt(173);
        // deepEqual(
                // math.vector4.normalize( vec1 ),
                // new math.Vector4( [(12/den), (-5/den), (2/den)] ),
                // 'normalize( [12, -5], 7 ) = [(12/den), (-5/den), (2/den)]'
        // );

        // var vec2 = new math.Vector4( [10, 4] );
        // var cond = math.vector4.dot( math.vector4.normalize( vec1 ), vec2 );
        // deepEqual(
                // Math.round ( cond * Math.pow(10,6) ),
                // Math.round ( (100/13) * Math.pow(10,6) ), // Correct to 6 digits
                // ' [ (12/13), (-5/13) ] . [ 10, 4 ] = (100/13) '
        // );
    // });
    
    // test( 'Angle()', function() {
        // expect( 1 );

        // var vec1 = new math.Vector4( [10, 8] );
        // var vec2 = new math.Vector4( [6, 6] );
        
        // var cond = math.vector4.angle( vec1, vec2 );
        // var res = Math.acos(9/(Math.sqrt(82)));
        // deepEqual(
                // Math.round ( cond * Math.pow(10,6) ),
                // Math.round ( res * Math.pow(10,6) ), // Correct to 6 digits
                // ' angle( vec1, vec2 ) = acos(9/(Math.sqrt(82)))'
        // );
    // });

}());
