global.munit = require( 'munit' );
global.argv = require( '../' );

// Render all tests
munit.render( __dirname + '/../test/', {
	junit: __dirname + '/results/',
	junitPrefix: process.version.replace( /\./g, '_' )
});
