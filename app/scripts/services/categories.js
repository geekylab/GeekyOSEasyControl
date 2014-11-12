'use strict';

/**
 * @ngdoc service
 * @name clientApp.categories
 * @description
 * # categories
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Categories', function ($resource, Settings) {
        var url = Settings.LOCAL_API_HOST + '/api/category/:id';
        return $resource(url, {id: '@_id'}, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            }
        });
    });
