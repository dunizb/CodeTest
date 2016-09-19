(function(angular){
  // 1.创建引导页服务模块
  var app = angular.module('guidePage.services',[])

  // 2.创建服务
  app.service('guideService',[function(){
     this.age = 18;

     // return {};
  }])
  app.service('guideService002',[function(){
     this.age = 18;

     // return {};
  }])

})(angular)