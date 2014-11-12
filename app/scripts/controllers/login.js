'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the clientApp
 */
angular.module('loginApp')
    .controller('LoginCtrl', function ($scope, $http, Settings, $timeout) {

        $scope.initialized = false;
        $scope.initialize = function () {
            var url = Settings.API_HOST + '/me';
            $http.get(url)
                .success(function (response, code) {
                    $scope.initialized = true;
                })
                .error(function (resonse, code) {
                    $scope.initialized = true;
                });
        };

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
                .success(function (data, status, headers, config) {
                    console.log(data);
                    console.log(headers);
//                    location.href = 'index.html';
                }).error(function (data, status, headers, config) {
                    console.log('error');
                    if (status == 401) {
                        angular.forEach(data.messages, function (msg) {
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

        $scope.fbLogin = function () {
            var url = 'http://menu.geekylab.net:8080/auth/connect/facebook';
            var new_win = gui.Window.get(
                window.open(url)
            );

            console.log(new_win);


            //var url = Settings.API_HOST + '/connect/facebook';
            //$http.get(url)
            //    .success(function (data, status, headers, config) {
            //        console.log(data);
            //    }).error(function (data, status, headers, config) {
            //
            //    });
        };

    });
