var assert = require('chai').assert;
var testOptions = require('./testOptions');
var TableClass = require(process.cwd() + '/lib/table.js');

describe('Table.order', function() {
    var table;

    beforeEach(function() {
        table = new TableClass(testOptions);
    });

    describe('.set(value)', function() {

        it('should order by given `value` from 1-9, a-z', function() {
            table.order.set('name');
            assert.equal(table.order.rows[0].name, 'aaa');
            assert.equal(table.order.rows[table.order.rows.length - 1].name, 'cca');
        });

        it('should order by `value` in reverse if same `value` is passed into `.set(value)` twice in a row', function() {
            table.order.set('name');
            table.order.set('name');
            assert.equal(table.order.rows[0].name, 'cca');
            assert.equal(table.order.rows[table.order.rows.length - 1].name, 'aaa');
        });

    });
});
