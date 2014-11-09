'use strict';

/**
 * @ngdoc service
 * @name clientApp.DockerApi
 * @description
 * # DockerApi
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('DockerApi', function ($http) {
        var host = 'localhost';
        var port = 12375;

        // Public API here
        return {
            setHost: function (val) {
                host = val;
            },
            getHost: function () {
                return host;
            },
            getRequestHost: function () {
                return 'http://' + this.getHost() + ':' + port;
            },
            getApiUrl: function (path) {
                return this.getRequestHost() + path;
            },
            getRequest: function (url) {
                return $http.get(url);
            },
            postRequest: function (url, params) {
                return $http.post(url, params);
            },
            listContainers: function () {
                var path = '/containers/json?all=1';
                return this.getRequest(this.getApiUrl(path));
            },
            startContainer: function (id, params) {
                var path = '/containers/' + id + '/start';
                return this.postRequest(this.getApiUrl(path), params);
            },
            stopContainer: function (id, params) {
                var path = '/containers/' + id + '/stop';
                return this.postRequest(this.getApiUrl(path), params);
            },
            logsContainer: function (id, params) {
                var path = '/containers/' + id + '/logs?stderr=1&stdout=1&timestamps=1&follow=0';
                return this.getRequest(this.getApiUrl(path), params);
            }
        };
    });
