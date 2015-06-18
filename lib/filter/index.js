var FilterClass = require('./FilterClass.js');

var filter = function () {
    'use strict';

    var table = this;

    var _filter = {};
    _filter.rows = [];

    _filter.set = function (filterWhiteList) {
        var filterKey;
        for (filterKey in filterWhiteList) {
            table.filters[filterKey] = new FilterClass(filterWhiteList[filterKey]);
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

        for (filterName in table.filters) {
            currentFilter = table.filters[filterName];
            rows = rows.filter(currentFilter.filter.bind(currentFilter));
        }

        this.rows = rows;
    };

    return _filter;
};

module.exports = filter;
