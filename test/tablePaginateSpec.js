var assert = require('chai').assert;
var testOptions = require('./testOptions');
var TableClass = require(process.cwd() + '/lib/table.js');

describe('Table.paginate', function() {
    var table;

    beforeEach(function() {
        table = new TableClass(testOptions);
    });

    describe('.previous()', function() {

        it('should shift view backwards by one page IF on first page', function() {
            table.paginate.previous();
            assert.equal(table.paginate.currentPage, table.paginate.numOfPages - 1);
        });

        it('should shift view backwards by one page IF not on first page', function() {
            table.paginate.currentPage = 1;
            table.digest();
            table.paginate.previous();
            assert.equal(table.paginate.currentPage, 0);
        });

    });

    describe('.next()', function() {

        it('should shift view forward by one page on first page', function() {
            table.paginate.next();
            assert.equal(table.paginate.currentPage, 1);
        });

        it('should shift view to first page if called while on last page', function() {
            table.paginate.currentPage = table.paginate.numOfPages - 1;
            table.paginate.next();
            assert.equal(table.paginate.currentPage, 0);
        });

    });

    describe('.displayCurrent()', function() {

        it('should return 1 if we are on first page and have rows in table', function() {
            assert.equal(table.paginate.displayCurrent(), 1);
        });

        it('should return 0 if no rows are present in table', function() {
            table.rows.all = [];
            table.digest();
            assert.equal(table.paginate.displayCurrent(), 0);
        });

    });
});
