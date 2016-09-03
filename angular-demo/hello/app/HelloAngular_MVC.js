var myApp = angular.module("myApp",[]);
myApp.controller("HelloAngular",["$scope",function($scope){
    $scope.greeting = {
        text: 'Hello'
    };
}])

//function HelloAngular($scope) {
//    $scope.greeting = {
//        text: 'Hello'
//    };
//}