'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:CustomerCtrl
 * @description
 * # CustomerCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('CustomerDetailCtrl', function ($scope) {
        $scope.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
