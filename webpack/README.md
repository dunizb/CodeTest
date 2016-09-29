# webpack

## 1.1.webpack是什么
  - gulp , 打包,压缩,混淆，合并,
  - 最初是为了打包React
  
  > webpack是当下最热门的前端资源模板管理的打包工具。
  > 用于处理模块之间的依赖关系，可以把复杂的依赖关系变得简单。
  > webpack把前端的静态资源当作一个个模块，会自动处理模块之间的依赖关系，然后执照指定的规则生成静态资源。
  > webpack从一开始就不是为html而生的，所以对html的处理的功能较弱

  - 链接
    + [官网](http://webpack.github.io)
    + [Webpack-handlebook](http://zhaoda.net/webpack-handbook/)
    + [Gitbook](http://fakefish.github.io/react-webpack-cookbook/index.html)

## 1.2.webpack安装
  - `npm install -g webpack`

## 1.3.webpack基本使用
   - `webpack [想要处理的文件]  [处理后的文件]`
    + 示例:`webpack test.js  bundle.js`
    - gzip : 网络传输时的压缩方式
      * 就相当用压缩软件进行压缩。

### 1.3.1基本命令

### 1.3.2.其他参数
  - *注意：参数可以组合使用，但是参数之间需要空格分隔*

#### 1.3.2.1. -p参数
  - 用来对js代码进行压缩操作,只是把代码量变小了
  - `webapck [想要处理的文件] [处理后的文件] -p`

#### 1.3.2.2. --progress参数
  - 用于查看项目打包编译的进度
  - `webapck [想要处理的文件] [处理后的文件]  --progress`


#### 1.3.2.3. -w 参数
  - 监视文件变化，自动进行压缩操作// 也可以写成 --watch
  - `webapck [想要处理的文件] [处理后的文件] -w`

#### 1.3.2.4 --display-error-details 参数
  - 这个参数可以展示更多的错误
  - `webapck [想要处理的文件] [处理后的文件] --display-error-details`

## 补充，关于在npm的package.json文件配置便捷命令
  - 在scripts属性中添加一个任意的属性:值填上我们想要执行的命令
    + 之后我们就可以在命令行使用`npm run [写的属性名]`来执行我们的命令

>
  "scripts": {
    "dev" : "webpack -w -p --progress --display-error-details --config webpack.config.js"
  },


## 1.4. loaders(加载器)

### 1.4.1. css-loader
  - 安装:'npm install css-loader --save-dev'
  - 作用:是将css文件中的样式载入到js中，但是不会应用于我们的页面

### 1.4.2. style-loader
  - 安装:`npm install style-loader --save-dev`
  - 作用: 将js中载入的css样式应用于页面(其实是在页面创建了一个style标签)
  - 该loader与css-loader一般配合使用

  ```
       {
          test:/\.css$/,
          exclude:/node_modules/,
          // 这个css 仅仅是把css文件载入到js中
          // 如果写多个loader以!分隔，最终他们会从右往左执行
          loader:'style!css'// 指定一个css-loader去处理css文件
        }
  ```



### 1.4.3. url-loader
  - 主要是用来对图片进行处理的
  - 只能够处理css中的图片,可以用来把图片转换成bas64编码的字符串
  - 安装 `npm install url-loader`
    - 如果图片比较小，就转换成base64编码
  ```
  // limit 参数，给定一个值(bit)当图片小于该值时会被转base64编码的形式,否则会被复制到
          // name参数指定的位置,[name] 表示原文件名,[ext]原文件的扩展路径
          loader:'url?limit=10000&name=./newImg/[name].[ext]'  // 单位bit
          //   1字节: 8 bit
          //   1kb : 1024 字节
          //   1M : 1024kb
  ```

### 1.4.4. sass-loader
  - 安装:`npm install sass-loader --save-loader`
    - 如果使用的node版本不是4.x，需要单独下载node-sass
  - 作用:是将sass语法转换为css语法
  - less-loader也是一样的

  ```
    // 对css进行处理loader : css-loader
        {
          test:/\.scss$/, //最初由哪个loader处理的就是匹配它需要的文件
          exclude:/node_modules/,
          // 这个css 仅仅是把css文件载入到js中
          // 如果写多个loader以!分隔，最终他们会【从右往左执行】
          loader:'style!css!sass'// 指定一个css-loader去处理css文件
        }
        // style-loader这个loader专门用来将js中载入的css应用于页面
        // 如果要对sass进行处理，需要使用sass-loader
        //    1.先把sass的代码转换成css,
        //    2.然后将转换后的css载入到js中
        //    3.将载入到js中的css应用于页面
        // 如果要对less进行处理，需要使用less-loader
  ```


### 1.4.5. babel-loader
  - 安装:`npm install babel-loader --save-dev`
  - 作用:用于进行语法转换,能够把react,es6的语法转换成es5;
   `babel-core`// 如果没有自动下载，需要手动使用npm下载
    + 还需要配合其他的npm包使用
      * `babel-preset-react`
      * `babel-preset-es2015`


## 1.5.从配置文件中启动webpack
  *注意：添加了配置文件之后，就不要使用原先命令行的方式进行合并压缩了*



### 1.5.1 指定配置文件启动webpack

## 1.6.使用webpack-dev-server
  - 安装:`npm install -g webpack-dev-server`

### 1.6.7.相关参数

#### 1.6.7.8. --content-base
  - 通过该可以指定网站的根目录
  - 默认是根据webpack.config.js所在路径启动服务的

#### 1.6.7.9 --devtool eval
  - 该参数可以到当，压缩文件执行报错时，或者有语法错误，会提示在原文件具体的错误行号



## 1.7分离第三方库/框架
  - CommonsChunkPlugin插件
    + 用于分离第三方库/框架
  
## 1.8 压缩插件
  - UglifyJsPlugin
    + 用于进行代码压缩

  ```
     output:{
        comments:false // 去除注释
       },
       compress:{
         warnings:false // 去除警告
       }
    }
  ```


## 其他一些插件
  - 创建index.html插件`html-webpack-plugin`
    + [github链接](https://github.com/ampedandwired/html-webpack-plugin)
    + 动态生成html,自动引入打包的模块。

  - 自动打开浏览器插件`open-browser-webpack-plugin`
    + [github链接](https://github.com/baldore/open-browser-webpack-plugin)
  - 拷贝文件插件`copy-webpack-plugin`
    + [github链接](https://github.com/kevlened/copy-webpack-plugin)
  - 删除目录插件`clean-webpack-plugin`
    + [github链接](https://github.com/kevlened/copy-webpack-plugin)


### 其他
  - [sass](http://www.w3cplus.com/sassguide/)
  - [less](http://lesscss.cn/)

### sourceTreen
https://www.sourcetreeapp.com/

### koala
http://koala-app.com/


### browser-sync
  - 自动同步
    + `npm install -g browser-sync`
    + `browser-sync start --server [项目根目录 ] --files "*.*,*.css"`
  - 浏览器兼容性测试

## 环境
  - jdk 
  - android sdk
  - node
  - vs2015 / c++ 编译器
  - python 

### reactNative本身
  - `npm install -g react-native-cli`
  - `react-native init MyApp`
    // 如果时间长，可以切换淘宝的镜像源下载

  - 编译
    `react-native run-android`

    第一次执行该命令会下载一个zip压缩,
    [如图](./zip.png)
    可以自动手动在浏览器中下载该文件，把它复制到C:\Users\isc\.gradle\wrapper\dists\gradle-2.4-all\6r4uqcc6ovnq6ac6s0txzcpc0

    复制之后再重新执行这个命令, 它会先解压该文件，解压之后还会下载很多少(这个过程中如果出现错误,重新执行这个命令)
Build Success,看到这个字眼就表示成功了。

