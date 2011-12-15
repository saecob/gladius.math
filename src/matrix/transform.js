/*jshint white: false, strict: false, plusplus: false, onevar: false,
nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var matrix4 = require( './matrix4' )( FLOAT_ARRAY_TYPE );

        var Transform = matrix4.$;
        
        var transform = {
                
            $: Transform,

            fixed: function( vt, vr, vs ) {
                var r = matrix4.identity;

                if( vt ) {
                    transform.translate( vt, r );
                }

                if( vr ) {
                    transform.rotate( vr, r );
                }

                if( vs ) {
                    transform.scale( vs, r );
                }

                return r;
            },

            // Convert a vector rotation (in radians) to a 4x4 matrix
            rotate: function( v, result ) {
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
            scale: function( v, result ) {
                var r = [ v[0], 0.0, 0.0, 0.0,
                           0.0, v[1], 0.0, 0.0,
                           0.0, 0.0, v[2], 0.0,
                           0.0, 0.0, 0.0, 1.0 ];

                if( result ) {
                    matrix4.multiply( matrix4.$( result ), r, result );
                } else {
                    return r;
                }
            },

            // Convert a vector3 translation to a 4x4 matrix
            translate: function( v, result ) {
            //translate: function( t, v, result ) {
                //result = result || matrix4.identity;
                var r = [ 1.0, 0.0, 0.0, v[0],
                          0.0, 1.0, 0.0, v[1],
                          0.0, 0.0, 1.0, v[2],
                          0.0, 0.0, 0.0, 1.0 ]

                if( result ) {
                    matrix4.multiply( matrix4.$( result ), r, result );
                } else {
                    return r;
                }
            }

        };
        
        return transform;

    };

});