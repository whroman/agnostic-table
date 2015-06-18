var tableFilter = require('./filter');
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
