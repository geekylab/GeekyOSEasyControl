'use strict';

/**
 * @ngdoc service
 * @name clientApp.Store
 * @description
 * # Store
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Store', function ($resource, Settings) {
        var url = Settings.API_HOST + '/api/store/:id/:lang';
        return $resource(url, {
            id: '@_id',
            lang: '@lang'
        }, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            }
        });
    });
