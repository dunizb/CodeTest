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

// 电影数据
var MOCKED_MOVIES_DATA = [
  {title: '标题', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

class nativeApp extends Component {
  constructor(){
    super()
  }

  render(){
    var movie = MOCKED_MOVIES_DATA[0]
    return (
      <View style={styles.container}>
          <Image style={styles.image} source={{uri:movie.posters.thumbnail}} />
          <View style={styles.text}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text>{movie.year}</Text>
          </View>
      </View>
    );
  }
}

const styles ={
  container:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#F6BEBE'
  },
  image:{
    width:100,
    height:120,
    borderRadius:20,
    marginLeft:10
  },
  text:{
    flex:1,
    paddingLeft:20,
  },
  title:{
    fontSize:30
  }

}


// 注册一个App
AppRegistry.registerComponent('nativeApp', () => nativeApp);
