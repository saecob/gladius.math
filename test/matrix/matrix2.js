/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global gladius: false, document: false, window: false, module: false, start,
  test: false, expect: false, ok: false, notEqual: false, stop, QUnit: false */

(function() {

    var math = null;
	
	// Name of our module
    module( 'Matrix2 Tests', {
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
                matrix2[0] === 1 && matrix2[1] === 0 && matrix2[2] === 0 && matrix2[3] === 1,
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
        expect( 3 );

        deepEqual(
                new math.Matrix2( [1, 0, 0, 1] ),				
				math.matrix2.identity,
                'Matrix is identity matrix'
        );
        deepEqual(
                new math.Matrix2( [1, 1, 1, 1] ),				
				math.matrix2.one,
                'Matrix is one matrix'
        );
        deepEqual(
                new math.Matrix2( [0, 0, 0, 0] ),				
				math.matrix2.zero,
                'Matrix is zero matrix'
        );
    });

    test( 'Clone Matrix', function() {
        expect( 1 );

        var m1 = new math.Matrix2( [1, 0, 0, 1] );
        deepEqual(
                new math.Matrix2( m1 ),
                m1,
                'Clone of Matrix2 is the same'
        );
    });

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
    
    test( 'Add/Subtract', function() {
        expect( 2 );

        var m1 = math.Matrix2( [ 1, 2, 3, 4 ] );
        var m2 = math.Matrix2( [ 2, 3, 4, 5 ] );
        var ml = [];
        
        ml.push(m1);
        ml.push(m2);
        
        ok(
            math.matrix2.equal( math.matrix2.add( ml ),
                [ 3, 5, 
                  7, 9] ),
            'Addition is correct when returned'
        );
        
        ok(
            math.matrix2.equal( math.matrix2.subtract( ml ),
                [ -1, -1, 
                  -1, -1] ),
            'Subtraction is correct when returned'
        );

    });
    
    test( 'Multiplication', function() {
        expect( 1 );

        var m1 = math.Matrix2( [ 1, 2, 3, 4 ] );
        var m2 = math.Matrix2( [ 2, 3, 4, 5 ] );
        var ml = [];
        
        ml.push(m1);
        ml.push(m2);
        
        ok(
            math.matrix2.equal( math.matrix2.multiply( ml ),
                [ 10, 13, 
                  22, 29] ),
            'Result is correct when returned'
        );

    });
    
    test( 'Determinant', function() {
        expect( 1 );

        var m1 = math.Matrix2( [ 1, 2, 3, 4 ] );
        
        ok(
            math.matrix2.equal( math.matrix2.determinant( m1 ),
                -2 ),
            'Determinant is correct when returned'
        );

    });
    
    test( 'Inverse', function() {
        expect( 1 );

        var m1 = math.Matrix2( [ 1, 2, 3, 4 ] );
        var test = math.matrix2.inverse( m1 );
        
        ok(
            math.matrix2.equal( test,
                [ -2, 1, 1.5, -0.5 ] ),
            'Expected: [ -2, 1, 1.5, -0.5] || Returned: ' + test[0] + ', ' + test[1]+ ', ' + test[2]+ ', ' + test[3]
        );

    });
    
    test( 'Transpose', function() {
        expect( 1 );

        var m1 = math.Matrix2( [ 7, 2, 1, 4 ] );
        var test = math.matrix2.transpose( m1 );
        
        ok(
            math.matrix2.equal( test,
                [ 7, 1, 2, 4 ] ),
            'Expected: [ 7, 1, 2, 4 ] || Returned: ' + test[0] + ', ' + test[1]+ ', ' + test[2]+ ', ' + test[3]
        );

    });
    
}());
