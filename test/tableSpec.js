/*eslint-env node, mocha */

var assert = require('chai').assert;
var testOptions = require('./testOptions');
var TableClass = require(process.cwd() + '/lib/table.js');

describe('Table', function() {
    var table;

    beforeEach(function() {
        table = new TableClass(testOptions);
    });

    describe('init', function() {

        it('should correctly set all given rows', function() {
            assert.equal(table.rows.all.length, testOptions.rows.length);
        });

        it('should correctly set all given keys', function() {
            assert.equal(table.keys.length, testOptions.keys.length);
        });

    });
});
