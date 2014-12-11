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
        $scope.notifications = [];
        socket.on("check_table_hash", function (data) {
//            console.log(data);
            if (data.customer.name.family_name && data.table_token) {
                if ($scope.notifications.length > 0) {
                    var idx = -1;
                    for (var i = 0; $scope.notifications.length > i; i++) {
                        var element = $scope.notifications[i];
                        if (
                            element.orderObj &&
                            element.orderObj.order &&
                            element.orderObj.order.order_token &&
                            data.orderObj &&
                            data.orderObj.order &&
                            data.orderObj.order.order_token) {
                            if (element.orderObj.order.order_token == data.orderObj.order.order_token) {
                                idx = i;
                            }
                        }
                    }

                    if (idx === -1) {
                        $scope.notifications.unshift(data);
                    } else {
                        $scope.notifications[idx].orderObj.order.request_count = data.orderObj.order.request_count;
                        if (idx > 0) {
                            var array = $scope.notifications.splice(idx, 1);
                            if (array) {
                                $scope.notifications.splice(0, 0, array[0]);
                            }
                        }
                    }
                } else {
                    $scope.notifications.unshift(data);
                }
            }
        });


    });
