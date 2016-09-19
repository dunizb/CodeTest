(function(angular){
  // 1.兼容性配置模块
  var app = angular.module('starter.config',[])

  // 2.做具体的配置
  app.config(['$ionicConfigProvider',function($ionicConfigProvider){

    // 控制tab选项卡在顶显示还是顶部
    // 这些配置，只有在打包成apk时才生效。
    $ionicConfigProvider.platform.android.tabs.position('top');// bottom
    $ionicConfigProvider.platform.ios.tabs.position('bottom');

  }])
})(angular)