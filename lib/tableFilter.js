var _ = require('lodash');

var filter = function (keys) {
    'use strict';

    var table = this;

    var _filter = {};
    _filter.value = '';
    _filter.rows = [];

    /*
     _.filter.keys = [String]

    Each item is the name of a property that each row object should contain.
    When the table rows are filtered, `_filter.value` will only look for the value in
        the property names listed here.
    */
    _filter.keys = [];
    _.each(keys, function (keyObj) {
        if (keyObj.filter === true) {
            _filter.keys.push(keyObj.value);
        }
    });

    _filter.onValChange = function () {
        table.paginate.currentPage = 0;
        table.digest();
    };

    _filter.digest = function () {
        if (this.value === '') {
            this.rows = table.rows.all;
        } else {
            this.rows = _.filter(table.rows.all, function (row) {
                var include = false;
                // Create version of row that only contains properties in `filter.keys` list
                var filterRow = _.pick(row, this.keys);

                _.each(filterRow, function (rowValue) {
                    rowValue = (rowValue || '').toLowerCase();
                    var filterValue = this.value.toLowerCase();
                    include = rowValue.indexOf(filterValue) > -1;
                    if (include) {
                        return false;
                    }
                }.bind(this));

                return include;
            }.bind(this));
        }
    };

    return _filter;
};

module.exports = filter;
