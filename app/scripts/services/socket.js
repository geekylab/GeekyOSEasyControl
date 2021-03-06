'use strict';

/**
 * @ngdoc service
 * @name clientApp.socket
 * @description
 * # socket
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('socket', function ($rootScope) {
        var socket = io.connect('127.0.0.1:3000/admin');
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });

                });
            },
            socket: socket
        };
    });
