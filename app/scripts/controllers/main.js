'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('MainCtrl', function ($scope,
                                      $http,
                                      socket) {
        $scope.datas = {};

        socket.on("check_table_hash", function (data) {
            if (data.customer.name.family_name && data.table_token) {
                alert(data.customer.name.family_name + " : " + data.table_token);
            }
        });

        //$http.get('/api/dashboard/index').then(function (json) {
        //    if (json.data) {
        //        $scope.datas = json.data;
        //    }
        //});
    });
