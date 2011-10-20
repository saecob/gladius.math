/*jshint white: false, strict: false, plusplus: false, nomen: false */
/*global define: false, console: false, window: false */

define( function ( require ) {
    var lang = require( './lang' ),
        constants = require( './constants' ),
        vector2 = require( './vector/vector2' ),
        vector3 = require( './vector/vector3' ),
        vector4 = require( './vector/vector4' ),
        quaternion = require( './vector/quaternion' ),
        matrix2 = require( './matrix/matrix2' ),
        matrix3 = require( './matrix/matrix3' ),
        matrix4 = require( './matrix/matrix4' ),
        transform = require( './matrix/transform' ),
        
    _math, i, args,

    // Expose the API on the global object. Part of if may already
    // exist, mainly gladius.ready from gladius.js. Check tools/wrap.start
    // for protections against overwriting an existing gladius in the page,
    // for when gladius is built for deployment.
    global = window._math || ( window._math = {} );
    
    /***
     * _Math
     *
     * This is where we put all of our goodies. Some are instances, like the subsystems,
     * and others are prototypes to be used and extended.
     */
    _Math = function ( options, callback ) {

        this.options = options || {};
        
        var _FLOAT_ARRAY_ENUM = {
                Float32: Float32Array,
                Float64: Float64Array
        };
                
        var _FLOAT_ARRAY_TYPE = _FLOAT_ARRAY_ENUM.Float32;
        
        Object.defineProperty( this, 'ARRAY_TYPE', {
            get: function() {
                return _FLOAT_ARRAY_TYPE;
            }
        });
        
        lang.extend( this, constants() );
        
        var _vector2 = vector2( _FLOAT_ARRAY_TYPE );
        var _vector3 = vector3( _FLOAT_ARRAY_TYPE );
        var _vector4 = vector4( _FLOAT_ARRAY_TYPE );
        var _quaternion = quaternion( _FLOAT_ARRAY_TYPE );
        
        var _matrix2 = matrix2( _FLOAT_ARRAY_TYPE );
        var _matrix3 = matrix3( _FLOAT_ARRAY_TYPE );
        var _matrix4 = matrix4( _FLOAT_ARRAY_TYPE );
        var _transform = transform( _FLOAT_ARRAY_TYPE );
        
        require([], lang.bind(this, function () {

            Object.defineProperty( this, 'Vector2', {
                get: function() {
                    return _vector2.$;
                }
            });
            Object.defineProperty( this, 'vector2', {
                get: function() {
                    return _vector2;
                }
            });

            Object.defineProperty( this, 'Vector3', {
                get: function() {
                    return _vector3.$;
                }
            });
            Object.defineProperty( this, 'vector3', {
                get: function() {
                    return _vector3;
                }
            });
            
            Object.defineProperty( this, 'Vector4', {
                get: function() {
                    return _vector4.$;
                }
            });
            Object.defineProperty( this, 'vector4', {
                get: function() {
                    return _vector4;
                }
            });
            
            Object.defineProperty( this, 'Quaternion', {
                get: function() {
                    return _quaternion.$;
                }
            });
            Object.defineProperty( this, 'quaternion', {
                get: function() {
                    return _quaternion;
                }
            });
            
            Object.defineProperty( this, 'Matrix2', {
                get: function() {
                    return _matrix2.$;
                }
            });
            Object.defineProperty( this, 'matrix2', {
                get: function() {
                    return _matrix2;
                }
            });
            
            Object.defineProperty( this, 'Matrix3', {
                get: function() {
                    return _matrix3.$;
                }
            });
            Object.defineProperty( this, 'matrix3', {
                get: function() {
                    return _matrix3;
                }
            });  
            
            Object.defineProperty( this, 'Matrix4', {
                get: function() {
                    return _matrix4.$;
                }
            });
            Object.defineProperty( this, 'matrix4', {
                get: function() {
                    return _matrix4;
                }
            });
            
            Object.defineProperty( this, 'Transform', {
                get: function() {
                    return _transform.$;
                }
            });
            Object.defineProperty( this, 'transform', {
                get: function() {
                    return _transform;
                }
            });

            // Let caller know the math instance is ready.
            if (callback) {
                callback(this);
            }

        }));
    };

    // Export the public API for creating engine instances.
    global.create = function ( options, callback ) {
        return new _Math( options, callback );
    };

    // Call any callbacks waiting for gladius to be available.
    if ( global._waitingCreates ) {
        for ( i = 0; (args = global._waitingCreates[i]); i++ ) {
            global.create.apply(global, args);
        }
        delete global._waitingCreates;
    }

    return global;
});
