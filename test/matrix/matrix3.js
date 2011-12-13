/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global gladius: false, document: false, window: false, module: false, start,
  test: false, expect: false, ok: false, notEqual: false, stop, QUnit: false */

(function() {

    var math = null;
	
	// Name of our module
    module( 'Matrix3 Tests', {
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
    
    test( 'Create Matrix3 & Compare', function() {
        expect( 5 );

        var matrix3 = new math.Matrix3( [1, 0, 0, 0, 1, 0, 0, 0, 1] ); //Identity matrix
        ok(
                matrix3,
                'Construct a matrix3 instance'
        );
        ok(
                matrix3 instanceof math.ARRAY_TYPE,
                'matrix3 is an instance of ARRAY_TYPE'
        );
        deepEqual(
                new math.ARRAY_TYPE( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] ),
                new math.Matrix3( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] )
        );
        ok(
                9 === matrix3.length,
                'matrix3 has length 9'
        );
        ok(
                matrix3[0] === 1 && matrix3[1] === 0 && matrix3[2] === 0 
                && matrix3[3] === 0 && matrix3[4] === 1 && matrix3[5] === 0
                && matrix3[6] === 0 && matrix3[7] === 0 && matrix3[8] === 1,
                'matrix3 elements are [1, 0, 0, 0, 1, 0, 0, 0, 1]'
        );
    });

    test( 'Default Matrix 3x3', function() {
        expect( 1 );

        deepEqual(
                new math.Matrix3(),
                new math.Matrix3( [0, 0, 0, 0, 0, 0, 0, 0, 0] ),
                'Default matrix3 is the zero matrix [0, 0, 0, 0, 0, 0, 0, 0, 0]'
        );
    });

    test( 'Matrix Constants', function() {
        expect( 3 );

        deepEqual(
                new math.Matrix3( [1, 0, 0, 0, 1, 0, 0, 0, 1] ),				
				math.matrix3.identity,
                'Matrix is identity matrix'
        );
        deepEqual(
                new math.Matrix3( [1, 1, 1, 1, 1, 1, 1, 1, 1] ),				
				math.matrix3.one,
                'Matrix is one matrix'
        );
        deepEqual(
                new math.Matrix3( [0, 0, 0, 0, 0, 0, 0, 0, 0] ),				
				math.matrix3.zero,
                'Matrix is zero matrix'
        );
    });

    test( 'Clone Matrix', function() {
        expect( 1 );

        var m1 = new math.Matrix3( [1, 0, 0, 0, 1, 0, 0, 0, 1] );
        deepEqual(
                new math.Matrix3( m1 ),
                m1,
                'Clone of Matrix3 is the same'
        );
    });

    test( 'Equality of 3 x 3 Matricies', function() {
        expect( 2 );

        var m1 = new math.Matrix3( [1, 1, 1, 1, 1, 1, 1, 1, 1]);
        var m2 = new math.Matrix3( [1, 1, 1, 1, 1, 1, 1, 1, 1] );
        var m3 = new math.Matrix3( [2, 3, 3, 2, 2, 3, 3, 2, 1] );

        ok(
                math.matrix3.equal( m1, m2 ),
                'Two identical matricies are equal'
        );
        ok(
                !math.matrix3.equal( m1, m3 ),
                'Two different matricies are not equal'
        );
    });
    
    test( 'Add/Subtract', function() {
        expect( 2 );

        var m1 = math.Matrix3( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] );
        var m2 = math.Matrix3( [ 2, 3, 4, 5, 6, 7, 8, 9, 10 ] );
        var ml = [];
        
        ml.push(m1);
        ml.push(m2);
        
        ok(
            math.matrix3.equal( math.matrix3.add( ml ),
                [ 3, 5, 7,
                  9, 11, 13,
                  15, 17, 19 ] ),
            'Addition is correct when returned'
        );
        
        ok(
            math.matrix3.equal( math.matrix3.subtract( ml ),
                [ -1, -1, -1,
                  -1, -1, -1,
                  -1, -1, -1] ),
            'Subtraction is correct when returned'
        );

    });
    
    test( 'Multiplication', function() {
        expect( 1 );

        var m1 = math.Matrix3( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] );
        var m2 = math.Matrix3( [ 2, 3, 4, 5, 6, 7, 8, 9, 10 ] );
        var ml = [];
        
        ml.push(m1);
        ml.push(m2);
        
        ok(
            math.matrix3.equal( math.matrix3.multiply( ml ),
                [ 36, 42, 48,
                  81, 96, 111,
                  126, 150, 174] ),
            'Result is correct when returned'
        );

    });
    
    test( 'Determinant', function() {
        expect( 1 );

        var m1 = math.Matrix3( [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ] );
        
        ok(
            math.matrix3.equal( math.matrix3.determinant( m1 ),
                0 ),
            'Determinant is correct when returned'
        );

    });
    
    test( 'Inverse', function() {
        expect( 1 );
  
        var m1 = math.Matrix3( [ 0, 0, 1, 0, 1, 0, 1, 0, 0 ] );
        var test = math.matrix3.inverse( m1 );
        
        ok(
            math.matrix3.equal( test,
                [ 0,0,1,0,1,0,1,0,0 ] ),
            'Expected: [ 0,0,1,0,1,0,1,0,0 ] || Returned: ' 
            + test[0] + ', ' + test[1]+ ', ' + test[2]+ ', ' + test[3] + ', '
            + test[4] + ', ' + test[5]+ ', ' + test[6]+ ', ' + test[7] + ', ' +test[8]
        );

    });
    
    test( 'Transpose', function() {
        expect( 1 );

        var m1 = math.Matrix3( [ 7, 2, 3, 1, 7, 4, 9, 8, 2 ] );
        var test = math.matrix3.transpose( m1 );
        
        ok(
            math.matrix3.equal( test,
                [ 7, 1, 9, 2, 7, 8, 3, 4, 2 ] ),
            'Expected: [ 7, 1, 9, 2, 7, 8, 3, 4, 2 ] || Returned: ' + test[0] + ', ' + test[1]+ ', ' + test[2]+ ', ' + test[3]
        );

    });

}());
