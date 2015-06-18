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
