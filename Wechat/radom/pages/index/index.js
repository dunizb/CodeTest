//index.js
//获取应用实例
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const app = getApp();
const SRORAGE_KEY = 'list';
Page({
  data: {
    range: [],
    index: 0,
    show: false,
    value: '',
    textarea: '',
    dataList: [],
    dialogTitle: '新列表',
    isCreate: true
  },

  onLoad: function () {
    this.init();
    const list = wx.getStorageSync('list');
    this.data.range = list.map(item => item.key);
    this.resetFirst(list);
  },

  init() {
    const list = wx.getStorageSync('list') || [];
    if(list.length === 0) { // 第一次使用，初始化一条数据
      wx.setStorageSync(SRORAGE_KEY, [
        {
          key: '今天吃什么',
          list: ['火锅', '沙县小吃', '牛肉面', '回锅肉']
        }
      ])
    }
  },

  start() {
    const {dataList} = this.data;
    if(dataList.length <= 1) {
      wx.showToast({
        title: '至少添加两个数据项',
        icon: 'none'
      })
    } else {
      const index = Math.floor(Math.random() * dataList.length);
      Dialog.alert({
        title: '结果',
        message: dataList[index],
        customStyle: 'customStyle'
      }).then(() => {
        // on close
      });
    }
  },

  handlerBindInput(e) {
    this.data.value = e.detail.value;
  },

  /**
   * 创建和修改列表
   */
  createAndEditItem() {
    const list = wx.getStorageSync(SRORAGE_KEY);
    const value = this.data.value;
    let index = this.data.index;
    if(value.length === 0) {
      wx.showToast({
        title: '请输入',
        icon: 'none'
      })
      return;
    }
    if(this.data.isCreate) { // 创建新列表
      index = list.length;
      this.data.range.push(this.data.value)
      list.push({
        key: this.data.value,
        list: []
      })
      this.setData({
        range: this.data.range,
        textarea: '',
        index
      });
    } else {  // 编辑
      if(this.data.range[index] === value) { // 值相同，没修改
        return;
      }
      this.data.range[index] = value;
      list[index]['key'] = value;  
      this.setData({
        range: this.data.range
      });  
    }
    wx.setStorageSync(SRORAGE_KEY, list);
  },

  bindTextAreaInput(e) {
    const val = e.detail.value;
    if(!val) return;
    this.data.dataList = val.replace(/，/g, ',').split(',');
  
    const list = wx.getStorageSync(SRORAGE_KEY);
    list[this.data.index][SRORAGE_KEY] = this.data.dataList;
    wx.setStorageSync(SRORAGE_KEY, list);
  },

  bindPickerChange(e) {
    const index = Number.parseInt(e.detail.value);
    const data = wx.getStorageSync(SRORAGE_KEY)[index];
    this.data.dataList = data.list;
    this.setData({
      index: index,
      value: data.key,
      textarea: data.list.join('，')
    });
  },

  add() {
    this.setData({ 
      show: true,
      value: '',
      isCreate: true,
      dialogTitle: '新列表'
    })
  },

  delete() {
    const {index, range} = this.data;
    if(range.length === 1) {
      wx.showToast({
        title: '无法删除，至少保留一个项目',
        icon: 'none'
      })
      return;
    } 
    wx.showModal({
      title: '提示',
      content: '确定删除吗？',
      success: (confirm) => {
        if(confirm) {
          this.data.range.splice(index, 1);
          const list = wx.getStorageSync(SRORAGE_KEY);
          this.resetFirst(list);
          list.splice(index, 1);
          wx.setStorageSync(SRORAGE_KEY, list);
        }
      }
    })
  },

  edit() {
    const value = this.data.range[this.data.index];
    this.setData({ 
      show: true,
      dialogTitle: '修改列表',
      isCreate: false,
      value
    });
  },

  /**
   * 重置数据，回到第一条数据
   */
  resetFirst(list) {
    this.setData({
      index: 0,
      range: this.data.range,
      dataList: list[0][SRORAGE_KEY],
      textarea: list[0][SRORAGE_KEY].join('，')
    });
  }
})
