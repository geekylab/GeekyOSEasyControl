'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:ToolbarCtrl
 * @description
 * # ToolbarCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('ToolbarCtrl', function ($scope,
                                         alertService,
                                         $rootScope,
                                         $http,
                                         $translate,
                                         socket
                                         //                                 User
        ) {

        $scope.connected = socket.socket.connected;

        $rootScope.closeAlert = alertService.closeAlert;
        $scope.$watch('connected', function (newVal, oldVal) {

        });

        socket.on('connect', function () {
            $scope.connected = socket.socket.connected;
            socket.on('notice',
                function () {
                    console.log('notice');
                });
        });

        socket.on('disconnect', function () {
            $scope.connected = socket.socket.connected;
        });


        $scope.isConn = function () {
            return {
                'conn': $scope.connected
            };
        };

        $scope.languages = {
            selected: {},
            lang: {
                'en': {
                    flag: 'us',
                    code: 'en',
                    label: 'English'
                },
                'ja': {
                    flag: 'jp',
                    code: 'ja',
                    label: 'Japanese'
                }
            }

        };
        //
        var current = $translate.use();
        if ($scope.languages.lang[current] == undefined) {
            $scope.languages.selected = $scope.languages.lang['en'];
        } else {
            $scope.languages.selected = $scope.languages.lang[current];

        }

        $scope.changeLang = function (lng) {
            if ($scope.languages.lang[lng] != undefined) {
                $scope.languages.selected = $scope.languages.lang[lng];
                $translate.use(lng.toLowerCase());
            }
        }


    });
