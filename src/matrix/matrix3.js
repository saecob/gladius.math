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

                add: function( m1, m2 ) {
//                  Test
                    return [ m1[0] + m2[0], m1[1] + m2[1], m1[2] + m2[2], 
                             m1[3] + m2[3], m1[4] + m2[4], m1[5] + m2[5],
                             m1[6] + m2[6], m1[7] + m2[7], m1[8] + m2[8] ];
                },

                iadd: matrix.iadd,

                subtract: function( m1, m2 ) {
//                  Test
                    return [ m1[0] - m2[0], m1[1] - m2[1], m1[2] - m2[2], 
                             m1[3] - m2[3], m1[4] - m2[4], m1[5] - m2[5],
                             m1[6] - m2[6], m1[7] - m2[7], m1[8] - m2[8] ];
                },

                isubtract: matrix.isubtract,

                clear: matrix.clear,

                equal: matrix.equal,

                multiply: function( m1, m2 ) {
                    var r = Matrix3();

                    r = [m1[1]*m2[1] + m1[2]*m2[4] + m1[3]*m2[7], // 1, 2, 3
                         m1[1]*m2[2] + m1[2]*m2[5] + m1[3]*m2[8], 
                         m1[1]*m2[3] + m1[2]*m2[6] + m1[3]*m2[9],

                         m1[4]*m2[1] + m1[5]*m2[4] + m1[6]*m2[7], 
                         m1[4]*m2[2] + m1[5]*m2[5] + m1[6]*m2[8], // 4, 5, 6
                         m1[4]*m2[3] + m1[5]*m2[6] + m1[6]*m2[9],

                         m1[7]*m2[1] + m1[8]*m2[4] + m1[9]*m2[7], 
                         m1[7]*m2[2] + m1[8]*m2[5] + m1[9]*m2[8],
                         m1[7]*m2[3] + m1[8]*m2[6] + m1[9]*m2[9]]; // 7, 8, 9
//                  Test
                    return r;
                },

                imultiply: function( m1, m2 ) {
                    var r = Matrix3( m1 );

                    r = [m1[1]*m2[1] + m1[2]*m2[4] + m1[3]*m2[7], // 1, 2, 3
                         m1[1]*m2[2] + m1[2]*m2[5] + m1[3]*m2[8], 
                         m1[1]*m2[3] + m1[2]*m2[6] + m1[3]*m2[9],

                         m1[4]*m2[1] + m1[5]*m2[4] + m1[6]*m2[7], 
                         m1[4]*m2[2] + m1[5]*m2[5] + m1[6]*m2[8], // 4, 5, 6
                         m1[4]*m2[3] + m1[5]*m2[6] + m1[6]*m2[9],

                         m1[7]*m2[1] + m1[8]*m2[4] + m1[9]*m2[7], 
                         m1[7]*m2[2] + m1[8]*m2[5] + m1[9]*m2[8],
                         m1[7]*m2[3] + m1[8]*m2[6] + m1[9]*m2[9]]; // 7, 8, 9
//                  Test               
                    return r;
                },

                translate: function() {
                    if( 0 === arguments.length ) {
                        return matrix3.identity;
                    } else if( 1 === arguments.length ) {
                        var v = arguments[0];
                        var x = v[0],
                        y = v[1],
                        z = v[2];
//                      return Matrix( 9, [] );
                        // TODO                
                    } else {
                        return matrix.$( 9, arguments );       
                    }
                },

                scale: function() {
                    if( 0 === arguments.length ) {
                        return matrix3.identity;
                    } else if( 1 === arguments.length ) {
                        var v = arguments[0];
                        var x = v[0],
                        y = v[1],
                        z = v[2];
//                      return Matrix( 9, [] );
                        // TODO                
                    } else {
                        return matrix.$( 9, arguments );
                    }
                },

                rotate: function() {
                    if( 0 === arguments.length ) {
                        return matrix3.identity;
                    } else if( 1 === arguments.length ) {
                        var v = arguments[0];
                        var x = v[0],
                        y = v[1],
                        z = v[2],
                        w = v[3];
//                      return Matrix( 9, [] );
                        // TODO
                    } else {
                        return matrix.$( 9, arguments );
                    }
                },

                transpose: function(mat_in) {
                    var mat = mat_in.slice(0);
                    var a01 = mat[1], a02 = mat[2], a12 = mat[5];

                    mat[1] = mat[3];
                    mat[2] = mat[6];
                    mat[3] = a01;
                    mat[5] = mat[7];
                    mat[6] = a02;
                    mat[7] = a12;

                    return mat;
                },

                transpose_inline: function(mat) {
                    var a01 = mat[1], a02 = mat[2], a12 = mat[5];

                    mat[1] = mat[3];
                    mat[2] = mat[6];
                    mat[3] = a01;
                    mat[5] = mat[7];
                    mat[6] = a02;
                    mat[7] = a12;

                    return mat;
                }        

        };
        
        Object.defineProperty( matrix3, 'identity', {
            get: function() {
                Matrix3( [1, 0, 0,
                          0, 1, 0,
                          0, 0, 1] );
            },
            enumerable: true
        });

        return matrix3;

    };

});