(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
agnosticTable = require('./lib/table.js');
module.exports = agnosticTable;
},{"./lib/table.js":2}],2:[function(require,module,exports){
var tableFilter = require('./tableFilter');
var tableOrder = require('./tableOrder');
var tablePaginate = require('./tablePaginate');

var TableClass = (function () {
    'use strict';

    var Table = function (options) {
        this.rows = {};
        this.rows.all = options.rows;

        this.keys = options.keys;

        this.order = tableOrder.bind(this)();
        this.filter = tableFilter.bind(this)();
        this.paginate = tablePaginate.bind(this)(options.paginate);

        this.digest();
    };

    Table.prototype.digest = function () {
        this.filter.digest();
        this.order.digest();
        this.paginate.digest();
    };

    return Table;
})();

module.exports = TableClass;

},{"./tableFilter":3,"./tableOrder":4,"./tablePaginate":5}],3:[function(require,module,exports){
var filter = function () {
    'use strict';

    var table = this;

    var _filter = {};
    _filter.value = '';
    _filter.rows = [];

    _filter.filters = {};

    _filter.set = function (filters) {
        for (var filterKey in filters) {
            this.filters[filterKey] = {
                value: '',
                whiteList: filters[filterKey]
            };
        }

        return this;
    };

    _filter.onValChange = function () {
        table.paginate.currentPage = 0;
        table.digest();
    };

    _filter.digest = function () {
        var rows = table.rows.all.slice();
        var filterName, currentFilter, filteredRows;

        var _filterRows = function (row) {
            var include = false;

            // Create version of row that only contains properties listed in the `currentFilter.whiteList` Array
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

},{}],4:[function(require,module,exports){
var order = function () {
    'use strict';

    var table = this;
    var _order = {};
    _order.value = null;
    _order.latestInput = null;
    _order.reverse = false;
    _order.rows = [];
    _order.set = function (key) {
        this.latestInput = key;
        var doubleQuotedKey = '\'' + key + '\'';

        // If this is the second time in a row that this column header is clicked
        if (this.value === doubleQuotedKey) {
            this.reverse = !this.reverse;
        } else {
            this.value = doubleQuotedKey;
        }

        table.digest();
        return this;
    };

    _order.digest = function () {
        var rows = table.filter.rows.sort(function (a, b) {
            if (a[this.latestInput] < b[this.latestInput]) {
                return -1;
            }

            if (a[this.latestInput] > b[this.latestInput]) {
                return 1;
            }

            return 0;
        }.bind(this));

        if (this.reverse) {
            rows.reverse();
        }

        this.rows = rows;
    };

    return _order;
};

module.exports = order;

},{}],5:[function(require,module,exports){
var paginate = function (options) {
    'use strict';

    var table = this;

    var _paginate = {};

    _paginate.disabled = true;

    _paginate.currentPage = 0;
    _paginate.firstRow = 0;
    _paginate.maxRows = 10;
    _paginate.numOfPages = 0;
    _paginate.rows = [];

    if (options !== undefined && options.maxRows !== undefined) {
        _paginate.maxRows = options.maxRows;
    }

    // Total number of pages for current set of queried data
    var determineNumOfPages = function () {
        var pages = Math.ceil(table.order.rows.length / this.maxRows);
        return pages;
    };

    // `shouldNavBeDisabled` returns `true` if view's `previous` and `next` buttons should be disabled
    var shouldNavBeDisabled = function () {
        var shouldBeDisabled = this.numOfPages <= 1;
        return shouldBeDisabled;
    };

    _paginate.digest = function () {
        this.numOfPages = determineNumOfPages.bind(this)();
        this.disabled = shouldNavBeDisabled.bind(this)();
        this.firstRow = this.currentPage * this.maxRows;

        this.rows = table.order.rows.slice(this.firstRow, this.firstRow + this.maxRows);
    };

    _paginate.displayCurrent = function () {
        if (this.numOfPages === 0) {
            return 0;
        }
        var page = this.currentPage + 1;
        // if (page <= 0) page = this.numOfPages + page;
        return page;
    };

    // Go back one page
    _paginate.previous = function () {
        if (this.currentPage > 0) {
            this.currentPage -= 1;
        } else {
            this.currentPage = this.numOfPages - 1;
        }

        table.digest();
    };

    // Go forward one page
    _paginate.next = function () {
        if (this.currentPage < this.numOfPages - 1) {
            this.currentPage += 1;
        } else {
            this.currentPage = 0;
        }


        table.digest();
    };

    return _paginate;
};

module.exports = paginate;

},{}]},{},[1]);
