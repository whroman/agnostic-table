var filter = function (filters) {
    'use strict';

    var table = this;

    var _filter = {};
    _filter.value = '';
    _filter.rows = [];

    _filter.filters = {};
    for (var filterKey in filters) {
        _filter.filters[filterKey] = {
            value: '',
            whiteList: filters[filterKey]
        };
    }

    /*
     _filter.keys = [String]

    Each item is the name of a property that each row object should contain.
    When the table rows are filtered, `_filter.value` will only look for the value in
        the property names listed here.
    */
    _filter.keys = [];
    var filterIndex, filterObj;
    for (filterIndex in filters) {
        filterObj = filters[filterIndex];
        if (filterObj.filter === true) {
            _filter.keys.unshift(filterObj.value);
        }
    }



    _filter.onValChange = function () {
        table.paginate.currentPage = 0;
        table.digest();
    };

    _filter.digest = function () {
        var rows = table.rows.all.slice();
        var filterName, currentFilter, filteredRows;

        var _filterRows = function (row) {
            var include = false;

            // Create version of row that only contains properties in `filter.keys` list
            var filteredRow = {};
            var whiteListedKeysIndex = currentFilter.whiteList.length;
            var key;
            while (whiteListedKeysIndex--) {
                key = currentFilter.whiteList[whiteListedKeysIndex];
                filteredRow[key] = row[key];
            }

            // Check whether the row's whitelisted properties hold values that pass filter
            var propName;
            for (propName in filteredRow) {
                var rowValue = filteredRow[propName];
                rowValue = (rowValue || '').toLowerCase();
                var filterValue = currentFilter.value.toLowerCase();
                include = rowValue.indexOf(filterValue) > -1;
                if (include === true) {
                    break;
                }
            }

            return include;
        };

        for (filterName in this.filters) {
            currentFilter = this.filters[filterName];
            filteredRows = rows.filter(_filterRows.bind(this));

            rows = filteredRows;
        }

        this.rows = rows;
    };

    return _filter;
};

module.exports = filter;
