// pages/chou/chou.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],  
    dataValue: '',
    result: '', // 抽选结果
    showTextarea: false,
    preIndex: null, // 上次抽中的index
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  add() {
    this.setData({ showTextarea: true });
  },

  addComplete() {
    const dataString = this.data.dataValue.replace(/，/g, ',');
    const dataArray = dataString ? dataString.split(',') : [];
    this.setData({ 
      showTextarea: false,
      dataValue: this.data.dataValue,
      dataList: dataArray
    });
    wx.setStorageSync('item-1-data', dataArray);
  },

  bindTextAreaInput(e) {
    this.data.dataValue = e.detail.value
  },

  edit() {
    this.setData({ showTextarea: true });
  },

  /**
   * 开始抽取
   */
  start() {
    const {dataList, preIndex} = this.data;
    if (dataList.length === 0) {
      wx.showToast({
        title: '请先添加数据',
        icon: 'none'
      })
    } else {
      const _this = this
      const index = Math.floor(Math.random() * dataList.length);
      wx.showLoading({
        title: '正在抽取...',
        mask: true,
        success() {
          setTimeout(function() {
            if(index === preIndex) {
              wx.showToast({
                title: '连续抽中...',
                icon: 'none'
              })
            }
            _this.setData({ result: dataList[index] });
            wx.hideLoading();
          }, 1500)
        }
      })
      
      this.data.preIndex = index;
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const localData = wx.getStorageSync('item-1-data') || [];
    if(localData.length > 0) {
      this.setData({ 
        dataValue: localData.join('，'),
        dataList: localData
      });
    }
  },

})