/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var matrix = require( './matrix' )( FLOAT_ARRAY_TYPE );
        var matrix3 = require( './matrix3' )( FLOAT_ARRAY_TYPE );

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

                add: function( m1, m2 ) {
//                  Test
                    return [ m1[0] + m2[0], m1[1] + m2[1], m1[2] + m2[2], m1[3] + m2[3],
                             m1[4] + m2[4], m1[5] + m2[5], m1[6] + m2[6], m1[7] + m2[7], 
                             m1[8] + m2[8], m1[9] + m2[9], m1[10] + m2[10], m1[11] + m2[11], 
                             m1[12] + m2[12], m1[13] + m2[13], m1[14] + m2[14], m1[15] + m2[15] ];
                },

                iadd: matrix.iadd,

                subtract: function( m1, m2 ) {
//                  Test
                    return [ m1[0] - m2[0], m1[1] - m2[1], m1[2] - m2[2], m1[3] - m2[3],
                             m1[4] - m2[4], m1[5] - m2[5], m1[6] - m2[6], m1[7] - m2[7], 
                             m1[8] - m2[8], m1[9] - m2[9], m1[10] - m2[10], m1[11] - m2[11], 
                             m1[12] - m2[12], m1[13] - m2[13], m1[14] - m2[14], m1[15] - m2[15] ];
                },

                isubtract: matrix.isubtract,

                clear: matrix.clear,

                equal: matrix.equal,

                multiply: function( m1, m2, result ) {
                    var r = result || Matrix4();

                    r[0] = m1[0]*m2[0] + m1[1]*m2[4] + m1[2]*m2[8] + m1[3]*m2[12];
                    r[1] = m1[0]*m2[1] + m1[1]*m2[5] + m1[2]*m2[9] + m1[3]*m2[13];
                    r[2] = m1[0]*m2[2] + m1[1]*m2[6] + m1[2]*m2[10] + m1[3]*m2[14];
                    r[3] = m1[0]*m2[3] + m1[1]*m2[7] + m1[2]*m2[11] + m1[3]*m2[15];            
                    r[4] = m1[4]*m2[0] + m1[5]*m2[4] + m1[6]*m2[8] + m1[7]*m2[12];
                    r[5] = m1[4]*m2[1] + m1[5]*m2[5] + m1[6]*m2[9] + m1[7]*m2[13];
                    r[6] = m1[4]*m2[2] + m1[5]*m2[6] + m1[6]*m2[10] + m1[7]*m2[14];
                    r[7] = m1[4]*m2[3] + m1[5]*m2[7] + m1[6]*m2[11] + m1[7]*m2[15];
                    r[8] = m1[8]*m2[0] + m1[9]*m2[4] + m1[10]*m2[8] + m1[11]*m2[12];
                    r[9] = m1[8]*m2[1] + m1[9]*m2[5] + m1[10]*m2[9] + m1[11]*m2[13];
                    r[10] = m1[8]*m2[2] + m1[9]*m2[6] + m1[10]*m2[10] + m1[11]*m2[14];
                    r[11] = m1[8]*m2[3] + m1[9]*m2[7] + m1[10]*m2[11] + m1[11]*m2[15];
                    r[12] = m1[12]*m2[0] + m1[13]*m2[4] + m1[14]*m2[8] + m1[15]*m2[12];
                    r[13] = m1[12]*m2[1] + m1[13]*m2[5] + m1[14]*m2[9] + m1[15]*m2[13];
                    r[14] = m1[12]*m2[2] + m1[13]*m2[6] + m1[14]*m2[10] + m1[15]*m2[14];
                    r[15] = m1[12]*m2[3] + m1[13]*m2[7] + m1[14]*m2[11] + m1[15]*m2[15];

                    if( !result ) {
                        return r;
                    }
                },

                imultiply: function( m1, m2 ) {
                    var r = Matrix4( m1 );

                    r[0] = m1[0]*m2[0] + m1[1]*m2[4] + m1[2]*m2[8] + m1[3]*m2[12];
                    r[1] = m1[0]*m2[1] + m1[1]*m2[5] + m1[2]*m2[9] + m1[3]*m2[13];
                    r[2] = m1[0]*m2[2] + m1[1]*m2[6] + m1[2]*m2[10] + m1[3]*m2[14];
                    r[3] = m1[0]*m2[3] + m1[1]*m2[7] + m1[2]*m2[11] + m1[3]*m2[15];            
                    r[4] = m1[4]*m2[0] + m1[5]*m2[4] + m1[6]*m2[8] + m1[7]*m2[12];
                    r[5] = m1[4]*m2[1] + m1[5]*m2[5] + m1[6]*m2[9] + m1[7]*m2[13];
                    r[6] = m1[4]*m2[2] + m1[5]*m2[6] + m1[6]*m2[10] + m1[7]*m2[14];
                    r[7] = m1[4]*m2[3] + m1[5]*m2[7] + m1[6]*m2[11] + m1[7]*m2[15];
                    r[8] = m1[8]*m2[0] + m1[9]*m2[4] + m1[10]*m2[8] + m1[11]*m2[12];
                    r[9] = m1[8]*m2[1] + m1[9]*m2[5] + m1[10]*m2[9] + m1[11]*m2[13];
                    r[10] = m1[8]*m2[2] + m1[9]*m2[6] + m1[10]*m2[10] + m1[11]*m2[14];
                    r[11] = m1[8]*m2[3] + m1[9]*m2[7] + m1[10]*m2[11] + m1[11]*m2[15];
                    r[12] = m1[12]*m2[0] + m1[13]*m2[4] + m1[14]*m2[8] + m1[15]*m2[12];
                    r[13] = m1[12]*m2[1] + m1[13]*m2[5] + m1[14]*m2[9] + m1[15]*m2[13];
                    r[14] = m1[12]*m2[2] + m1[13]*m2[6] + m1[14]*m2[10] + m1[15]*m2[14];
                    r[15] = m1[12]*m2[3] + m1[13]*m2[7] + m1[14]*m2[11] + m1[15]*m2[15];

                    return r;
                },

                translate: function() {
                    if( 0 === arguments.length )
                        return matrix4.identity;
                    else if( 1 === arguments.length ) {
                        var v = arguments[0];
                        var x = v[0],
                        y = v[1],
                        z = v[2];
                        return matrix.$( 16, [1, 0, 0, x,
                                              0, 1, 0, y,
                                              0, 0, 1, z,
                                              0, 0, 0, 1] );
                    } else {
                        return matrix.$( 16, arguments );       
                    }
                },

                scale: function() {
                    if( 0 === arguments.length )
                        return matrix4.identity;
                    else if( 1 === arguments.length ) {
                        var v = arguments[0];
                        var x = v[0],
                        y = v[1],
                        z = v[2];
                        return matrix.$( 16, [x, 0, 0, 0,
                                              0, y, 0, 0,
                                              0, 0, z, 0,
                                              0, 0, 0, 1] );
                    } else {
                        return matrix.$( 16, arguments );
                    }
                },

                rotate: function() {
                    if( 0 === arguments.length )
                        return matrix4.identity;
                    else if( 1 === arguments.length ) {
                        var v = arguments[0];
                        var x = v[0],
                        y = v[1],
                        z = v[2],
                        w = v[3];
                        return matrix.$( 16, [1 - 2*y*y - 2*z*z, 2*x*y - 2*w*z, 2*x*z + 2*w*y, 0,
                                              2*x*y + 2*w*z, 1-2*x*x - 2*x*x, 2*y*z + 2*w*x, 0,
                                              2*x*z - 2*w*y, 2*y*z - 2*w*x, 1-2*x*x - 2*y*y, 0,
                                              0, 0, 0, 1] );
                    } else {
                        return matrix.$( 16, arguments );
                    }
                },

                rotateEuler: function() {
                    if( 0 === arguments.length )
                        return Matrix( 16, Matrix4_constants.identity );
                    else if( 1 === arguments.length ) {
                        var v = arguments[0];
                        var x = v[0],
                        y = v[1],
                        z = v[2];
//                      return Matrix( 16, [] );
                        // TODO
                    } else {
                        return Matrix( 16, arguments );
                    }
                },

                rotateEulerAxis: function() {
                    if( 0 === arguments.length )
                        return matrix4.identity;
                    else if( 2 === arguments.length ) {
                        var v = arguments[0];
                        var x = v[0],
                        y = v[1],
                        z = v[2];
//                      return Matrix( 16, [] );
                        // TODO
                    } else {
                        return matrix.$( 16, arguments );
                    }
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

                transpose: function (m) {
                    return [m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]];
                },

                inverse: function (m,m_inv) {
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

                    var determinant = a0 * b5 - a1 * b4 + a2 * b3 + a3 * b2 - a4 * b1 + a5 * b0;

                    if (determinant !== 0) {
                        if (m_inv === undef) m_inv = [];

                        m_inv[0] = 0 + m[5] * b5 - m[6] * b4 + m[7] * b3;
                        m_inv[4] = 0 - m[4] * b5 + m[6] * b2 - m[7] * b1;
                        m_inv[8] = 0 + m[4] * b4 - m[5] * b2 + m[7] * b0;
                        m_inv[12] = 0 - m[4] * b3 + m[5] * b1 - m[6] * b0;
                        m_inv[1] = 0 - m[1] * b5 + m[2] * b4 - m[3] * b3;
                        m_inv[5] = 0 + m[0] * b5 - m[2] * b2 + m[3] * b1;
                        m_inv[9] = 0 - m[0] * b4 + m[1] * b2 - m[3] * b0;
                        m_inv[13] = 0 + m[0] * b3 - m[1] * b1 + m[2] * b0;
                        m_inv[2] = 0 + m[13] * a5 - m[14] * a4 + m[15] * a3;
                        m_inv[6] = 0 - m[12] * a5 + m[14] * a2 - m[15] * a1;
                        m_inv[10] = 0 + m[12] * a4 - m[13] * a2 + m[15] * a0;
                        m_inv[14] = 0 - m[12] * a3 + m[13] * a1 - m[14] * a0;
                        m_inv[3] = 0 - m[9] * a5 + m[10] * a4 - m[11] * a3;
                        m_inv[7] = 0 + m[8] * a5 - m[10] * a2 + m[11] * a1;
                        m_inv[11] = 0 - m[8] * a4 + m[9] * a2 - m[11] * a0;
                        m_inv[15] = 0 + m[8] * a3 - m[9] * a1 + m[10] * a0;

                        var inverse_det = 1.0 / determinant;

                        m_inv[0] *= inverse_det;
                        m_inv[1] *= inverse_det;
                        m_inv[2] *= inverse_det;
                        m_inv[3] *= inverse_det;
                        m_inv[4] *= inverse_det;
                        m_inv[5] *= inverse_det;
                        m_inv[6] *= inverse_det;
                        m_inv[7] *= inverse_det;
                        m_inv[8] *= inverse_det;
                        m_inv[9] *= inverse_det;
                        m_inv[10] *= inverse_det;
                        m_inv[11] *= inverse_det;
                        m_inv[12] *= inverse_det;
                        m_inv[13] *= inverse_det;
                        m_inv[14] *= inverse_det;
                        m_inv[15] *= inverse_det;

                        return m_inv;
                    }

                    return null; 
                },

                inverse_matrix3: function(mat) {
                    var dest = [];

                    var a00 = mat[0], a01 = mat[1], a02 = mat[2],
                    a10 = mat[4], a11 = mat[5], a12 = mat[6],
                    a20 = mat[8], a21 = mat[9], a22 = mat[10];

                    var b01 = a22*a11-a12*a21,
                    b11 = -a22*a10+a12*a20,
                    b21 = a21*a10-a11*a20;

                    var d = a00*b01 + a01*b11 + a02*b21;
                    if (!d) { return null; }
                    var id = 1/d;

                    dest[0] = b01*id;
                    dest[1] = (-a22*a01 + a02*a21)*id;
                    dest[2] = (a12*a01 - a02*a11)*id;
                    dest[3] = b11*id;
                    dest[4] = (a22*a00 - a02*a20)*id;
                    dest[5] = (-a12*a00 + a02*a10)*id;
                    dest[6] = b21*id;
                    dest[7] = (-a21*a00 + a01*a20)*id;
                    dest[8] = (a11*a00 - a01*a10)*id;

                    return dest;
                },       

                // efficient transposed inverse 3x3 of a 4x4 matrix
                normal_matrix3: function(m) {
                    return matrix3.transpose_inline(matrix4.inverse_matrix3(this.mvMatrix));
                }

        };
        
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
