'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('loginApp')
    .controller('LoginCtrl', function ($scope, $http, Settings) {

        $scope.forms = {
            'loginForm': true,
            'forgetForm': false,
            'registerForm': false
        };

        $scope.loginFormInput = {
            username: '',
            password: ''
        };

        $scope.registerFormInput = {
            fullname: '',
            username: '',
            password: ''
        };

        $scope.formErrorMessage = [];

        $scope.formErrorClasses = function () {
            return {
                'display-hide': $scope.formErrorMessage.length == 0
            };
        };

        $scope.createAnAccount = function () {
            $scope.forms.loginForm = false;
            $scope.forms.forgetForm = false;
            $scope.forms.registerForm = true;
        };

        $scope.resetFormDisplay = function () {
            console.log("resetFormDisplay");
            $scope.forms.loginForm = true;
            $scope.forms.forgetForm = false;
            $scope.forms.registerForm = false;

        };


        $scope.login = function () {
            var url = Settings.API_HOST + '/login';
            $scope.formErrorMessage = [];
            $http.post(url, $scope.loginFormInput)
                .success(function (res) {
                    location.href = 'index.html';
                }).error(function (res, code) {
                    console.log('error');
                    if (code == 401) {
                        angular.forEach(res.messages, function (msg) {
                            $scope.formErrorMessage.push(msg);
                        });
                    }
                    console.log(res);
                });
        };

        $scope.registerForm = function () {
            var url = Settings.API_HOST + '/signup';
            $scope.formErrorMessage = [];
            $http.post(url, $scope.registerFormInput)
                .success(function (res) {
                    location.href = 'index.html';
                }).error(function (res, code) {
                    console.log('error');
                    angular.forEach(res.messages, function (msg) {
                        $scope.formErrorMessage.push(msg);
                    });
                    console.log(res);
                });
        };

    });
