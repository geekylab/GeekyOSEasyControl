'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('SettingsCtrl', function ($scope) {


        $scope.save = function () {

        };

        $scope.settings = [
            {
                label: 'ApiServerUrl',
                value: 'http://127.0.0.1:3000',
                icon: 'fa fa-info-circle'
            }
        ];

        $scope.getSettingClass = function (icon) {
            var classNames = {};
            if (icon) {
                classNames[icon] = true;
                return classNames;
            }
            return null;
        }

    });
