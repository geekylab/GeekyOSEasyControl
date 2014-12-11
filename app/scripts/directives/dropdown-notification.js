angular.module('clientApp')
    .directive('dropdownNotification', function ($location) {
        return {
            controller: function ($scope) {
                $scope.accept = function () {
                    alert('accept');
                };

                $scope.ignore = function () {
                    alert('ignore');
                };

                $scope.showUserDetail = function (notification) {
                    $location.path("customer-detail/" + notification.customer.id);
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