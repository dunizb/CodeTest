# 极简音乐播放器

## 它能做什么？
- [X] 控制音乐状态（播放、暂停）
- [X] 灵活的音乐资源配置（当个、多个）
- [X] 自动音乐列表（无选择列表、有列表）
- [X] 可指定播放器所在容器（元素、页面）
- [X] 可指定播放器所在容器位置（顶、左、右、下）
- [X] 可自动加载音乐资源并播放（浏览器、微信网页等）
- [X] 可自定义播放器皮肤（按钮、列表）
- [X] 极简小巧（无图片资源、无CSS样式文件加载）
- [X] 更友好的用户体验（手机、PC）

## 使用

构造器：`SMmuiscPlay(options)`

## options选项

**el** 
指定播放器所在容器（元素、页面）,不指定则默认挂载在`body`上
```js
SMmuiscPlay({
    el: "app",
    audioUrl: "muisc/xxxx.mp3"
});
```

**audioList**
音乐列表（无选择列表、有列表）,单个歌曲会隐藏音乐列表
- title: 音乐名称
- source: 音乐地址
```js
SMmuiscPlay({
    el: "app",
    audioUrl: [
        {
            title: "aaaaaa",
            source: "muisc/aaaaaa.mp3"
        },
        {
            title: "bbbbbb",
            source: "muisc/bbbbbb.mp3"
        }
    ]
});
```

**position**
播放器位置，CSS定位  
```js
SMmuiscPlay({
    el: "app",
    position: "top:10px;left:10px",//左上角
    audioUrl: "muisc/xxxx.mp3"
});
```

**buttonImgSrc**
播放按钮图片,背景图片，大小为24X20
```js
SMmuiscPlay({
    el: "app",
    buttonImgSrc: "icon.png",
    position: "top:10px;left:10px",//左上角
    audioUrl: "muisc/xxxx.mp3"
});
```

**htmls**
自定义
```js
SMmuiscPlay({
    el: "app",
    buttonImgSrc: "icon.png",
    position: "top:10px;left:10px",//左上角
    htmls: "<div>....<div>"
    audioUrl: "muisc/xxxx.mp3"
});
```