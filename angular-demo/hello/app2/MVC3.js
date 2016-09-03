var myApp = angular.module("myApp",[]);
myApp.controller("CommonController",["$scope",function($scope){
    $scope.commonFn=function(){
    	alert("这里是通用功能！");
    };
}]).controller("Controller1",["$scope",function($scope){
    $scope.greeting = {
        text: 'Hello1'
    };
    $scope.test1=function(){
    	alert("test1");
    };
}]).controller("Controller2",["$scope",function($scope){
    $scope.greeting = {
        text: 'Hello2'
    };
    $scope.test2=function(){
        alert("test2");
    };
}])

//Version < 1.5.2 写法

//function CommonController($scope){
//	$scope.commonFn=function(){
//    	alert("这里是通用功能！");
//    };
//}
//
//function Controller1($scope) {
//    $scope.greeting = {
//        text: 'Hello1'
//    };
//    $scope.test1=function(){
//    	alert("test1");
//    };
//}
//
//function Controller2($scope) {
//    $scope.greeting = {
//        text: 'Hello2'
//    };
//    $scope.test2=function(){
//    	alert("test2");
//    }
//}