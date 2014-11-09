'use strict';

/**
 * @ngdoc function
 * @name clientApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the clientApp
 */
angular.module('clientApp')
    .controller('SideBarCtrl', function ($scope, $location) {
        $scope.menus = [
            {
                name: "Dashboard",
                href: "/",
                icon: "icon-home"
            },
            //{
            //    name: "Order",
            //    href: "/order",
            //    icon: "icon-basket"
            //},
            //{
            //    name: "Customer",
            //    href: "/customer",
            //    icon: "icon-users"
            //},
            {
                name: "Category",
                href: "/category",
                icon: "icon-docs"
            },
            {
                name: "Item",
                href: "/item",
                icon: "icon-cup"
            },
            {
                name: "Store",
                href: "/store",
                icon: "icon-basket"
            },
            {
                name: "Extensions",
                href: "/extensions",
                icon: "icon-home"
            }
        ];


        $scope.getClass = function (path) {
            var current = $location.path();
            if (current === path || (current.indexOf(path) === 0 && path != '/')) {
                return "active";
            } else {
                return "";
            }
        };

        $scope.isSelected = function (path) {
            var current = $location.path();
            if (current === path || (current.indexOf(path) === 0 && path != '/')) {
                return true;
            } else {
                return false;
            }
        };


    });
