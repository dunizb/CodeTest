//index.js
//获取应用实例
const app = getApp()
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
const SRORAGE_KEY = 'list';
Page({
  data: {
    range: [],        // picker的数据
    index: 0,         // picker显示的当前索引
    dialogTitle: '',  // Dialog标题
    show: false,      // 是否显示Dialog，默认否
    value: '',        // Dialog对话输入框中的值
    isCreate: true,   // 是否是新建列表
    textarea: '',     // 列表的数据
  },
  /*页面加载时触发，一个页面只会调用一次*/
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
          list: []
        }
      ])
    }
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
  },
  /* 新增和修改列表名称 */
  createAndEditItem() {
    const list = wx.getStorageSync(SRORAGE_KEY);
    const value = this.data.value;
    let index = this.data.index;
    if(value === '') {
      wx.showToast({
        title: '你什么都没输入',
        icon: 'none'
      })
    } else {
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
    }
    wx.setStorageSync(SRORAGE_KEY, list);
  },
  bindTextAreaInput(e) {
    // 获取输入的值
    const val = e.detail.value;
    // 如果输入为空不继续处理
    if(!val) return;
    // 把中文逗号都替换为因为逗号，并分割为数组
    this.data.dataList = val.replace(/，/g, ',').split(',');
  
    const list = wx.getStorageSync(SRORAGE_KEY);
    list[this.data.index]['list'] = this.data.dataList;
    wx.setStorageSync(SRORAGE_KEY, list);
  },
  bindPickerChange(e) {
    const index = Number.parseInt(e.detail.value);
    // 获取LocalStorage中对应的数据项
    const data = wx.getStorageSync(SRORAGE_KEY)[index];
    this.data.dataList = data.list;
    // 通知页面
    this.setData({
      index: index,
      value: data.key,
      textarea: data.list.join("，"),
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
  edit() {
    const value = this.data.range[this.data.index];
    this.setData({
      show: true,
      dialogTitle: "修改列表",
      isCreate: false,
      value,
    });
  },
  delete() {
    const { index, range } = this.data;
    if (range.length === 1) {
      wx.showToast({
        title: "无法删除，至少保留一个项目",
        icon: "none",
      });
      return;
    }
    wx.showModal({
      title: "提示",
      content: "确定删除吗？",
      success: (res) => {
        if (res.confirm) {
          this.data.range.splice(index, 1);
          const list = wx.getStorageSync(SRORAGE_KEY);
          this.resetFirst(list);
          list.splice(index, 1);
          wx.setStorageSync(SRORAGE_KEY, list);
        }
      },
    });
  },
  start() {
    const { dataList } = this.data;
    if (dataList.length <= 1) {
      wx.showToast({
        title: "至少添加两个数据项",
        icon: "none",
      });
    } else {
      const index = Math.floor(Math.random() * dataList.length);
      Dialog.alert({
        title: "结果",
        message: dataList[index],
        customStyle: "customStyle",
      }).then(() => {
        // on close
      });
    }
  },
  onShareAppMessage() {
    return {
      title: "抽个啥，一个帮助你决策的小程序",
      paht: "pages/index/index"
    }
  },
  onShareTimeline() {
   return {
    title: "抽个啥，一个帮助你决策的小程序",
    query: ""
   }
  }
})
