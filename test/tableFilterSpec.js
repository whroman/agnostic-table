var _ = require('lodash');
var assert = require('chai').assert;
var testOptions = require('./testOptions');
var TableClass = require(process.cwd() + '/lib/table.js');

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
        'c': 5
    };

    var table;

    beforeEach(function() {
        table = new TableClass(testOptions);
        table.filter.set({
            all: ['name', 'location', 'country']
        });
    });

    describe('init', function() {

        it('should correctly set all key objects that can be filtered', function() {
            _.each(table.filter.keys, function(key) {
                var exists = _.find(testOptions.keys, {'value': key});
                assert.isDefined(exists);
            });
        });

    });

    describe('.digest()', function() {
        it('should filter rows by table.filter.filters[filterName].value', function() {
            var key, val;
            for (key in expectMap) {
                console.log(table.filter.filters);

                val = expectMap[key];
                table.filter.filters.all.value = key;

                table.digest();
                assert.equal(table.filter.rows.length, val, [key, val]);
            }
        });
    });
});
