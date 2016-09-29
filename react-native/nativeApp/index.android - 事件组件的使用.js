/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image, // 所有使用的组件都必需引入进来
  TextInput, // 输入框组件
  ListView, // 列表组件
  ScrollView,
  TouchableHighlight,// 用于注册触摸事件
TouchableNativeFeedback, // 注册事件的元素有涟漪效果
TouchableOpacity,// 注册事件的元素有透明效果
TouchableWithoutFeedback,// 点击之后没有反馈
} from 'react-native';

class nativeApp extends Component {
  constructor(){
    super()
    this.state={
      txt:'我是中国人'
    }
  }
  // 自定义方法
  handelPress(){
    this.setState({
      txt:'我是小明'
    })
  }
  handelPressFeedback(){

  }
  handelPressOpacity(){

  }
  handelPressWithout(){
    this.setState({
      txt:'我是小红'
    })
  }
  render(){
    return (
      <View>
        <TouchableHighlight
        onPress={(e)=>{this.handelPress(e)}}>
          <Text>{this.state.txt}</Text>
        </TouchableHighlight>
        <TouchableNativeFeedback onPress={this.handelPressFeedback.bind(this)}>
        <View style={{height:100}}>
          <Text>我是小红</Text>
        </View>
        </TouchableNativeFeedback>

        <TouchableOpacity
         onPress={this.handelPressOpacity.bind(this)}>
          <Text>{this.state.txt}</Text>
        </TouchableOpacity>

        <TouchableWithoutFeedback 
        onPress={this.handelPressWithout.bind(this)}>
          <View>
            <Text>{this.state.txt}</Text>
          </View>
        </TouchableWithoutFeedback>

      </View>
    );
  }
}

const styles={
    container:{
      flex:1,
      flexDirection:'row', // column
      justifyContent:'space-between',
      alignItems:'stretch'
    },
    XM:{
      //flex:1, 
      width:10  // 不要写像素单位
    },
    XMH:{
      flex:1,
      backgroundColor:'#3ef'
    },
    XH:{
      flex:1,
      backgroundColor:'#f00'
    },
    txt:{
      color:'#ff0'
    }
}

// 注册一个App
AppRegistry.registerComponent('nativeApp', () => nativeApp);
