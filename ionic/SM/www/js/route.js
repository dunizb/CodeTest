(function(angular){
  
  // 1.创建核心的路由模块对象
  var app = angular.module('starter.router',[
    'ui.router',
    // 也需要引入其他功能的路由模块
    'guidePage.route'
    // 'homePag.rouite'
    ])

  // 配置路由规则
  app.config(['$stateProvider',function($stateProvider){
     //
  }])

})()