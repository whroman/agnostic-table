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
            filter: true
        },
        {
            display: 'Location',
            value: 'location',
            filter: true
        },
        {
            display: 'Country',
            value: 'country',
            filter: true
        },
        {
            display: 'Links',
            value: 'links'
        }
    ];

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