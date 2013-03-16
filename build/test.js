global.MUnit = require( 'munit' );
global.argv = require( '../' );

// Render all tests
MUnit.render( __dirname + '/../test/' );
