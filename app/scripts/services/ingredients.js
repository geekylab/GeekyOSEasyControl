'use strict';

/**
 * @ngdoc service
 * @name clientApp.Ingredients
 * @description
 * # Ingredients
 * Factory in the clientApp.
 */
angular.module('clientApp')
    .factory('Ingredients', function ($resource, Settings) {
        var url = Settings.LOCAL_API_HOST + '/api/ingredients/:id';
        return $resource(url, {id: '@_id', name: '@name', lang: '@lang'}, {
            update: {
                method: 'PUT',
                params: {
                    id: "@_id"
                }
            },
            query: {
                method: 'GET',
                isArray: true,
                params: {
                    name: "@name",
                    lang: "@lang"
                }
            }
        });
    });
