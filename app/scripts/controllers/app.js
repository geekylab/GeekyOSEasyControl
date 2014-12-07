'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('AppCtrl', function ($scope, socket) {
        $scope.initialized = true;
        socket.on("check_table_hash", function (data) {
            if (data.customer.name.family_name && data.table_token) {
                alert(data.customer.name.family_name + " : " + data.table_token);
            }
        });
    });
