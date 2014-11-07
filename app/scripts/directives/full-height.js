angular.module('clientApp')
    .directive('fullHeight', function ($window) {
        return {
            restrict: 'A',
            link: function (scope, element) {
                var headerAndFooter = 103;
                scope.initializeWindowSize = function () {
                    element.css('min-height', $window.innerHeight - headerAndFooter);
                };
                scope.initializeWindowSize();
                angular.element($window).bind('resize', function () {
                    scope.initializeWindowSize();
                });
            }
        };
    });