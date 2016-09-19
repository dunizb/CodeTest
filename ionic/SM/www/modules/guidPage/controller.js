(function(angular){
  // /guidPage
  // 1.创建引导页控制器模块
  var app  = angular.module('guidPage.controllers',[
    'guidePage.services'])

  // 2.创建控制器

  app.controller('guidPageCtrl',[
    '$scope','guideService',
    function($scope,guideService){
  }])
})(angular)