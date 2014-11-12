'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('AppCtrl', function ($scope, $http, Settings) {

        $http.get(Settings.API_HOST + '/app/me')
            .success(function (res) {
                console.log(res);
            });

    });
