angular.module('clientApp')
    .directive('dropdownNotification', function ($window) {
        return {
            replace:true,
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