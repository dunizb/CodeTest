(function(angular){
    // 1.创建引导页路由模块
    var app = angular.module('guidePage.route',[
        'ui.router',
        'guidPage.controllers',
        ])

    // 2.配置路由
    app.config(['$stateProvider',function($stateProvider){
       $stateProvider.state('guidpage',{
        // console.log(1211)
        url:'/guidPage',  // /guidPage
        // templateUrl:'./view.html'
        templateUrl:'modules/guidPage/view.html'   // 路径是相对于主模块的(相对于app.js文件的路径)
        controller:'guidPageCtrl'
       })
    }])
})(angular)