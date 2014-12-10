angular.module('clientApp')
    .directive('dropdownNotification', function ($window) {
        return {
            controller: function ($scope) {
                $scope.accept = function () {
                    alert('accept');
                };

                $scope.ignore = function () {
                    alert('ignore');
                };

                $scope.ignore = function () {
                    alert('ignore');
                };

                $scope.showUserDetail = function () {
                    alert('showUserDetail');
                };
            },
            replace: true,
            scope: {
                notifications: "="
            },
            restrict: 'E',
            templateUrl: "views/templates/dropdown-notification.html",
            link: function (scope, element) {
                element.find('.scroller').slimScroll();
            }
        };
    });