/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var matrix = require( './matrix' )( FLOAT_ARRAY_TYPE );

        var Matrix4 = function() {
            if( 0 === arguments.length ) {
                return matrix.$( 16, [0, 0, 0, 0,
                                      0, 0, 0, 0,
                                      0, 0, 0, 0,
                                      0, 0, 0, 0] );
            } else {
                return matrix.$( 16, arguments );
            }
        };

        var matrix4 = {
                
            $: Matrix4,

            add: function( ml, result ) {
                result = result || Matrix4();
                
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
                result = result || Matrix4();
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

            multiply: function( ml, result ) {
                result = result || Matrix4();
                
                if (ml.length == 1)
                    return ml[0];
                else {

                    var temp = ml[0];
                    for (var i = 1; i < ml.length; ++ i) {

                        result[0] = temp[0]*ml[i][0] + temp[1]*ml[i][4] + temp[2]*ml[i][8] + temp[3]*ml[i][12];
                        result[1] = temp[0]*ml[i][1] + temp[1]*ml[i][5] + temp[2]*ml[i][9] + temp[3]*ml[i][13];
                        result[2] = temp[0]*ml[i][2] + temp[1]*ml[i][6] + temp[2]*ml[i][10] + temp[3]*ml[i][14];
                        result[3] = temp[0]*ml[i][3] + temp[1]*ml[i][7] + temp[2]*ml[i][11] + temp[3]*ml[i][15];            
                        result[4] = temp[4]*ml[i][0] + temp[5]*ml[i][4] + temp[6]*ml[i][8] + temp[7]*ml[i][12];
                        result[5] = temp[4]*ml[i][1] + temp[5]*ml[i][5] + temp[6]*ml[i][9] + temp[7]*ml[i][13];
                        result[6] = temp[4]*ml[i][2] + temp[5]*ml[i][6] + temp[6]*ml[i][10] + temp[7]*ml[i][14];
                        result[7] = temp[4]*ml[i][3] + temp[5]*ml[i][7] + temp[6]*ml[i][11] + temp[7]*ml[i][15];
                        result[8] = temp[8]*ml[i][0] + temp[9]*ml[i][4] + temp[10]*ml[i][8] + temp[11]*ml[i][12];
                        result[9] = temp[8]*ml[i][1] + temp[9]*ml[i][5] + temp[10]*ml[i][9] + temp[11]*ml[i][13];
                        result[10] = temp[8]*ml[i][2] + temp[9]*ml[i][6] + temp[10]*ml[i][10] + temp[11]*ml[i][14];
                        result[11] = temp[8]*ml[i][3] + temp[9]*ml[i][7] + temp[10]*ml[i][11] + temp[11]*ml[i][15];
                        result[12] = temp[12]*ml[i][0] + temp[13]*ml[i][4] + temp[14]*ml[i][8] + temp[15]*ml[i][12];
                        result[13] = temp[12]*ml[i][1] + temp[13]*ml[i][5] + temp[14]*ml[i][9] + temp[15]*ml[i][13];
                        result[14] = temp[12]*ml[i][2] + temp[13]*ml[i][6] + temp[14]*ml[i][10] + temp[15]*ml[i][14];
                        result[15] = temp[12]*ml[i][3] + temp[13]*ml[i][7] + temp[14]*ml[i][11] + temp[15]*ml[i][15];                        
                        
                        temp = result;
                    }
                }
                return result;
            },

            determinant: function (m) {
                var a0 = m[0] * m[5] - m[1] * m[4];
                var a1 = m[0] * m[6] - m[2] * m[4];
                var a2 = m[0] * m[7] - m[3] * m[4];
                var a3 = m[1] * m[6] - m[2] * m[5];
                var a4 = m[1] * m[7] - m[3] * m[5];
                var a5 = m[2] * m[7] - m[3] * m[6];
                var b0 = m[8] * m[13] - m[9] * m[12];
                var b1 = m[8] * m[14] - m[10] * m[12];
                var b2 = m[8] * m[15] - m[11] * m[12];
                var b3 = m[9] * m[14] - m[10] * m[13];
                var b4 = m[9] * m[15] - m[11] * m[13];
                var b5 = m[10] * m[15] - m[11] * m[14];

                var det = a0 * b5 - a1 * b4 + a2 * b3 + a3 * b2 - a4 * b1 + a5 * b0;

                return det;
            },

            transpose: function (m , result) {
                result = result || Matrix4();
                
                result[0] = m[0], 
                result[1] = m[4];
                result[2] = m[8];
                result[3] = m[12];
                result[4] = m[1];
                result[5] = m[5]; 
                result[6] = m[9]; 
                result[7] = m[13]; 
                result[8] = m[2];
                result[9] = m[6]; 
                result[10] = m[10]; 
                result[11] = m[14]; 
                result[12] = m[3];
                result[13] = m[7]; 
                result[14] = m[11]; 
                result[15] = m[15];
                
                return result;
            },

            inverse: function (m, result) {
                
                result = result || Matrix4();
                
                var a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3],
                    a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7],
                    a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11],
                    a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15],

                    b00 = a00 * a11 - a01 * a10,
                    b01 = a00 * a12 - a02 * a10,
                    b02 = a00 * a13 - a03 * a10,
                    b03 = a01 * a12 - a02 * a11,
                    b04 = a01 * a13 - a03 * a11,
                    b05 = a02 * a13 - a03 * a12,
                    b06 = a20 * a31 - a21 * a30,
                    b07 = a20 * a32 - a22 * a30,
                    b08 = a20 * a33 - a23 * a30,
                    b09 = a21 * a32 - a22 * a31,
                    b10 = a21 * a33 - a23 * a31,
                    b11 = a22 * a33 - a23 * a32,

                    d = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06),
                    invDet;

                // Determinant, throw exception if singular
                if (!d)
                    throw 'matrix is singular';
                
                invDet = 1 / d;
                result[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
                result[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
                result[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
                result[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
                result[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
                result[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
                result[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
                result[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
                result[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
                result[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
                result[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
                result[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
                result[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
                result[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
                result[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
                result[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
                
                return result;
            },

            toHTML: function( m ) {
                var result = "[ ";
                for( var i = 0; i < 4; ++ i ) {
                    result += "<br>";
                    for( var j = 0; j < 4; ++ j ) {
                        result += " (" + m[4*i+j] + ") ";
                    }
                }
                result += " ]";
                return result;
            }

        };
        Object.defineProperty( matrix4, 'zero', {
            get: function() {
                return Matrix4( [0, 0, 0, 0,
                                 0, 0, 0, 0,
                                 0, 0, 0, 0,
                                 0, 0, 0, 0] );
            },
            enumerable: true
        });
        
        Object.defineProperty( matrix4, 'one', {
            get: function() {
                return Matrix4( [1, 1, 1, 1,
                                 1, 1, 1, 1,
                                 1, 1, 1, 1,
                                 1, 1, 1, 1] );
            },
            enumerable: true
        });
        
        Object.defineProperty( matrix4, 'identity', {
            get: function() {
                return Matrix4( [1, 0, 0, 0,
                                 0, 1, 0, 0,
                                 0, 0, 1, 0,
                                 0, 0, 0, 1] ); 
            },
            enumerable: true
        });

        return matrix4;

    };

});
