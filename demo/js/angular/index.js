var angular = require('angular');
var agnosticTable = require('./../../../index.js');
var teams = require('./../teams.js');

angular.module('ControllerTeamsList', [])
.controller('ControllerTeamsList', function(
// Dependency Injections
    $scope,
    $window
){
    var tableOptions = {};
    tableOptions.rows = teams;
    tableOptions.keys = [
        {
            display: 'Name',
            value: 'name',
        },
        {
            display: 'Location',
            value: 'location',
        },
        {
            display: 'Country',
            value: 'country',
        }
    ];
    tableOptions.filters = {};
    tableOptions.filters.all = ['name', 'location', 'country'];
    tableOptions.filters.name = ['name'];
    tableOptions.filters.location = ['location'];
    tableOptions.filters.country = ['country'];

    $scope.table = new agnosticTable(tableOptions);
    $scope.table.order.set('country');

    $scope.typeOf = function(input) {
        return typeof input;
    };

    // Dev
    $window.logScope = function () {
        $window.$scope = $scope;
        console.log($scope);
    };
});