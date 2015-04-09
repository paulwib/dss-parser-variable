'use strict';

var crypto = require('crypto');

module.exports = dssVariableParser;

/**
 * Get parser to extract "@variable {name} - {description}"
 *
 * @param {object} file - The file to extract the variable values from
 * @return {function} A DSS parser
 */
function dssVariableParser() {

    var fileVariables = {},
        fileVariablesRx = /^[\$|@]([a-zA-Z0-9_-]+):([^\;]+)\;/gim,
        lineSplitRx = /(\s(-\s)?)/,
        variables = {},
        match, hash, tokens, name;

    return function(i, line, block, css) {
        // Extract all defined variables in this CSS file (once per file)
        hash = crypto.createHash('md5').update(css).digest('hex');
        if (!fileVariables[hash]) {
            while ((match = fileVariablesRx.exec(css)) !== null) {
                variables[match[1].trim()] = match[2].trim();
            }
            fileVariables[hash] = variables;
        }

        // Extract variable name and description from comment block
        tokens = line.split(lineSplitRx, 2);
        name = tokens[0].trim();
        if (variables.hasOwnProperty(name)) {
            return {
                name: name,
                // Description is line with variable name and any delimiter replaced
                description: line.replace(tokens.join(''), ''),
                value: variables[name]
            };
        }
    };
}
