angular.module('clientApp')
    .directive('dropdownNotification', function ($location, CheckInRequest, alertService) {
        return {
            controller: function ($scope) {

                var success = function(notification, response) {
                    alertService.add('success', '保存した');
                    var idx = $scope.notifications.indexOf(notification);
                    if (idx != -1) {
                        $scope.notifications.splice(idx,1);
                    }
                };

                var failure = function(response) {
                    console.log(response);
                };


                $scope.accept = function (notification) {
                    notification.status = 0;
                    notification.$update(function(response) {
                        success(notification, response);
                    }, failure);
                };

                $scope.ignore = function (notification) {
                    notification.status = -1;
                    notification.$update(function(response){
                        success(notification, response);
                    }, failure);
                };

                $scope.showUserDetail = function (notification) {
                    $location.path("customer-detail/" + notification.customer._id);
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