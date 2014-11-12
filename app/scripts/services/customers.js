'use strict';

/**
 * @ngdoc service
 * @name clientApp.Customers
 * @description
 * # Customers
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Customers', function ($resource, Settings) {
        var url = Settings.LOCAL_API_HOST + '/api/customer/:id';
        return $resource(url, {id: '@_id'}, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            }
        });
    });
