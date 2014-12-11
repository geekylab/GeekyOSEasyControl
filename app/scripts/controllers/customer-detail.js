'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CustomerCtrl
 * @description
 * # CustomerCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('CustomerDetailCtrl', function ($scope, $routeParams, Customers) {
        $scope.enity = null;
        if ($routeParams.id) {
            $scope.myPromise = $scope.enity = Customers.get({id: $routeParams.id});
        }
    });
