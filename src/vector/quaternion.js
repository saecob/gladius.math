/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {

        var vector4 = require( './vector4' )( FLOAT_ARRAY_TYPE );
        var vector3 = require( './vector3' )( FLOAT_ARRAY_TYPE );

        var Quaternion = vector4.$;

        var quaternion = {

                $: Quaternion,

                to: {
                    rpy: function( q, result ) {
                        var r = result || vector3.$();
                        var atan2 = Math.atan2,
                            asin = Math.asin;

                        r[0] = atan2( 2*q[0]*q[1] + 2*q[2]*q[3], 1 - 2*q[1]*q[1] + 2*q[2]*q[2] );
                        r[1] = asin( 2*q[0]*q[2] - 2*q[3]*q[1] );
                        r[2] = atan2( 2*q[0]*q[3] + 2*q[1]*q[2], 1 - 2*q[2]*q[2] + 2*q[3]*q[3] );

                        if( !result ) {
                            return r;
                        }
                    }
                },

                from: {
                    rpy: function( v, result ) {
                        var r = result || quaternion.$();
                        var sin = Math.sin,
                            cos = Math.cos;
                        var half_phi = v[0] / 2,
                            half_theta = v[1] / 2,
                            half_psi = v[2] / 2;
                        var sin_half_phi = sin( half_phi ),
                            cos_half_phi = cos( half_phi ),
                            sin_half_theta = sin( half_theta ),
                            cos_half_theta = cos( half_theta ),
                            sin_half_psi = sin( half_psi ),
                            cos_half_psi = cos( half_psi );

                        r[0] = cos_half_phi * cos_half_theta * cos_half_psi + 
                               sin_half_phi * sin_half_theta * sin_half_psi;
                        r[1] = sin_half_phi * cos_half_theta * cos_half_psi -
                               cos_half_phi * sin_half_theta * sin_half_psi;
                        r[2] = cos_half_phi * sin_half_theta * cos_half_psi +
                               sin_half_phi * cos_half_theta * sin_half_psi;
                        r[3] = cos_half_phi * cos_half_theta * sin_half_psi -
                               sin_half_phi * sin_half_theta * cos_half_psi;

                        if( !result ) {
                            return r;
                        }
                    }
                },

                length: vector4.length,

                multiply: function( q1, q2, result ) {
                    var r = result || quaternion.$();

                    r[0] = q1[3] * q2[0] + q1[0] * q2[3] + q1[1] * q2[2] - q1[2] * q2[1];   // x
                    r[1] = q1[3] * q2[1] - q1[0] * q2[2] + q1[1] * q2[3] + q1[2] * q2[0];   // y
                    r[2] = q1[3] * q2[2] + q1[0] * q2[1] - q1[1] * q2[0] + q1[2] * q2[3];   // z
                    r[3] = q1[3] * q2[3] - q1[0] * q2[0] - q1[1] * q2[1] - q1[2] * q2[2];   // w

                    if( !result ) {
                        return r;
                    }
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
