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
        this.filters = {};
        this.filter = tableFilter.bind(this)();
        this.paginate = tablePaginate.bind(this)(options.paginate);

        /*
            istanbul ignore else

            We do not want to take any actions if user did not provide us
                with filters upon initializiation. Filters may be added
                after init using `table.filter.set`
        */
        if (options !== undefined && options.filters !== undefined) {
            this.filter.set(options.filters);
        }

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
