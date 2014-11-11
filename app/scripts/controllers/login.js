'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('loginApp')
    .controller('LoginCtrl', function ($scope) {

        $scope.forms = {
            'loginForm': true,
            'forgetForm': false,
            'registerForm': false
        }


    });
