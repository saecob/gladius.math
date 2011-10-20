/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var matrix = require( './matrix' )( FLOAT_ARRAY_TYPE );

        var Matrix2 = function() {
            if( 0 === arguments.length ) {
                return matrix.$( 4, [0, 0,
                                   0, 0] );
            } else {
                return matrix.$( 4, arguments );
            }
        };

        var matrix2 = {

                $: Matrix2,

                add: function( m1, m2 ) {
//                  Test
                    return [ m1[0] + m2[0], m1[1] + m2[1], m1[2] + m2[2], m1[3] + m2[3] ];
                },

                iadd: matrix.iadd,

                subtract: function( m1, m2 ) {
//                  Test
                    return [ m1[0] - m2[0], m1[1] - m2[1], m1[2] - m2[2], m1[3] - m2[3] ];
                },

                isubtract: matrix.isubtract,

                clear: matrix.clear,

                equal: matrix.equal,

                translate: function() {
                    if( 0 === arguments.length ) {
                        return matrix2.identity;
                    } else if( 1 === arguments.length ) {
                        var v = arguments[0];
                        var x = v[0],
                        y = v[1];
                        return matrix.$( 4, [1 , x,
                                           0 , y] );
//                      Test
                    } else {
                        return matrix.$( 4, arguments );       
                    }
                },

                scale: function() {
                    if( 0 === arguments.length ) {
                        return matrix2.identity;
                    } else if( 1 === arguments.length ) {
                        var v = arguments[0];
                        var x = v[0],
                        y = v[1];
                        return matrix.$( 4, [x, 0,
                                           0, y] );
//                      Test                
                    } else {
                        return matrix.$( 4, arguments );
                    }
                },

                rotate: function() {
                    if( 0 === arguments.length ) {
                        return matrix2.identity;
                    } else if( 1 === arguments.length ) {
                        var v = arguments[0];
                        var r = v[0];
//                      return Matrix( 4, [] );
                        // Todo (Quaternion = w + xi + yj + zk)
                    } else {
                        return matrix.$( 4, arguments );
                    }
                }

        }

        Object.defineProperty( matrix2, 'identity', {
            get: function() {
                return Matrix2( [1, 0,
                                 0, 1] );
            },
            enumerable: true
        });

        return matrix2;

    };

});