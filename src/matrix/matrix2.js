/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var matrix = require( './matrix' )( FLOAT_ARRAY_TYPE );

        var Matrix2 = function() {
            if( 0 === arguments.length ) {
                return matrix.$( 4, [0, 0,
                                     0, 0] );
            } else {
                return matrix.$( 4, arguments );
            }
        };

        var matrix2 = {

            $: Matrix2,

            add: function( ml, result ) {
                result = result || Matrix2();
                var temp = ml[0];
                
                if (ml.length == 1)
                    result = temp;
                else {
                    for (var i = 1; i < ml.length; ++ i) {
                        result = matrix.add(temp, ml[i], result);
                        temp = result;
                    }
                }
                return result;
            },

            subtract: function( ml, result ) {
                result = result || Matrix2();
                var temp = ml[0];
                
                if (ml.length == 1) {
                    result = temp;
                } else {
                    var temp = ml[0];
                    for (var i = 1; i < ml.length; ++ i) {
                        result = matrix.subtract(temp, ml[i], result);
                        temp = result;
                    }
                }
                return result;
            },

            clear: matrix.clear,

            equal: matrix.equal,

            determinant: function( m ) {
                return m[0]*m[3] - m[1]*m[2];
            },
            
            inverse: function( m, result ) {
            
                var det = matrix2.determinant(m);
                if (det == 0)
                    throw 'matrix is singular';
                
                result = result || Matrix2();
                
                result[0] = m[3]/det;
                result[1] = m[1]*-1/det;
                result[2] = m[2]*-1/det;
                result[3] = m[0]/det;
                
                return result;
            },
            
            multiply: function( ml, result ) {
                result = result || Matrix2();
                
                if (ml.length == 1)
                    return ml[0];
                else {

                    var temp = ml[0];
                    for (var i = 1; i < ml.length; ++ i) {
                        result[0] = temp[0]*ml[i][0] + temp[1]*ml[i][2];
                        result[1] = temp[0]*ml[i][1] + temp[1]*ml[i][3];
                        result[2] = temp[2]*ml[i][0] + temp[3]*ml[i][2];
                        result[3] = temp[2]*ml[i][1] + temp[3]*ml[i][3];
                        temp = result;
                    }
                }
                return result;
            },
            
            transpose: function( m, result ) {
                result = result || Matrix2();
                
                var temp = m[1];
                result[0] = m[0];
                result[1] = m[2];
                result[2] = temp;
                result[3] = m[3];
                
                return result;
            }
        }

        Object.defineProperty( matrix2, 'zero', {
            get: function() {
                return Matrix2( [0, 0,
                                 0, 0] );
            },
            enumerable: true
        });
        
        Object.defineProperty( matrix2, 'one', {
            get: function() {
                return Matrix2( [1, 1,
                                 1, 1] );
            },
            enumerable: true
        });
        
        Object.defineProperty( matrix2, 'identity', {
            get: function() {
                return Matrix2( [1, 0,
                                 0, 1] );
            },
            enumerable: true
        });

        return matrix2;

    };

});