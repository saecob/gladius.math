/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var vector = require( './vector' )( FLOAT_ARRAY_TYPE );

        var Vector3 = function() {
            if( 0 === arguments.length ) {
                return vector.$( 3, [0, 0, 0] );
            } else {
                return vector.$( 3, arguments );
            }
        };

        var vector3 = {
                
                $: Vector3,

                add: function( v1, v2, result ) {
                    result = result || Vector3();

                    return vector.add( v1, v2, result );
                },

                angle: function( v1, v2 ) {

                    return Math.acos(
                            (v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2]) /
                            (Math.sqrt(v1[0] * v1[0] + v1[1] * v1[1] + v1[2] * v1[2]) *
                                    Math.sqrt(v2[0] * v2[0] + v2[1] * v2[1] + v2[2] * v2[2]))
                    );
                },

                clear: vector.clear,

                cross: function( v1, v2, result ) {
                    result = result || Vector3();

                    result[0] = (v1[1] * v2[2]) - (v2[1] * v1[2]);
                    result[1] = (v1[2] * v2[0]) - (v2[2] * v1[0]);
                    result[2] = (v1[0] * v2[1]) - (v2[0] * v1[1]);

                    return result;
                },

                dot: function( v1, v2 ) {
                    return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
                },

                equal: vector.equal,

                length: vector.length,

                multiply: function( v, s, result ) {
                    result = result || Vector3();

                    return vector.multiply( v, s, result );
                },

                normal: function( v1, v2, result ) {
                    result = result || Vector3();

                    return Vector3.cross( v1, v2, result );
                },

                normalize: function( v, result ) {
                    result = result || Vector3();
                    var len = vector.length(v);

                    result[0] = v[0]/len;
                    result[1] = v[1]/len;
                    result[2] = v[2]/len;

                    return result;
                },

                subtract: function( v1, v2, result ) {
                    result = result || Vector3();

                    return vector.subtract( v1, v2, result );
                }

        };
        
        Object.defineProperty( vector3, 'x', {
            get: function() {
                return Vector3( [1, 0, 0] );
            },
            enumerable: true
        });

        Object.defineProperty( vector3, 'y', {
            get: function() {
                return Vector3( [0, 1, 0] );
            },
            enumerable: true
        });

        Object.defineProperty( vector3, 'z', {
            get: function() {
                return Vector3( [0, 0, 1] );
            },
            enumerable: true
        });

        Object.defineProperty( vector3, 'zero', {
            get: function() {
                return Vector3( [0, 0, 0] );
            },
            enumerable: true
        });

        Object.defineProperty( vector3, 'one', {
            get: function() {
                return Vector3( [1, 1, 1] );
            },
            enumerable: true
        });

        return vector3;

    };

});