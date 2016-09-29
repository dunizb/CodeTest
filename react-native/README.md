# ReactNative

## ReactNative
>> React Native For Android是伟大的互联网公司Facebook与2015年9月15日发布的，该可以让我们广大开发者使用JavaScript和React开发我们 的应用，该提倡组件化开发，也就是说React Native给我们提供一个个封装好的组件让开发者来进行使用，甚至我们可以相关嵌套形成新的组件。使用React Native我们可以维护多种平台(Web,Android和IOS)的同一份业务逻辑核心代码来创建原生应用。现阶段Web APP的的体验还是无法达到Native APP的体验，所以这边fackbook更加强调的是learn once,write everywhere，应用前端我们使用js和React来开发不同平台的UI，下层核心模块编写复用的业务逻辑代码，提供应用开发效率。

### 项目结构介绍

### ReactNative初步使用
  - 不有div,也没有html的一些其他标签.
  - 我们在这里写的组件，最终不是在浏览器中执行，是被转换成相应平台的语言。

- div+css  img

### Text组件
  - 用来显示文字的，所以的文字都必写在该组件中显示
  - numberOfLines
  - var str = '小明'  ; str = 12131;

### View组件
  - 这个就相当于html中的div，可以用来进行基本布局。
  - 不能够通过View设置字体颜色，需要直接给Text组件设置颜色


### 与ReactJS中组件对比


### 样式操作

### Image组件
  - <Image source={require('...jpg')} />
  - 如果改变了请求的本地图片(如果图片文件是在项目新加的)，需要重新执行`react-native run-android`,执行之前，那个弹出的命令行窗口也需要关闭。
  - 如果使用的是网络图片不需要重新编译。

  - 图片组件的其他使用情况
    + testa.android.png // testa.ios.png
      * 我是在Image组件直接使用testa.png就可以了，reactNative会自动根据不同的平台去显示不同的图片

    + testa@2x.png // testa@3x.png
      * 能够根据不同的分辨率显示不同的图片.,我们使用时也只需要写 testa.png
    
  - 图片组件还可以当作背景图使用
    + 需要使用双标签的形式，内容就写在标签中间。


***********
- 其实到这里已经可以编写各种各样的组件了

### TextInput 组件
  - onChangeText 
    + 文本改变事件

### ListView
  - 属性: dataSource
    + 指定一个数据源这个数据是通过
      new ListView.DataSource(
      rowHasChanged:(r1,r2)=>r1!==r2).cloneWithRows(['小明',小月])
  - 属性： renderRow,指定我们ListView中每一行所显示的内容,只要保证它最终返回的是一个组件对象。


### ScrollView 组件
  



### 校验服务是否停止
http://localhost:8081/index.android.bundle?platform=android&dev=true&hot=true&minify=false



### 手势响应系统
  - onPress // 手指点击
  - onLongPress // 长按
  - onPressIn   // 按下
  - onPressOut  // 离开

#### TouchableHightLight
  - 用于注册触摸事件,想要注册事件的组件都用该组件包裹

#### TouchableNativeFeedback
  - 该组件注册事件会有涟漪效果
  - 不能够直接包裹一个Text组件
  - 必需将内部的元素用一个View包裹

#### TouchabelWithoutFeedback
  - 点击之后没有任何效果(js代码还是会执行)
  - 不能够直接包裹一个Text组件

#### TouchableOpacity
  - 点击之后会有一个透明效果


### 扩展
  - netstat -aon|findstr "端口号"    //查看占用端口的程序
  - tasklist|findstr "PID"        // 查看PID对应的程序进程名


## https,http
这种写法可以允https形式的网站请求http的资源
<img src="//www.baidu.com/aa.jpg />

md5,sha1,sh

restfull
get // 拿数据
post // 添加数据


// 电影数据
var MOCKED_MOVIES_DATA = [
  {title: '标题', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];



var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';