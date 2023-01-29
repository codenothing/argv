[![NPM version](https://badge.fury.io/js/argv.png)](http://badge.fury.io/js/argv) ![Test Runner](https://github.com/codenothing/argv/actions/workflows/main.yml/badge.svg) [![Code Climate](https://codeclimate.com/github/codenothing/argv.png)](https://codeclimate.com/github/codenothing/argv)

# argv

`argv` is a simple, zero dependency, command line argument parser for NodeJS. For a more feature-full CLI parser, checkout [Commander.js](https://www.npmjs.com/package/commander) or [Yargs](https://www.npmjs.com/package/yargs)

### Installation

```bash
$ npm install argv
```

### Usage

```js
var argv = require( 'argv' );
var args = argv.option( options ).run();
-> { targets: [], options: {} }
```

### Run

Runs the argument parser on the global arguments. Custom arguments array can be used by passing into this method

```js
// Parses default arguments 'process.argv.slice( 2 )'
argv.run();

// Parses array instead
argv.run(["--option=123", "-o", "123"]);
```

### Options

`argv` is a strict argument parser, which means all options must be defined before parsing starts.

```js
argv.option({
  name: "option",
  short: "o",
  type: "string",
  description: "Defines an option for your script",
  example: "'script --option=value' or 'script -o value'",
  onset: function (args) {
    args; // Object of current arguments parsed
  },
});
```

### Modules

Modules are nested commands for more complicated scripts. Each module has it's own set of options that
have to be defined independently of the root options.

```js
argv.mod({
	mod: 'module',
	description: 'Description of what the module is used for',
	options: [ list of options ]
});
```

### Types

Types convert option values to useful JS objects. They are defined along with each option.

- `string`: Ensure values are strings
- `path`: Converts value into a fully resolved path.
- `integer | int`: Converts value into an integer
- `float`: Converts value into a float number
- `boolean | bool`: Converts value into a boolean object. 'true' and '1' are converted to true, everything else is false.
- `csv`: Converts value into an array by splitting on comma's.
- `list`: Allows for option to be defined multiple times, and each value added to an array
- `[list|csv],[type]`: Combo type that allows you to create a list or csv and convert each individual value into a type.

```js
argv.option([
	{
		name: 'option',
		type: 'csv,int'
	},
	{
		name: 'path',
		short: 'p',
		type: 'list,path'
	}
]);

// csv and int combo
$ script --option=123,456.001,789.01
-> option: [ 123, 456, 789 ]

// list and path combo
$ script -p /path/to/file1 -p /path/to/file2
-> option: [ '/path/to/file1', '/path/to/file2' ]
```

You can also create your own custom type for special conversions.

```js
argv.type( 'squared', function( value ) {
	value = parseFloat( value );
	return value * value;
});

argv.option({
	name: 'square',
	short: 's',
	type: 'squared'
});

$ script -s 2
-> 4
```

### Version

Defining the scripts version number will add the version option and print it out when asked.

```js
argv.version( 'v1.0' );

$ script --version
v1.0

```

### Info

Custom information can be displayed at the top of the help printout using this method

```js
argv.info( 'Special script info' );

$ script --help

Special script info

... Rest of Help Doc ...
```

### Clear

If you have competing scripts accessing the `argv` object, you can clear out any previous options that may have been set.

```js
argv.clear().option([new options()]);
```

### Help

`argv` injects a default help option initially and on clears. The help() method triggers the help printout.

```js
argv.help();
```
