'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('AppCtrl', function ($scope, socket, CheckInRequest) {
        $scope.initialized = true;
        $scope.notifications = CheckInRequest.query();

        socket.on("neworder", function (data) {
            console.log("neworder");
        });


        socket.on("request_check_in", function (checkInRequest) {
            console.log("request_check_in", checkInRequest);
            if (checkInRequest.customer.name) {
                console.log("checkInRequest.customer.name", checkInRequest.customer.name);
                if ($scope.notifications.length > 0) {
                    var idx = -1;
                    for (var i = 0; $scope.notifications.length > i; i++) {
                        var element = $scope.notifications[i];
                        if (element.customer._id == checkInRequest.customer._id) {
                            idx = i;
                        }
                    }

                    if (idx === -1) {
                        $scope.notifications.unshift(checkInRequest);
                    } else {
                        $scope.notifications[idx].request_count = checkInRequest.request_count;
                        if (idx > 0) {
                            var array = $scope.notifications.splice(idx, 1);
                            if (array) {
                                $scope.notifications.splice(0, 0, array[0]);
                            }
                        }
                    }
                } else {
                    $scope.notifications.unshift(checkInRequest);
                }
            }
        });


    });
