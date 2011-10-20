/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var vector = require( './vector' )( FLOAT_ARRAY_TYPE );

        var Vector2 = function() {
            if( 0 === arguments.length ) {
                return vector.$( 2, [0, 0] );
            } else {
                return vector.$( 2, arguments );
            }
        };
        
        var vector2 = {
                
                $: Vector2,
          
                add: function( v1, v2, result ) {
                    result = result || Vector2();

                    return vector.add( v1, v2, result );
                },

                angle: function( v1, v2 ) {
                    var nV1 = Vector2();
                    var nV2 = Vector2();

                    vector.normalize(v1, nV1);
                    vector.normalize(v2, nV2);

                    return Math.acos( vector.dot( nV1, nV2 ) );
                },

                clear: vector.clear,

                dot: vector.dot,

                equal: vector.equal,

                length: vector.length,

                multiply: function( v, s, result ) {
                    result = result || Vector2();

                    return vector.multiply( v, s, result );
                },

                normalize: function( v, result ) {
                    result = result || Vector2();
                    var len = vector.length(v);

                    result[0] = v[0]/len;
                    result[1] = v[1]/len;

                    return result;
                },

                subtract: function( v1, v2, result ) {
                    result = result || Vector2();

                    return vector.subtract( v1, v2, result );
                }
                
        };
        
        Object.defineProperty( vector2, 'x', {
            get: function() {
                return Vector2( [1, 0] );
            },
            enumerable: true
        });

        Object.defineProperty( vector2, 'u', {
            get: function() {
                return Vector2( [1, 0] );
            },
            enumerable: true
        });

        Object.defineProperty( vector2, 'y', {
            get: function() {
                return Vector2( [0, 1] );
            },
            enumerable: true
        });

        Object.defineProperty( vector2, 'v', {
            get: function() {
                return Vector2( [0, 1] );
            },
            enumerable: true
        });

        Object.defineProperty( vector2, 'zero', {
            get: function() {
                return Vector2( [0, 0] );
            },
            enumerable: true
        });

        Object.defineProperty( vector2, 'one', {
            get: function() {
                return Vector2( [1, 1] );
            },
            enumerable: true
        });

        return vector2;

    };

});