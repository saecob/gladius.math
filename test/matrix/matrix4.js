/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global gladius: false, document: false, window: false, module: false, start,
  test: false, expect: false, ok: false, notEqual: false, stop, QUnit: false */

(function() {

    var math = null;
	
	// Name of our module
    module( 'Matrix4 Tests', {
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

    test( 'Create Matrix4 & Compare', function() {
        expect( 4 );

        var matrix4 = new math.Matrix4( [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] ); //Identity matrix
        ok(
                matrix4,
                'Construct a matrix4 instance'
        );
        ok(
                matrix4 instanceof math.ARRAY_TYPE,
                'matrix4 is an instance of ARRAY_TYPE'
        );
        deepEqual(
                new math.ARRAY_TYPE( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ] ),
                new math.Matrix4( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ] )
        );
        ok(
                16 === matrix4.length,
                'matrix4 has length 16'
        );
    });

    test( 'Default Matrix 4x4', function() {
        expect( 1 );

        deepEqual(
                new math.Matrix4(),
                new math.Matrix4( [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ),
                'Default matrix4 is the zero matrix'
        );
    });

    test( 'Matrix Constants', function() {
        expect( 3 );

        deepEqual(
                new math.Matrix4( [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] ),				
				math.matrix4.identity,
                'Matrix is identity matrix'
        );
        deepEqual(
                new math.Matrix4( [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] ),				
				math.matrix4.one,
                'Matrix is one matrix'
        );
        deepEqual(
                new math.Matrix4( [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ),				
				math.matrix4.zero,
                'Matrix is zero matrix'
        );
    });

    test( 'Clone Matrix', function() {
        expect( 1 );

        var m1 = new math.Matrix4( [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1] );
        deepEqual(
                new math.Matrix4( m1 ),
                m1,
                'Clone of Matrix3 is the same'
        );
    });

    test( 'Equality of 4 x 4 Matricies', function() {
        expect( 2 );

        var m1 = new math.Matrix4( [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] );
        var m2 = new math.Matrix4( [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] );
        var m3 = new math.Matrix4( [2, 3, 3, 2, 2, 3, 3, 2, 1, 3, 3, 2, 1, 2, 1, 3] );

        ok(
                math.matrix4.equal( m1, m2 ),
                'Two identical matricies are equal'
        );
        ok(
                !math.matrix4.equal( m1, m3 ),
                'Two different matricies are not equal'
        );
    });
    
    test( 'Add/Subtract', function() {
        expect( 2 );

        var m1 = math.Matrix4( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ] );
        var m2 = math.Matrix4( [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ] );
        var ml = [];
        
        ml.push(m1);
        ml.push(m2);
        
        ok(
            math.matrix4.equal( math.matrix4.add( ml ),
                [ 3, 5, 7, 9,
                 11, 13, 15, 17,
                 19, 21, 23, 25,
                 27, 29, 31, 33] ),
            'Addition is correct when returned'
        );
        
        ok(
            math.matrix4.equal( math.matrix4.subtract( ml ),
                [ -1, -1, -1, -1,
                  -1, -1, -1, -1,
                  -1, -1, -1, -1,
                  -1, -1, -1, -1] ),
            'Subtraction is correct when returned'
        );

    });
    
    test( 'Multiplication', function() {
        expect( 1 );

        var m1 = math.Matrix4( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ] );
        var m2 = math.Matrix4( [ 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ] );
        var ml = [];
        
        ml.push(m1);
        ml.push(m2);
        
        ok(
            math.matrix4.equal( math.matrix4.multiply( ml ),
                [ 100, 110, 120, 130,
                  228, 254, 280, 306,
                  356, 398, 440, 482,
                  484, 542, 600, 658 ] ),
            'Result is correct when returned'
        );

    });
    
    test( 'Determinant', function() {
        expect( 1 );

        var m1 = math.Matrix4( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ] );
        
        ok(
            math.matrix4.equal( math.matrix4.determinant( m1 ),
                0 ),
            'Determinant is correct when returned'
        );

    });
    
    test( 'Inverse', function() {
        expect( 1 );
  
        var m1 = math.Matrix4( [ 1, 0, 0, 1, 0, 2, 1, 0, 2, 0, 1, 1, 1, 1, 0, 1 ] );
        var test = math.matrix4.inverse( m1 );
        
        ok(
            math.matrix4.equal( test,
                [ -3,-1,1,2,-1,0,0,1,2,1,0,-2,4,1,-1,-2 ] ),
            'Expected: [ -3,-1,1,2,-1,0,0,1,2,1,0,-2,4,1,-1,-2 ] || Returned: Correct'
        );

    });
    
    test( 'Transpose', function() {
        expect( 1 );

        var m1 = math.Matrix4( [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ] );
        var test = math.matrix4.transpose( m1 );
        
        ok(
            math.matrix4.equal( test,
                [ 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16 ] ),
            'Expected: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16 ] || Returned: ' 
            + test[0] + ', ' + test[1]+ ', ' + test[2]+ ', ' + test[3]
        );

    });

}());
