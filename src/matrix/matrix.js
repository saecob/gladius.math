/*jshint white: false, strict: false, plusplus: false, onevar: false,
  nomen: false */
/*global define: false, console: false, window: false, setTimeout: false */

define( function ( require ) {

    return function( FLOAT_ARRAY_TYPE ) {
      
        var Matrix = function( dim, args ) {
        
            var elements = null;
            if( 1 === args.length ) {
                elements = args[0];
            } else {
                elements = args;
            }
            
            var matrix = new FLOAT_ARRAY_TYPE( dim );
            for( var i = 0; i < dim; ++ i ) {
                matrix[i] = elements[i];
            }
            
            return matrix;
            
        };
        
        var matrix = {
                
            $: Matrix,
      
            add: function( m1, m2, result ) {
                for( var i = 0; i < m1.length; ++ i ) {
                    result[i] += m1[i] + m2[i];
                }

                return result;
            },
            
            subtract: function( m1, m2, result ) {
                for( var i = 0; i < m1.length; ++ i ) {
                    m1[i] -= m2[i];
                }
                return m1;
            },
            
            clear: function( m ) {
                for( var i = 0; i < m.length; ++ i ) {
                    m[i] = 0;
                }
            },
            
            equal: function( m1, m2, e ) {
                e = e || 0.000001;

                if( m1.length != m2.length ) {
                    return false;
                }
                
                var dim = m1.length;
                for( var i = 0; i < dim; ++ i ) {
                    if( Math.abs( m1[i] - m2[i] ) > e ) {
                        return false;
                    }
                }

                return true;
            }
                
        };
        
        return matrix;
        
    };
    
});
