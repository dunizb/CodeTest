## 实战技巧：开发和生产并行设置

### 依赖不同

一个项目中是有开发环境和生产环境的，这两个环境的依赖也是不同的。

- 开发依赖：只在开发中用来帮助你进行开发，简化代码或者生成兼容设置的以来包。你可以打开package.json来查看，devDependencies的下面的这些包为开发使用的包。这些包在生产环境中并没有用处。
- 生产依赖：就是比如我们的js使用了jquery，jquery的程序要在浏览器端起作用，也就是说我们最终的程序也需要这个包，这就是生产依赖。这些包在dependencies中。

### npm安装

假如我们要在项目中使用jquery库，这时候我们一般有三种安装方法，每种我都详细讲解一下。

**第一种**：`npm install jquery`

安装完成后，你会发现在package.json中并不存在这个包的依赖。如果你项目拷贝给别人继续开发，或者别人和你git合作，再次下载项目npm install时就会缺少这个jquery包。项目就会无法正常运行，所以这也是我们最不赞成的安装方法。

**第二种**：`npm install jquery --save`

安装完成后，它存在于package.json的dependencies中，也就是说它是生产环境需要依赖的包（上线时需要的以来包）。

**第三种**：`npm install jquery --save-dev`

安装完成后，它存在于package.json的devDependencies中，也就是说它是开发环境中需要的，上线并不需要这个包的依赖。

**安装全部项目依赖包**：`npm install`

**安装生产环境依赖包**：`npm install --production`

### 配置生产和开发并行

我们在以前的配置中设置了一个变量website，用于静态资源正确找到路径。那如果生产环境和开发环境不一样，而且我们需要来回切换，这时候我们需要更好的设置方法。
```js
var website={
    publicPath:"http://192.168.0.104:1717/"
}
```

**修改package.json命令**

其实就是添加一个dev设置，并通过环境变量来进行区分，下面是package.json里的值。
```js
"scripts": {
    "server": "webpack-dev-server --open",
    "dev":"set type=dev&webapck",
    "build": "set type=build&webpack"
},
```

**修改webpack.config.js文件**

可以利用node的语法来读取type的值，然后根据type的值用`if--else`判断。
```js
if(process.env.type== "build"){
    var website={
        publicPath:"http://192.168.0.104:1717/"
    }
}else{
    var website={
        publicPath:"http://cdn.jspang.com/"
    }
}
```
如果你说我想看一下传过来的值到底是什么？可以用下面的输出语句。

```js
console.log( encodeURIComponent(process.env.type) );
```

**Mac下的package.json设置**

MAC电脑下需要把`set`换成`export`，并且要多加一个`&`符，具体代码如下。
```js
"scripts": {
    "server": "webpack-dev-server --open",
    "dev":"export type=dev&&webpack",
    "build": "export type=build&&webpack"
},
```


