angular.module('clientApp')
    .directive('elapsedTime', function ($window) {
        return {
            controller: function ($scope) {
                var printElapsedTime = function (time) {
                    var start = time;
                    var end = Date.now();
                    var elapsed = end - start;
                    console.log(elapsed, time);
                    return elapsed;
                };
                $scope.time = printElapsedTime($scope.time);

            },
            scope: {
                time:'='
            },
            replace: true,
            restrict: 'E',
            template: '<span class="time">{{time}}</span>'
        };
    });