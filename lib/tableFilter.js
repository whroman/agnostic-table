var _ = require('lodash');

var filter = function (keys) {
    'use strict';

    var table = this;

    var _filter = {};
    _filter.value = '';
    _filter.rows = [];

    /*
     _filter.keys = [String]

    Each item is the name of a property that each row object should contain.
    When the table rows are filtered, `_filter.value` will only look for the value in
        the property names listed here.
    */
    _filter.keys = [];

    var keysIndex = keys.length;
    while (keysIndex--) {
        var keyObj = keys[keysIndex];
        if (keyObj.filter === true) {
            _filter.keys.unshift(keyObj.value);
        }
    }


    _filter.onValChange = function () {
        table.paginate.currentPage = 0;
        table.digest();
    };

    _filter.digest = function () {
        if (this.value === '') {
            this.rows = table.rows.all;
        } else {
            this.rows = table.rows.all.filter(function (row) {
                var include = false;
                // Create version of row that only contains properties in `filter.keys` list
                var filterRow = _.pick(row, this.keys);

                var propName;
                for (propName in filterRow) {
                    var rowValue = filterRow[propName];
                    rowValue = (rowValue || '').toLowerCase();
                    var filterValue = this.value.toLowerCase();
                    include = rowValue.indexOf(filterValue) > -1;
                    if (include) {
                        break;
                    }
                }

                return include;
            }.bind(this));
        }
    };

    return _filter;
};

module.exports = filter;
