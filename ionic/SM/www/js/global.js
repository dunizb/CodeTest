(function(angular){
  // 1.创建全局配置模块对象
  var app = angular.module('starter.global',[])

  // 2.配置全局的一些参数
  app.constant('GlobalVariable',{
    SERVER:'http://www.itcast.cn',    // wwww.itcast.cn/imgs/aa.jpeg
    VERSION:'1.0.0',
    TITLE:'我们的商城'
  })

})(angular)