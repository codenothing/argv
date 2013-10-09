var munit = global.munit = require( 'munit' );

// Only stop test suite when running make test
if ( ! process.env.NODE_TEST_NO_SKIP ) {
	munit.defaults.settings.stopOnFail = true;
}

// Render all tests
munit.render( __dirname + '/../test/', {
	results: __dirname + '/results/'
});
