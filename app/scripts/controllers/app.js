'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('AppCtrl', function ($scope, User, $cookies) {
        $scope.initialized = true;

        //var userPromise = User.me();
        //
        //userPromise.then(function (data) {
        //    console.log(data);
        //}, function (reason) {
        //    console.log(reason);
        //}, function (update) {
        //    console.log('Got notification: ' + update);
        //});


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
