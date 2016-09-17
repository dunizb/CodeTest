// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])


// 可以在这里进行一些基本的配置
  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

        // Don't remove this line unless you know what you are doing. It stops the viewport
        // from snapping when text inputs are focused. Ionic handles this internally for
        // a much nicer keyboard experience.
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })
  .controller('demoController',[
    '$scope',
    '$ionicPopup',
    '$ionicActionSheet',
    '$ionicModal',
    function ($scope,$ionicPopup,$ionicActionSheet,$ionicModal) {

      // Modal

      // template,tempaterUrl
      $ionicModal.fromTemplateUrl('modal',{
        scope:$scope,
        animation:'slide-in-down' // 定义动画效果,就这一个
      }).then(function (modalObj) { //
        $scope.modalObj=modalObj; // 这个对象就是模态框对象.
      });

      // 显示模态框
      $scope.showModal=function () {
        $scope.modalObj.show();// 显示模态框
      }
      // 隐藏模态框
      $scope.hideModal=function () {
        $scope.modalObj.hide(); // 隐藏模态框
      }


      // ActionSheet

      // 这是ActionSheet弹出框,从底部弹出。
      $scope.showActionSheet=function () {
        // var name = '小明'; //

        // body...
        var hide = $ionicActionSheet.show({
          buttons:[
            {'text':'打开相册'},
            {'text':'打开相机'}
          ],
          destructiveText:'删除',// 显示删除按钮
          cancelText:'取消',
          cancel:function () {  // 取消按钮的点击事件
            // body...
            console.log('取消按钮');
          },
          buttonClicked:function (index) { // 普通按钮点击事件-buttons数组里的按钮
            console.log(index);
            // obj.hide();
            hide();
            // switch(0){
            // }
          },
          destructiveButtonClicked:function () { // 删除操作的按钮的点击事件
            // body...
            console.log('删除操作')
          }

        });
      }

      // popup
      $scope.showPopup=function () {
        // body...
        $ionicPopup.show({
          template:'<input>', // 显示的模板，可以自定义
          title:'标题',
          subTitle:'子标题',
          buttons:[// 这里是一些按钮
            {
              text:'取消',
              onTap:function (e) { // 这个是当前按钮的点击事件
                console.log('取消');
              }
            },
            {
              text:'<b>确认</b>', // 可以写html字符串
              onTap:function (e) {
                console.log('确认')
              }
            }
          ]
        });
      }




      // body...
      // $scope.test=function (index) {
      //   // body...
      //   console.log(index);
      // }



    }]);
