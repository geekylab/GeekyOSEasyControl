'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('AppCtrl', function ($scope, $http, Settings, $timeout) {
        $scope.initialized = true;
        //$http.get(Settings.API_HOST + '/app/me')
        //    .success(function (res) {
        //        $timeout(function () {
        //            $scope.initialized = true;
        //        }, 3000);
        //    })
        //    .error(function () {
        //        $scope.initialized = true;
        //    });
    });
