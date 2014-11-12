'use strict';

/**
 * @ngdoc service
 * @name clientApp.Items
 * @description
 * # Items
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Items', function ($resource, Settings) {
        var url = Settings.LOCAL_API_HOST + '/api/item/:id';
        return $resource(url, {id: '@_id'}, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            }
        });
    });
