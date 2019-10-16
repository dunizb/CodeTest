const app = getApp()

Page({
  data: {
    activity: [
      {
        timestamp: '2013 - 至今',
        content: '期间一直任职于圆方机构，共帮助客户增长1000万+财富'
      },
      {
        timestamp: '2011 - 2013',
        content: '期间一直任职于圆方机构'
      },
      {
        timestamp: '2011 - 2009',
        content: '期间一直任职于圆方机构'
      }
    ],
    activity2: [
      {
        timestamp: '2019-05-21',
        content: '修复 Select 远程搜索，调用清空方法有时不能重置搜索词的问题。#5620'
      },
      {
        timestamp: '2019-04-26',
        content: '修复 Grid 设置响应式 offset 有时出错的问题。#2769'
      },
      {
        timestamp: '2019-04-15',
        content: '新增大量全局配置。#5592'
      }
    ],
    activity3: [
      {
        timestamp: '里程碑',
        content: [
          '修复 Select 远程搜索，调用清空方法有时不能重置搜索词的问题。',
          '修复 Modal 有时会误关闭的问题。',
          '修复 Table 开启 Tooltip 时，单元格内容没有居中的问题。',
          '修复 TS 不能按需使用的问题。'
        ]
      },
      {
        timestamp: '2019-04-26',
        content: '修复 Grid 设置响应式 offset 有时出错的问题。#2769'
      },
      {
        timestamp: '2019-04-15',
        content: '新增大量全局配置。#5592'
      }
    ]
  },
  onLoad: function () {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：')
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html')
  },
})
