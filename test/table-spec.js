var _ = require('lodash');
var assert = require('chai').assert;
var TableClass = require(process.cwd() + '/lib/table.js');

var options = {};
options.paginate = {};
options.paginate.maxRows = 4;
options.rows = [
    {
        name: 'aaa',
        location: 'bbb',
        country: 'ccc'
    },
    {
        name: 'aaa',
        location: 'aab',
        country: 'aac'
    },
    {
        name: 'bba',
        location: 'bbb',
        country: 'bbc'
    },
    {
        name: 'cca',
        location: 'ccb',
        country: undefined
    },
    {
        name: 'aca',
        location: 'aba',
        country: '1c'
    }
];
options.keys = [
    {
        display: 'Name',
        value: 'name',
        filter: true
    },
    {
        display: 'Location',
        value: 'location',
        filter: true
    },
    {
        display: 'Country',
        value: 'country',
        filter: true
    },
    {
        display: 'Links',
        value: 'links'
    }
];


describe('Table', function() {
    var table;

    beforeEach(function() {
        table = new TableClass(options);
    });

    describe('initialization', function() {

        it('should correctly set all given rows', function() {
            assert.equal(table.rows.all.length, options.rows.length);
        });

        it('should correctly set all given keys', function() {
            assert.equal(table.keys.length, options.keys.length);
        });

        it('should correctly set all key objects that can be filtered', function() {
            _.each(table.filter.keys, function(key) {
                var exists = _.find(options.keys, {'value': key});
                assert.isDefined(exists);
            });
        });
    });
});


describe('Table.paginate', function() {
    var table;

    beforeEach(function() {
        table = new TableClass(options);
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

describe('Table.order', function() {
    var table;

    beforeEach(function() {
        table = new TableClass(options);
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

describe('Table.filter', function() {
    var expectMap = {
        // 'a': 5,
        '1c': 1,
        '!!!!!': 0,
        'aaa': 2,
        'bbb': 2,
        'ccc': 1,
        'a': 5,
        'b': 5,
        'c': 5,
    };

    var table;

    beforeEach(function() {
        table = new TableClass(options);
    });

    describe('.digest()', function() {
        it('should filter rows by table.filter.value', function() {
            var key, val;
            for (key in expectMap) {
                val = expectMap[key];
                table.filter.value = key;
                table.digest();
                assert.equal(table.filter.rows.length, val, [key, val]);
            }
        });
    });
});