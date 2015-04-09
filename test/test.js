'use strict';
/* globals describe, it */
var expect = require('chai').expect;
var dssParserVariable = require('../');
var dss = require('dss');


describe('dss-variable-parser', function() {

    it('should parse name, value and description from @variable', function(done) {
        var css = '/**\n * @variable blue - Sky blue\n */\n$blue: #0000FF;\n';
        dss.parser('variable', dssParserVariable());
        dss.parse(css, {}, function(parsedDss) {
            expect(parsedDss.blocks[0].variable.name).to.equal('blue');
            expect(parsedDss.blocks[0].variable.value).to.equal('#0000FF');
            expect(parsedDss.blocks[0].variable.description).to.equal('Sky blue');
            done();
        });
    });

    it('should parse multiples @variable into an array', function(done) {
        var css = '/**\n * @variable blue - Sky blue\n  * @variable red\n*/\n$blue: #0000FF;\n$red: #FF0000;\n';
        dss.parser('variable', dssParserVariable());
        dss.parse(css, {}, function(parsedDss) {
            expect(parsedDss.blocks[0].variable[0].name).to.equal('blue');
            expect(parsedDss.blocks[0].variable[0].value).to.equal('#0000FF');
            expect(parsedDss.blocks[0].variable[0].description).to.equal('Sky blue');
            expect(parsedDss.blocks[0].variable[1].name).to.equal('red');
            expect(parsedDss.blocks[0].variable[1].value).to.equal('#FF0000');
            expect(parsedDss.blocks[0].variable[1].description).to.equal('');
            done();
        });
    });

    it('should ignore @variable if not defined', function(done) {
        var css = '/**\n * @variable blue - Sky blue\n  * @variable red\n*/\n$red: #FF0000;\n';
        dss.parser('variable', dssParserVariable());

        dss.parse(css, {}, function(parsedDss) {
            expect(parsedDss.blocks[0].variable.name).to.equal('red');
            expect(parsedDss.blocks[0].variable.value).to.equal('#FF0000');
            done();
        });
    });

    it('should parse LESS @variable syntax', function(done) {
        var css = '/**\n * @variable blue - Sky blue\n */\n@blue: #0000FF;\n';
        dss.parser('variable', dssParserVariable());
        dss.parse(css, {}, function(parsedDss) {
            expect(parsedDss.blocks[0].variable.name).to.equal('blue');
            expect(parsedDss.blocks[0].variable.value).to.equal('#0000FF');
            expect(parsedDss.blocks[0].variable.description).to.equal('Sky blue');
            done();
        });
    });

    it('should allow name and description to be space separated', function(done) {
        var css = '/**\n * @variable blue Sky blue\n */\n$blue: #0000FF;\n';
        dss.parser('variable', dssParserVariable());
        dss.parse(css, {}, function(parsedDss) {
            expect(parsedDss.blocks[0].variable.name).to.equal('blue');
            expect(parsedDss.blocks[0].variable.value).to.equal('#0000FF');
            expect(parsedDss.blocks[0].variable.description).to.equal('Sky blue');
            done();
        });
    });

    it('should allow hyphens in descriptions', function(done) {
        var css = '/**\n * @variable blue Sky blue - my favourite colour\n */\n$blue: #0000FF;\n';
        dss.parser('variable', dssParserVariable());
        dss.parse(css, {}, function(parsedDss) {
            expect(parsedDss.blocks[0].variable.name).to.equal('blue');
            expect(parsedDss.blocks[0].variable.value).to.equal('#0000FF');
            expect(parsedDss.blocks[0].variable.description).to.equal('Sky blue - my favourite colour');
            done();
        });
    });

    it('should allow space separation of name/description with hyphens in descriptions', function(done) {
        var css = '/**\n * @variable blue - Sky blue - my favourite colour\n */\n$blue: #0000FF;\n';
        dss.parser('variable', dssParserVariable());
        dss.parse(css, {}, function(parsedDss) {
            expect(parsedDss.blocks[0].variable.name).to.equal('blue');
            expect(parsedDss.blocks[0].variable.value).to.equal('#0000FF');
            expect(parsedDss.blocks[0].variable.description).to.equal('Sky blue - my favourite colour');
            done();
        });
    });

    it('should allow hyphens in variable names', function(done) {
        var css = '/**\n * @variable sky-blue - Sky blue\n */\n$sky-blue: #0000FF;\n';
        dss.parser('variable', dssParserVariable());
        dss.parse(css, {}, function(parsedDss) {
            expect(parsedDss.blocks[0].variable.name).to.equal('sky-blue');
            expect(parsedDss.blocks[0].variable.value).to.equal('#0000FF');
            expect(parsedDss.blocks[0].variable.description).to.equal('Sky blue');
            done();
        });
    });

});
