'use strict';

/**
 * @ngdoc service
 * @name clientApp.Tables
 * @description
 * # Tables
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Tables', function ($resource, Settings) {
        var url = Settings.API_HOST + '/api/table/:id';
        return $resource(url, {id: '@_id'}, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            }
        });
    });
