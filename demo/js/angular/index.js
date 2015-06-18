var angular = require('angular');
var agnosticTable = require('./../../../index.js');
var teams = require('./../teams.js');

angular.module('ControllerTeamsList', [])
.controller('ControllerTeamsList', function(
// Dependency Injections
    $scope,
    $window
){
    var tableData = {};
    // Data to be displayed in table. Should be an Array.
    tableData.rows = teams;


    tableData.keys = [
        {
            display: 'Name',
            value: 'name'
        },
        {
            display: 'Location',
            value: 'location'
        },
        {
            display: 'Country',
            value: 'country'
        }
    ];

    $scope.table = new agnosticTable(tableData);

    // Defining filters
    $scope.table.filter.set({
        all: ['name', 'location', 'country'],
        name: ['name'],
        location: ['location'],
        country: ['country']
    });

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