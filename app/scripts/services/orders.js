'use strict';

/**
 * @ngdoc service
 * @name clientApp.Orders
 * @description
 * # Orders
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Orders', function ($resource, Settings) {
        var url = Settings.LOCAL_API_HOST + '/api/order/:id';
        return $resource(url, {id: '@_id'}, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            }
        });
    });
