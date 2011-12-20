/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var matrix = require( './matrix' )( FLOAT_ARRAY_TYPE );

        var Matrix3 = function() {
            if( 0 === arguments.length ) {
                return matrix.$( 9, [0, 0, 0,
                                     0, 0, 0,
                                     0, 0, 0] );
            } else {
                return matrix.$( 9, arguments );
            }
        };

        var matrix3 = {
                
            $: Matrix3,

            add: function( ml, result ) {
                result = result || Matrix3();
                
                if (ml.length == 1) {
                    return ml[0];
                } else {
                    var temp = ml[0];
                    for (var i = 1; i < ml.length; ++ i) {
                        result = matrix.add(temp, ml[i], result);
                        temp = result;
                    }
                }
                return result;
            },

            subtract: function( ml, result ) {
                result = result || Matrix3();
                var temp = ml[0];
                
                if (ml.length == 1)
                    result = temp;
                else {
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

                return m[0]*(m[4]*m[8] - m[5]*m[7]) 
                       - m[1]*(m[3]*m[8] - m[5]*m[6]) 
                       + m[2]*(m[3]*m[7] - m[4]*m[6]);
            },
            
            inverse: function( m, result ) {
                var det = matrix3.determinant(m);
                if (det == 0)
                    throw 'matrix is singular';
                
                result = result || Matrix3();
                
                result[0] = (m[8]*m[4] - m[7]*m[5])/det;
                result[1] = -(m[8]*m[1] - m[7]*[2])/det;
                result[2] = (m[5]*m[1] - m[4]*m[2])/det;
                
                result[3] = -(m[8]*m[3] - m[6]*m[5])/det;
                result[4] = (m[8]*m[0] - m[6]*m[2])/det;
                result[5] = -(m[5]*m[0] - m[3]*m[2])/det;
                
                result[6] = (m[7]*m[3] - m[6]*m[4])/det;
                result[7] = -(m[7]*m[0] - m[6]*m[1])/det;
                result[8] = (m[4]*m[0] - m[3]*m[1])/det;

                return result;
            },
            
            multiply: function( ml, result ) {
                result = result || Matrix3();
                
                if (ml.length == 1)
                    return ml[0];
                else {

                    var temp = ml[0];
                    for (var i = 1; i < ml.length; ++ i) {

                        result[0] = temp[0]*ml[i][0] + temp[1]*ml[i][3] + temp[2]*ml[i][6];
                        result[1] = temp[0]*ml[i][1] + temp[1]*ml[i][4] + temp[2]*ml[i][7];
                        result[2] = temp[0]*ml[i][2] + temp[1]*ml[i][5] + temp[2]*ml[i][8];

                        result[3] = temp[3]*ml[i][0] + temp[4]*ml[i][3] + temp[5]*ml[i][6];
                        result[4] = temp[3]*ml[i][1] + temp[4]*ml[i][4] + temp[5]*ml[i][7];
                        result[5] = temp[3]*ml[i][2] + temp[4]*ml[i][5] + temp[5]*ml[i][8];

                        result[6] = temp[6]*ml[i][0] + temp[7]*ml[i][3] + temp[8]*ml[i][6];
                        result[7] = temp[6]*ml[i][1] + temp[7]*ml[i][4] + temp[8]*ml[i][7];
                        result[8] = temp[6]*ml[i][2] + temp[7]*ml[i][5] + temp[8]*ml[i][8];
                        
                        temp = result;
                    }
                }
                return result;
            },

            transpose: function( m, result ) {
                result = result || Matrix3();

                var a01 = m[1], a02 = m[2], a12 = m[5];
                
                result[0] = m[0];
                result[1] = m[3];
                result[2] = m[6];
                result[3] = a01;
                result[4] = m[4];
                result[5] = m[7];
                result[6] = a02;
                result[7] = a12;
                result[8] = m[8];

                return result;
            }

        };
        
        Object.defineProperty( matrix3, 'zero', {
            get: function() {
                return Matrix3( [0, 0, 0,
                                 0, 0, 0,
                                 0, 0, 0] );
            },
            enumerable: true
        });
        
        Object.defineProperty( matrix3, 'one', {
            get: function() {
                return Matrix3( [1, 1, 1,
                                 1, 1, 1,
                                 1, 1, 1] );
            },
            enumerable: true
        });
        
        Object.defineProperty( matrix3, 'identity', {
            get: function() {
                return Matrix3( [1, 0, 0,
                                 0, 1, 0,
                                 0, 0, 1] );
            },
            enumerable: true
        });

        return matrix3;

    };

});