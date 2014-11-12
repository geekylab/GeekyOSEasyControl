'use strict';

/**
 * @ngdoc overview
 * @name clientApp
 * @description
 * # clientApp
 *
 * Main module of the application.
 */
angular
    .module('clientApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'base64',
        'pascalprecht.translate',
        'ui.bootstrap',
        'ui.grid',
        'ui.grid.autoResize',
        'ui.grid.edit',
//        'angular-loading-bar',
        'angularFileUpload',
        'cgBusy'
    ])
    .config(function ($routeProvider, $translateProvider, $httpProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main',
                controller: 'MainCtrl'
            })
            .when('/extensions', {
                templateUrl: 'views/extensions',
                controller: 'ExtensionsCtrl'
            })
            .when('/order', {
                templateUrl: 'views/order',
                controller: 'OrderCtrl'
            })
            .when('/customer', {
                templateUrl: 'views/customer',
                controller: 'CustomerCtrl'
            })
            .when('/customer/:id', {
                templateUrl: 'views/customeredit',
                controller: 'CustomereditCtrl'
            })
            .when('/item', {
                templateUrl: 'views/item',
                controller: 'ItemCtrl'
            })
            .when('/item/:id', {
                templateUrl: 'views/itemedit',
                controller: 'ItemeditCtrl'
            })
            .when('/category', {
                templateUrl: 'views/category',
                controller: 'CategoryCtrl'
            })
            .when('/category/edit/:id', {
                templateUrl: 'views/categoryedit',
                controller: 'CategoryeditCtrl'
            })
            //.when('/table', {
            //    templateUrl: 'views/table.html',
            //    controller: 'TableCtrl'
            //})
            //.when('/table/edit/:id', {
            //    templateUrl: 'views/tableedit.html',
            //    controller: 'TableeditCtrl'
            //})
            .when('/store', {
                templateUrl: 'views/store',
                controller: 'StoreCtrl'
            })
            .when('/store/edit/:id', {
                templateUrl: 'views/storeedit',
                controller: 'StoreeditCtrl'
            })
            .when('/settings', {
                templateUrl: 'views/settings',
                controller: 'SettingsCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });

        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/locale-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('ja');
        $translateProvider.fallbackLanguage('en');
//        $translateProvider.useMissingTranslationHandlerLog();
        $translateProvider.useLocalStorage();

        //$httpProvider.responseInterceptors.push(['$q', '$location', function ($q, $location) {
        //    return function (promise) {
        //        return promise.then(function (response) {
        //                // Success: 成功時はそのまま返す
        //                return response;
        //            }, function (response) {
        //                // Error: エラー時は401エラーならば/loginに遷移
        //                if (response.status === 401) {
        //                    window.location = '/';
        //                }
        //                return $q.reject(response);
        //            }
        //        );
        //    };
        //}]);

    });

var loginApp = angular.module('loginApp', []);