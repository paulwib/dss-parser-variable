dss-parser-variable  [![NPM version][npm-image]][npm-url] [![Dependency Status][depstat-image]][depstat-url] [![Build Status][travis-image]][travis-url]
===

A `@variable` parser for documenting SCSS/LESS variables from [Documented Style Sheets][] (DSS).

## Usage

In a file `test.scss`:

```css
/**
 * @name Colours
 * @variable white
 * @variable blue - Sky blue
 * @variable dark-red Button outlines
 */
$blue: #0000FF;
$dark-red: #FF0000;
$black: #000000;
```

In JavaScript:

```javascript
var fs = require('fs'),
    dss = require('dss'),
    variableParser = require('dss-parser-variable');

dss.parser('variable', variableParser());

var scss = fs.readFileSync('test.scss'),
    options = {},
    callback = function(parsed){
      console.log(JSON.stringify(parsed, true, 4));
    };

dss.parse(scss, options, callback);
```

Will output:

```json
{
    "blocks": [{
        "name": "Colours",
        "variable": [
            { "name": "blue", "description": "Sky blue", "value": "#0000FF" },
            { "name": "dark-red", "description": "Button outlines", "value": "#FF0000" }
        ]
    }]
}

```

Note there is no entry for `white` because the variable does not exist in the file, and there is no entry for `black` because there is no description in the DSS block.
If you pass `true` flag to the constructor it will include variables that does not exist in the file, i.e. there would be entry for a `white` in output.

[Documented Style Sheets]:https://github.com/darcyclarke/DSS

[npm-url]: https://npmjs.org/package/dss-parser-variable
[npm-image]: http://img.shields.io/npm/v/dss-parser-variable.svg?style=flat

[depstat-url]: https://david-dm.org/paulwib/dss-parser-variable
[depstat-image]: https://david-dm.org/paulwib/dss-parser-variable.svg?style=flat

[travis-image]: http://img.shields.io/travis/paulwib/dss-parser-variable/master.svg?style=flat
[travis-url]: https://travis-ci.org/paulwib/dss-parser-variable


