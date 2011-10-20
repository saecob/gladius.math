/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var vector = require( './vector' )( FLOAT_ARRAY_TYPE );

        var Vector4 = function() {
            if( 0 === arguments.length ) {
                return vector.$( 4, [0, 0, 0, 0] );
            } else {
                return vector.$( 4, arguments );
            }
        };

        var vector4 = {
                
                $: Vector4,

                add: function( v1, v2, result ) {
                    result = result || Vector4();

                    result[0] = v1[0] + v2[0];
                    result[1] = v1[1] + v2[1];
                    result[2] = v1[2] + v2[2];
                    result[3] = v1[3] + v2[3];

                    return result;
                },

                // Computes the angle between v1 and v2
                angle: function( v1, v2 ) {
                    return Math.acos(
                            (v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2] + v1[3] * v2[3]) /
                            (Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2] + v1[3] * v1[3]) *
                                    Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2] + v2[3] * v2[3]))
                    );
                },

                clear: vector.clear,

                // Computes the dot product of v1 and v2
                dot: function( v1, v2 ) {
                    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2] + v1[3] * v2[3];
                },

                equal: vector.equal,

                length: vector.length,

                // Computes v * s
                multiply: function( v, s, result ) {
                    result = result || Vector4();

                    return vector.multiply( v, s, result );
                },

                // Computes a Vector4 with same direction as v having unit length
                normalize: function( v, result ) {
                    result = result || Vector4();
                    var len = vector.length(v);

                    result[0] = v[0]/len;
                    result[1] = v[1]/len;
                    result[2] = v[2]/len;
                    result[3] = v[3]/len;

                    return result;
                },

                // Computes v1 - v2
                subtract: function( v1, v2, result ) {
                    result = result || Vector4();

                    return vector.subtract( v1, v2, result );
                }

        }
        
        Object.defineProperty( vector4, 'x', {
            get: function() {
                return Vector4( [1, 0, 0, 0] );
            },
            enumerable: true
        });

        Object.defineProperty( vector4, 'y', {
            get: function() {
                return Vector4( [0, 1, 0, 0] );
            },
            enumerable: true
        });
        
        Object.defineProperty( vector4, 'z', {
            get: function() {
                return Vector4( [0, 0, 1, 0] );
            },
            enumerable: true
        });
        
        Object.defineProperty( vector4, 'w', {
            get: function() {
                return Vector4( [0, 0, 0, 1] );
            },
            enumerable: true
        });

        Object.defineProperty( vector4, 'zero', {
            get: function() {
                return Vector4( [0, 0, 0, 0] );
            },
            enumerable: true
        });

        Object.defineProperty( vector4, 'one', {
            get: function() {
                return Vector4( [1, 1, 1, 1] );
            },
            enumerable: true
        });

        return vector4;

    };

});