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
  ScrollView
} from 'react-native';

class nativeApp extends Component {
  constructor(){
    super()
  }
  render(){
    return (
      <ScrollView>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
        <Text style={{fontSize:40}}>我是小明</Text>
      </ScrollView>
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
