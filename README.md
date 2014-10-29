dss-parser-variable  [![NPM version][npm-image]][npm-url] [![Dependency Status][depstat-image]][depstat-url] [![Build Status][travis-image]][travis-url]
===

A `@variable` parser for documenting SCSS/LESS variables from [Documented Style Sheets][] (DSS).

## Usage

```css
/**
 * @name Colours
 * @variable blue - Sky blue
 * @variable red
 */
$blue: #0000FF;
$red: #FF0000;
$black: #000000;
```

```javascript
var dss = require('dss');
var variableParser = require('dss-parser-variable');

dss.parser('variable', variableParser());

var lines = fs.readFileSync('styles.css'),
    options = {},
    callback = function(parsed){
      console.log(parsed);
    };

dss.parse(lines, options, callback);
```

Will output:

```javascript
{
    blocks: [{
        name: 'Colours',
        variable: [
            { name: 'blue', description: 'Sky blue', value: '#0000FF' },
            { name: 'red', description: '', value: '#FF0000' }
        ]
    }]
}

```

[Documented Style Sheets]:https://github.com/darcyclarke/DSS

[npm-url]: https://npmjs.org/package/dss-parser-variable
[npm-image]: http://img.shields.io/npm/v/dss-parser-variable.svg?style=flat

[depstat-url]: https://david-dm.org/paulwib/dss-parser-variable
[depstat-image]: https://david-dm.org/paulwib/dss-parser-variable.svg?style=flat

[travis-image]: http://img.shields.io/travis/paulwib/dss-parser-variable/master.svg?style=flat
[travis-url]: https://travis-ci.org/paulwib/dss-parser-variable


