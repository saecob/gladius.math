/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var Vector = function( dim, args ) {

            var elements = null;
            if( 1 === args.length ) {
                elements = args[0];
            } else {
                elements = args;
            }

            var vector = new FLOAT_ARRAY_TYPE( dim );
            for( var i = 0; i < dim; ++ i ) {
                vector[i] = elements[i];
            }

            return vector;

        };

        var vector = {
                
                $: Vector,

                add: function( v1, v2, result ) {
                    for( var i = 0; i < v1.length; ++ i ) {
                        result[i] += v1[i] + v2[i];
                    }

                    return result;
                },

                clear: function( v ) {
                    for( var i = 0; i < v.length; ++ i ) {
                        v[i] = 0;
                    }
                },

                dot: function( v1, v2 ) {
                    var res = 0;
                    for( var i = 0; i < v1.length; ++ i) {
                        res += v1[i] * v2[i];
                    }
                    return res;
                },

                equal: function( v1, v2, e ) {
                    e = e || 0.000001;

                    if( v1.length != v2.length ) {
                        return false;
                    }

                    var dim = v1.length;
                    for( var i = 0; i < dim; ++ i ) {
                        if ( Math.abs(v1[i] - v2[i]) > e ) {
                            return false;
                        }
                    }

                    return true;
                },

                length: function( v ) {
                    var va = 0;
                    for( var i = 0; i < v.length; ++ i ) {
                        va += v[i] * v[i];
                    }

                    return Math.sqrt(va);
                },

                multiply: function( v, s, result ) {
                    for( var i = 0; i < v.length; ++ i ) {
                        result[i] = v[i] * s;
                    }

                    return result;
                },

                normalize: function( v, result ) {
                    var len = v.length;
                    for( var i = 0, abslen = vector.length(v); i < len; ++ i ) {
                        result[i] = v[i] / abslen;
                    }

                    return result;
                },

                subtract: function( v1, v2, result) {
                    for( var i = 0; i < v1.length; ++ i ) {
                        result[i] = v1[i] - v2[i];
                    }

                    return result;
                }        

        };
        
        Object.defineProperty( vector, 'x', {
            get: function() {
                return Vector2( [1, 0] );
            },
            enumerable: true
        });

        Object.defineProperty( vector, 'u', {
            get: function() {
                return Vector2( [1, 0] );
            },
            enumerable: true
        });

        Object.defineProperty( vector, 'y', {
            get: function() {
                return Vector2( [0, 1] );
            },
            enumerable: true
        });

        Object.defineProperty( vector, 'v', {
            get: function() {
                return Vector2( [0, 1] );
            },
            enumerable: true
        });

        Object.defineProperty( vector, 'zero', {
            get: function() {
                return Vector2( [0, 0] );
            },
            enumerable: true
        });

        Object.defineProperty( vector, 'one', {
            get: function() {
                return Vector2( [1, 1] );
            },
            enumerable: true
        });

        return vector;

    };

});