var _ = require('lodash');

var Table = (function() {
    var Table = function (options) {
        this.rows = {};
        this.rows.all = options.rows;

        this.keys = options.keys;

        // Create list of keys that filter affects
        var filterKeys = (function() {
            var keys = [];
            _.each(options.keys, function(val) {
                if (val.filter === true) keys.push(val.value);
            });
            return keys;
        })();

        this.order = order.bind(this)();
        this.filter = filter.bind(this)(filterKeys);
        this.paginate = paginate.bind(this)(options.paginate);

        this.digest();
    };

    Table.prototype.digest = function () {
        this.filter.digest();
        this.order.digest();
        this.paginate.digest();
    };

    function filter (keys) {
        var root = this;

        var _filter = {};
        _filter.keys = keys;
        _filter.value = '';
        _filter.rows = [];
        _filter.digest = function () {
            if (this.value === '') {
                this.rows = root.rows.all;
            } else {
                this.rows = _.filter(root.rows.all, function(row) {
                    var include = false;
                    // Create version of row that only contains properties in `filter.keys` list
                    var filterRow = _.pick(row, this.keys);

                    _.each(filterRow, function(rowValue) {
                        rowValue = (rowValue || '').toLowerCase();
                        filterValue = this.value.toLowerCase();
                        include = rowValue.indexOf(filterValue) > -1;
                        if (include) return false;
                    }.bind(this));

                    return include;
                }.bind(this));
            }
        };

        return _filter;
    }

    function order () {
        var root = this;
        var _order = {};
        _order.value =  null;
        _order.latestInput = null;
        _order.reverse = false;
        _order.rows = [];
        _order.set     = function (key) {
            this.latestInput = key;
            doubleQuotedKey = "'" + key + "'";

            // If this is the second time in a row that this column header is clicked
            if (this.value === doubleQuotedKey) {
                this.reverse = !this.reverse;
            } else {
                this.value = doubleQuotedKey;
            }

            root.digest();
            return this;
        };

        _order.digest = function () {
            this.rows = _.sortByOrder(root.filter.rows, [this.latestInput], [!this.reverse]);
        }

        return _order;
    }

    function paginate (options) {
        var root = this;

        var _paginate = {};

        _paginate.disabled = true;

        _paginate.currentPage = 0;
        _paginate.firstRow = 0;
        _paginate.maxRows = options.maxRows || 10;
        _paginate.numOfPages = 0;
        _paginate.rows = [];

        // Total number of pages for current set of queried data
        determineNumOfPages = function() {
            var pages = Math.ceil(root.order.rows.length / this.maxRows);
            return pages;
        };

        // `disableButtons` returns `true` if view's `previous` and `next` buttons should be disabled
        shouldNavBeDisabled = function() {
            var shouldBeDisabled = this.numOfPages <= 1;
            return shouldBeDisabled;
        };

        _paginate.digest = function () {
            this.numOfPages = determineNumOfPages.bind(this)();
            this.disabled = shouldNavBeDisabled.bind(this)();
            this.firstRow = this.currentPage * this.maxRows;

            this.rows = _.slice(root.order.rows, this.firstRow, this.firstRow + this.maxRows);
        };

        _paginate.displayCurrent = function() {
            if (this.numOfPages === 0) return 0;
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

            root.digest();
        };

        // Go forward one page
        _paginate.next = function () {
            if (this.currentPage < this.numOfPages - 1) {
                this.currentPage += 1;
            } else {
                this.currentPage = 0;
            }


            root.digest();
        };

        return _paginate;
    }

    return Table;
})();

module.exports = Table;