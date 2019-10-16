# 小程序 textarea 的高层级问题演示

## 症状（表现）

textarea 是小程序的原生组件，它的一个表现就是优先级很高，这导致了一些困扰，比如我们有一个表单页面，最下面就是一个textarea和一个保存按钮，这会导致textarea的文字会浮现在按钮上。如下图：

<img src="https://i.loli.net/2019/10/16/L4Y3MQrGuTm9yf1.png" alt="WechatIMG7.png" style="width:320px" />

它最大的问题时会导致保存按钮可能点击无效或者会弹出键盘，并且开发者工具模拟器和真机表现不一样，这真是个坑！

## 诊断（实验）

模拟器中，针对 `position:fixed` 定位的按钮，我们加一个 `z-index:10` 即可， `z-index` 等于多少合适不清楚，试了等于1是不行的，10就可以，其余的值没试过。
```css
.submit-cls {
  position: fixed;
  left: 30px;
  right: 30px;
  bottom: 300px;
  text-align: center;
  background-color: green;
  color: #fff;
  z-index: 10;
}
```

模拟器中的表现：
<img src="https://i.loli.net/2019/10/16/x2X589qmAzjHGRa.jpg" alt="模拟器中的表现" style="width:320px" />
然儿，真机上（Android）依然无效！如下图：

<img src="https://i.loli.net/2019/10/16/Kd37SBq89Rghk6e.jpg" alt="真机上（Android）依然无效" style="width:320px" />
于是我想到了 [cover-view](https://developers.weixin.qq.com/miniprogram/dev/component/cover-view.html) 标签，cover-view 是微信提供的一个原生组件，它是覆盖在原生组件之上的文本视图，可覆盖的原生组件包括 map、video、canvas、camera、live-player、live-pusher之上，只支持嵌套 cover-view、cover-image，可在 cover-view 中使用 button。

用 cover-view 标签包裹 button 如何呢？郁闷的事情发生了，真机上按钮不见了！。。。这方法貌似不行。。
```html
<cover-view>
  <button class="submit-cls" id='button' bindtap="onClick"> Button z-index: 10 </button>
</cover-view>
```

那我直接用 cover-view 标签作为按钮呢？
```html
<cover-view class="cover-view-clas" id='cover-view' bindtap="onClick"> cover-view z-index: 10 </cover-view>
```
```css
.cover-view-clas {
  position: fixed;
  height: 40px;
  line-height: 40px;
  left: 30px;
  right: 30px;
  bottom: 250px;
  text-align: center;
  background-color: orangered;
  color: #fff;
}
```

结果在模拟器里不行
<img src="https://i.loli.net/2019/10/16/IpBObHxYiyXj25W.png" style="width:320px">

但是真机上表现很好。于是我也加了一个 `z-index: 10` ，这样模拟器和真机表现就一致。

### 药方（总结）
综上所述，要解决这个问题似乎只有一个办法，那就是用 `cover-view` + `z-index:10` ，然儿这样会导致一个的副作用，没法使用微信的开放能力比如 `open-type`。

