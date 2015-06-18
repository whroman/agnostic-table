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
