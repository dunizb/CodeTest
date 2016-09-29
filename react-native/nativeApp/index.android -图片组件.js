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
  Image // 所有使用的组件都必需引入进来
} from 'react-native';

class nativeApp extends Component {
  constructor(){
    super()
    this.state={
      text:'我是小明，我找小红'
    }
  }
  render(){
    return (
      <View>
        <Text>faf</Text>
         <Image source={require('./testa.png')}></Image>
        
         <Image style={{flex:1,height:100}} source={{uri:'https://facebook.github.io/react/img/logo_og.png'}}>
          <Text style={{color:'#fff'}}>我是小明</Text>
         </Image>
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
