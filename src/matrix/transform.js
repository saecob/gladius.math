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

                var sinA,
                    cosA;

                if( 0 !== v[2] ) {
                    sinA = Math.sin( v[2] );
                    cosA = Math.cos( v[2] );
                    ml = [];
                    ml.push(matrix4.$([ cosA, sinA, 0, 0,
                                       -sinA, cosA, 0, 0,
                                        0, 0, 1, 0,
                                        0, 0, 0, 1 ] ));
                    ml.push(matrix4.$(r));
                    
                    matrix4.multiply( ml, r );
                }

                if( 0 !== v[1] ) {
                    sinA = Math.sin( v[1] );
                    cosA = Math.cos( v[1] );
                    ml = [];
                    ml.push(matrix4.$([ cosA, 0, -sinA, 0,
                                        0, 1, 0, 0,
                                        sinA, 0, cosA, 0,
                                        0, 0, 0, 1 ] ));
                    ml.push(matrix4.$(r));
                    
                    matrix4.multiply( ml, r );
                }

                if( 0 !== v[0] ) {
                    sinA = Math.sin( v[0] );
                    cosA = Math.cos( v[0] );
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