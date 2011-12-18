/*jshint white: false, strict: false, plusplus: false, onevar: false,
nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var matrix4 = require( './matrix4' )( FLOAT_ARRAY_TYPE );

        var Transform = matrix4.$;
        
        var transform = {
                
            $: Transform,

            //fixed: function( vt, vr, vs ) {
            fixed: function( t, vt, vr, vs, result ) {
                result = result || matrix4.identity;
                //var r = matrix4.identity;

                if( vt ) {
                    transform.translate( t, vt, result );
                }

                //if( vr ) {
                //    transform.rotate( t, vr, result );
                //}

                if( vs ) {
                    transform.scale( t, vs, result );
                }

                return result;
            },

            // Convert a vector rotation (in radians) to a 4x4 matrix
            rotate: function( v, result ) {
            //rotate: function( t, v, result ) {
                var r = result || matrix4.identity;

                var sinA, cosA,
                    x = v[0],
                    y = v[1],
                    z = v[2];

                if( 0 !== z ) {
                    sinA = Math.sin( z );
                    cosA = Math.cos( z );
                    ml = [];
                    ml.push(matrix4.$([ cosA, sinA, 0, 0,
                                       -sinA, cosA, 0, 0,
                                        0, 0, 1, 0,
                                        0, 0, 0, 1 ] ));
                    ml.push(matrix4.$(r));
                    
                    matrix4.multiply( ml, r );
                }

                if( 0 !== y ) {
                    sinA = Math.sin( y );
                    cosA = Math.cos( y );
                    ml = [];
                    ml.push(matrix4.$([ cosA, 0, -sinA, 0,
                                        0, 1, 0, 0,
                                        sinA, 0, cosA, 0,
                                        0, 0, 0, 1 ] ));
                    ml.push(matrix4.$(r));
                    
                    matrix4.multiply( ml, r );
                }

                if( 0 !== x ) {
                    sinA = Math.sin( x );
                    cosA = Math.cos( x );
                    ml = [];
                    ml.push(matrix4.$([ 1, 0, 0, 0,
                                        0, cosA, sinA, 0,
                                        0, -sinA, cosA, 0,
                                        0, 0, 0, 1 ] ));
                    ml.push(matrix4.$(r));
                    
                    matrix4.multiply( ml, r );
                }

                if( !result ) {
                    return r;
                }
            },

            // Convert a vector3 scale to a 4x4 matrix
            //scale: function( v, result ) {
            scale: function( t, v, result ) {
                var x = v[0],
                    y = v[1], 
                    z = v[2];

                if (!result || t === result) {
                    t[0] *= x;
                    t[1] *= x;
                    t[2] *= x;
                    t[3] *= x;
                    t[4] *= y;
                    t[5] *= y;
                    t[6] *= y;
                    t[7] *= y;
                    t[8] *= z;
                    t[9] *= z;
                    t[10] *= z;
                    t[11] *= z;
                    
                    result = t;
                } else {

                    result[0] = t[0] * x;
                    result[1] = t[1] * x;
                    result[2] = t[2] * x;
                    result[3] = t[3] * x;
                    result[4] = t[4] * y;
                    result[5] = t[5] * y;
                    result[6] = t[6] * y;
                    result[7] = t[7] * y;
                    result[8] = t[8] * z;
                    result[9] = t[9] * z;
                    result[10] = t[10] * z;
                    result[11] = t[11] * z;
                    result[12] = t[12];
                    result[13] = t[13];
                    result[14] = t[14];
                    result[15] = t[15];
                }
                
                return result;
                
                // var r = [ v[0], 0.0, 0.0, 0.0,
                           // 0.0, v[1], 0.0, 0.0,
                           // 0.0, 0.0, v[2], 0.0,
                           // 0.0, 0.0, 0.0, 1.0 ];

                // if( result ) {
                    // matrix4.multiply( matrix4.$( result ), r, result );
                // } else {
                    // return r;
                // }
            },

            // Convert a vector3 translation to a 4x4 matrix
            //translate: function( v, result ) {
            translate: function( t, v, result ) {
                
                var x = v[0], y = v[1], z = v[2],
                    a00, a01, a02, a03,
                    a10, a11, a12, a13,
                    a20, a21, a22, a23;

                if (!result || t === result) {
                    t[12] = t[0] * x + t[4] * y + t[8] * z + t[12];
                    t[13] = t[1] * x + t[5] * y + t[9] * z + t[13];
                    t[14] = t[2] * x + t[6] * y + t[10] * z + t[14];
                    t[15] = t[3] * x + t[7] * y + t[11] * z + t[15];
                    return t;
                }

                a00 = t[0]; a01 = t[1]; a02 = t[2]; a03 = t[3];
                a10 = t[4]; a11 = t[5]; a12 = t[6]; a13 = t[7];
                a20 = t[8]; a21 = t[9]; a22 = t[10]; a23 = t[11];

                result[0] = a00; result[1] = a01; result[2] = a02; result[3] = a03;
                result[4] = a10; result[5] = a11; result[6] = a12; result[7] = a13;
                result[8] = a20; result[9] = a21; result[10] = a22; result[11] = a23;

                result[12] = a00 * x + a10 * y + a20 * z + t[12];
                result[13] = a01 * x + a11 * y + a21 * z + t[13];
                result[14] = a02 * x + a12 * y + a22 * z + t[14];
                result[15] = a03 * x + a13 * y + a23 * z + t[15];
                return result;
                
                // var r = [ 1.0, 0.0, 0.0, v[0],
                          // 0.0, 1.0, 0.0, v[1],
                          // 0.0, 0.0, 1.0, v[2],
                          // 0.0, 0.0, 0.0, 1.0 ]

                // if( result ) {
                    // matrix4.multiply( matrix4.$( result ), r, result );
                // } else {
                    // return r;
                // }
            }

        };
        
        return transform;

    };

});