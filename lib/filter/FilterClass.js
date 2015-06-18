var FilterClass = (function() {
    'use strict';

    var Filter = function (whiteList) {
        this.value = '';
        this.whiteList = whiteList;
    };

    Filter.prototype.filter = function (row) {
        var include = false;

        // Create version of row that only contains properties listed in the `currentFilter.whiteList` Array
        var filteredRow = {};
        var whiteListedKeysIndex = this.whiteList.length;
        var key;
        while (whiteListedKeysIndex--) {
            key = this.whiteList[whiteListedKeysIndex];
            filteredRow[key] = row[key];
        }

        // Check whether the row's whitelisted properties hold values that pass filter
        var propName;
        for (propName in filteredRow) {
            var rowValue = filteredRow[propName];
            rowValue = (rowValue || '').toLowerCase();
            var filterValue = this.value.toLowerCase();
            include = rowValue.indexOf(filterValue) > -1;
            if (include === true) {
                break;
            }
        }

        return include;
    };

    return Filter;
})();

module.exports = FilterClass;
