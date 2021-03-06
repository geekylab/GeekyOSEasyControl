'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:StoreeditCtrl
 * @description
 * # StoreeditCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('StoreeditCtrl', function ($scope,
                                           $routeParams,
                                           Store,
                                           CurrentStore,
                                           constAllCountries,
                                           alertService,
                                           $location,
                                           FileUploader,
                                           $translate,
                                           $timeout,
                                           constFacility,
                                           Settings,
                                           $http) {


        var uploader = $scope.uploader = new FileUploader(
            {url: Settings.LOCAL_API_HOST + '/api/upload'}
        );

        uploader.filters.push({
            name: 'imageFilter',
            fn: function (item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|gif|'.indexOf(type) !== -1;
            }
        });

        uploader.onCompleteItem = function (fileItem, response, status, headers) {
            if ($scope.store.images == undefined)
                $scope.store.images = [];
            var desc = {};
            var filename = {};
            desc[$scope.supportLang.selected.code] = '';
            filename[$scope.supportLang.selected.code] = response.filename;
            $scope.store.images.push(response._id);
            fileItem.remove();
        };

        $scope.constFacility = constFacility;

        $scope.locationSearching = false;
        $scope.addressBase = {
            countries: constAllCountries,
            states: {
                'SP': 'SP'
            },
            cities: {
                'Santos': 'Santos'
            }
        };

        $scope.store = CurrentStore;
        console.log("on start", $scope.store);

        $scope.changeLang = function (lang) {
            $scope.myPromise = $scope.store = Store.get(
                {
                    id: $routeParams.id,
                    lang: lang
                }
            );
        };

        $scope.save = function (continueFlg) {
            function success(response) {
                alertService.add('success', '保存した');
//                $location.path("/store");
                console.log("on success", $scope.store);

                //$scope.tableGridOptions.data = $scope.store.tables;
            }

            function failure(response) {
                console.log(response);
            }

            if ($scope.store._id) {
                console.log("on save", $scope.store);
                $scope.myPromise = $scope.store.$update(success, failure);
            } else {
                $scope.myPromise = $scope.store.$save(success, failure);
            }
        };

        $scope.delete = function () {
            function success(response) {
                alertService.add('success', '削除されました。');
                $location.path("/store");
            }

            function failure(response) {
                _.each(response.data, function (errors, key) {
                    if (errors.length > 0) {
                        _.each(errors, function (e) {
                            $scope.form[key].$dirty = true;
                            $scope.form[key].$setValidity(e, false);
                        });
                    }
                });
            }

            if ($scope.store._id) {
                if (window.confirm($translate.instant('Remove?')))
                    $scope.myPromise = $scope.store.$delete(success, failure);
            }
        };

        //https://github.com/rogerwang/node-webkit/issues/236
        navigator.geolocation = {};
        navigator.geolocation.getCurrentPosition = function (callback) {
            $.get('https://maps.googleapis.com/maps/api/browserlocation/json?browser=chromium&sensor=true', function (data) {
                var position = {
                    coords: {
                        latitude: data.location.lat,
                        longitude: data.location.lng
                    }
                };
                callback(position);
            });
        };

        $scope.getLocation = function () {
            if (navigator.geolocation) {
                $scope.locationSearching = true;
                navigator.geolocation.getCurrentPosition(function (position) {
                    if ($scope.store.location == undefined) {
                        $scope.store.location = [];
                    }
                    $scope.store.location[0] = position.coords.longitude;
                    $scope.store.location[1] = position.coords.latitude;
                    $scope.$apply($scope.locationSearching = false);

                });
            } else {
                alert('not support');
            }
        };

        $scope.checkCheckbox = function (option) {
            if ($scope.store.opts == undefined)
                return false;
            return $scope.store.opts.indexOf(option) > -1;
        };

        $scope.toggleCheck = function (store_id, option) {
            if ($scope.store.opts == undefined) {
                $scope.store.opts = [];
            }
            var idx = $scope.store.opts.indexOf(option);

            if (angular.equals(idx, -1)) {
                $scope.store.opts.push(option);
            }
            else {
                $scope.store.opts.splice(idx, 1);
            }
        };

        $scope.getImagePath = function (img) {
            return Settings.LOCAL_API_HOST + '/api/image/' + img;
        };

        $scope.getTableQrCode = function (table) {
            if (table._id) {
                return Settings.LOCAL_API_HOST + '/api/table_qr/' + table._id;
            }
        };

        $scope.syncStore = function () {
            $scope.myPromise = $http.post(Settings.LOCAL_API_HOST + '/api/sync/store/' + $scope.store._id, {store: $scope.store})
                .success(function () {
                    $scope.store.syncFlg = true;
                }).error(function () {
                    alert('error to sync');
                });
        };

        /**
         * Tables
         */

        $scope.allTableStatus = [];
        $scope.allTableStatus[0] = $translate.instant('vacated');
        $scope.allTableStatus[1] = $translate.instant('busy');


        $scope.addRow = function () {
            if (!$scope.store.tables)
                $scope.store.tables = [];
            $scope.store.tables.push({
                'table_number': 0,
                'limited_number': 4,
                'table_status': 0
            });
        };

    }).filter('mapGender', function ($translate) {
        var genderHash = {
            0: $translate.instant('vacated'),
            1: $translate.instant('busy')
        };
        return function (input) {
            if (input == undefined || input === '') {
                return '';
            } else {
                return genderHash[input];
            }
        }
    });
