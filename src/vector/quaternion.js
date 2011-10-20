/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var vector4 = require( './vector4' )( FLOAT_ARRAY_TYPE );

        var Quaternion = vector4.$;

        var quaternion = {

                $: Quaternion,

                length: vector4.length,

                multiply: function( q1, q2 ) {
                    var r = Quaternion();

                    r[0] = q1[3] * q2[0] + q1[0] * q2[3] + q1[1] * q2[2] - q1[2] * q2[1];   // x
                    r[1] = q1[3] * q2[1] - q1[0] * q2[2] + q1[1] * q2[3] + q1[2] * q2[0];   // y
                    r[2] = q1[3] * q2[2] + q1[0] * q2[1] - q1[1] * q2[0] + q1[2] * q2[3];   // z
                    r[3] = q1[3] * q2[3] - q1[0] * q2[0] - q1[1] * q2[1] - q1[2] * q2[2];   // w

                    return r;
                },

                normalize: vector4.normalize

        };

        Object.defineProperty( quaternion, 'identity', {
            get: function() {
                return Quaternion( [0, 0, 0, 1] );
            },
            enumerable: true
        });

        return quaternion;

    };

});