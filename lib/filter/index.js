var FilterClass = require('./FilterClass.js');

var filter = function () {
    'use strict';

    var table = this;

    var _filter = {};
    _filter.rows = [];

    _filter.filters = {};

    _filter.set = function (filters) {
        var filterKey;
        for (filterKey in filters) {
            this.filters[filterKey] = new FilterClass(filters[filterKey]);
        }

        return this;
    };

    _filter.onValChange = function () {
        table.paginate.currentPage = 0;
        table.digest();
    };

    _filter.digest = function () {
        var rows = table.rows.all.slice();
        var filterName, currentFilter;

        for (filterName in this.filters) {
            currentFilter = this.filters[filterName];
            rows = rows.filter(currentFilter.filter.bind(currentFilter));
        }

        this.rows = rows;
    };

    return _filter;
};

module.exports = filter;