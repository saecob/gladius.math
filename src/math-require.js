/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

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
        transform = require( './matrix/transform' );

    var _Math = function( options ) {
        
        var _FLOAT_ARRAY_ENUM = {
                Float32: Float32Array,
                Float64: Float64Array
        };
                
        var _FLOAT_ARRAY_TYPE = _FLOAT_ARRAY_ENUM.Float32;
        
        Object.defineProperty( this, 'ARRAY_TYPE', {
            get: function() {
                return _FLOAT_ARRAY_TYPE;
            },
            enumerable: true
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
        
        Object.defineProperty( this, 'Vector2', {
            get: function() {
                return _vector2.$;
            },
            enumerable: true
        });
        Object.defineProperty( this, 'vector2', {
            get: function() {
                return _vector2;
            },
            enumerable: true
        });

        Object.defineProperty( this, 'Vector3', {
            get: function() {
                return _vector3.$;
            },
            enumerable: true
        });
        Object.defineProperty( this, 'vector3', {
            get: function() {
                return _vector3;
            },
            enumerable: true
        });
        
        Object.defineProperty( this, 'Vector4', {
            get: function() {
                return _vector4.$;
            },
            enumerable: true
        });
        Object.defineProperty( this, 'vector4', {
            get: function() {
                return _vector4;
            },
            enumerable: true
        });
        
        Object.defineProperty( this, 'Quaternion', {
            get: function() {
                return _quaternion.$;
            },
            enumerable: true
        });
        Object.defineProperty( this, 'quaternion', {
            get: function() {
                return _quaternion;
            },
            enumerable: true
        });
        
        Object.defineProperty( this, 'Matrix2', {
            get: function() {
                return _matrix2.$;
            },
            enumerable: true
        });
        Object.defineProperty( this, 'matrix2', {
            get: function() {
                return _matrix2;
            },
            enumerable: true
        });
        
        Object.defineProperty( this, 'Matrix3', {
            get: function() {
                return _matrix3.$;
            },
            enumerable: true
        });
        Object.defineProperty( this, 'matrix3', {
            get: function() {
                return _matrix3;
            },
            enumerable: true
        });  
        
        Object.defineProperty( this, 'Matrix4', {
            get: function() {
                return _matrix4.$;
            },
            enumerable: true
        });
        Object.defineProperty( this, 'matrix4', {
            get: function() {
                return _matrix4;
            },
            enumerable: true
        });
        
        Object.defineProperty( this, 'Transform', {
            get: function() {
                return _transform.$;
            },
            enumerable: true
        });
        Object.defineProperty( this, 'transform', {
            get: function() {
                return _transform;
            },
            enumerable: true
        });
        
    };

    return _Math;

});