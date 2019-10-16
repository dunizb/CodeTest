//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onClick({ target: { id } }) {
    wx.showToast({
      title: '点击了'+ id,
      icon: 'none'
    })
  }
})
