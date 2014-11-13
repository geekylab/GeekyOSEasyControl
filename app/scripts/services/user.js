'use strict';

/**
 * @ngdoc service
 * @name clientApp.Store
 * @description
 * # Store
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('User', function ($http, Settings, $q) {
        var myUser = null;
        return {
            me: function () {
                var url = Settings.API_HOST + '/app/me';
                var deferred = $q.defer();
                deferred.notify('loading user');

                if (!myUser) {
                    $http.get(url)
                        .success(function (data, status, headers, config) {
                            myUser = data;
                            deferred.resolve(data);
                        })
                        .error(function (data, status, headers, config) {
                            myUser = null;
                            deferred.reject(data);
                        });
                } else {
                    deferred.resolve(myUser)
                }

                return deferred.promise;
            }
        }
    });
