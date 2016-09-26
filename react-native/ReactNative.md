### node,python,vs2015,androidSdK(android studio > 2.0),jdk

### python
  - 配置环境变量:C:\Python27   python.exe
  - 验证：在命令输入python看输出结果>>

### 安装react-native
  - `npm install -g react-native-cli`

### 初始化项目
  - `react-native init myApp`
    + 下载一些源码

### 初始化完成之后在项目目录有个index.android.js
的文件

### 编译到手机上
  - `react-native run-android` // 运行到android手机上
    + 每一每次run-android时会下载一个zip包，需要手动下载(类比ionic)
    + 如果执行这个命令弹出一个命令行窗口,需要把所以命令行窗口关闭，执行`react-native start `，执行之后，再打开一个窗口执行 `react-native run-android`