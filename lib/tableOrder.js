var _ = require('lodash');

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
        this.rows = _.sortByOrder(table.filter.rows, [this.latestInput], [!this.reverse]);
    };

    return _order;
};

module.exports = order;
