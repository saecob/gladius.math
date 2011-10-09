/*jshint white: false, strict: false, plusplus: false, nomen: false */
/*global define: false, console: false, window: false */

define( function ( require ) {
    var lang = require( './lang' ),
        Implementation = require( './Math' ),

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

        // Fetch the subsystems. These can potentially be async operations.
        // In a build, they are async, but do not result in any network
        // requests for the subsystems bundled in the build.
        require([], lang.bind(this, function () {

            lang.extend( this, new Implementation() );

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
