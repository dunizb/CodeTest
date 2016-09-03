angular.module("myApp",[])
	.controller("GreetCtrl",["$scope","$rootScope",function($scope,$rootScope){
		$scope.name = 'World';
		$rootScope.department = 'Angular';
	}])
	.controller("ListCtrl",["$scope",function($scope){
		$scope.names = ['Igor', 'Misko', 'Vojta'];
	}])

//function GreetCtrl($scope, $rootScope) {
//	$scope.name = 'World';
//	$rootScope.department = 'Angular';
//}
//
//function ListCtrl($scope) {
//	$scope.names = ['Igor', 'Misko', 'Vojta'];
//}
