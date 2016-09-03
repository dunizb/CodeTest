var myCSSModule = angular.module('MyCSSModule', []);
myCSSModule.controller('DeathrayMenuController', ['$scope',
    function($scope) {
        $scope.menuState={show:false};
        $scope.toggleMenu = function() {
            $scope.menuState.show = !$scope.menuState.show;
        };
    }
])
