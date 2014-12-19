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
                    alert("error");
                };


                $scope.accept = function (notification) {
                    if (notification != undefined) {
                        notification.status = 0;
                        CheckInRequest.update({ id: notification._id }, notification, function(response){
                            success(notification, response);
                        }, failure);
                    }
                };

                $scope.ignore = function (notification) {
                    if (notification != undefined) {
                        notification.status = -1;
                        CheckInRequest.update({ id: notification._id }, notification, function(response){
                            success(notification, response);
                        }, failure);
                    }
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