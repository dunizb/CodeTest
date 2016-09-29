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
// var MOCKED_MOVIES_DATA = [
//   {title: '标题', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
// ];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class nativeApp extends Component {
  constructor(){
    super()
    this.state={
      // movies:null
      ds:new ListView.DataSource({rowHasChanged:(row1,row2) => row1!==row2})
    }
    // 改变fetchData方法里的this
    // bind方法改变方法中的this指向,返回一个全新的function,与原来的function唯一的区别就是this指向不同
    this.fetchData = this.fetchData.bind(this)
  }


  // 这个方法是为了要去获取数据
  fetchData(){
    console.log(this.setState)
    fetch(REQUEST_URL)
      .then( response => response.json() )
      .then( data =>{
        console.log(this.setState);
        this.setState({
          // movies:data.movies
          dataSource: this.state.ds.cloneWithRows(data.movies)
        })
      })
  }
  componentDidMount(){
    this.fetchData()
  }
  handlePress(){
    var data = Math.random()
    this.setState({
      tmp:data
    })
  }
  render(){
    console.warn('render方法');
    if(!this.state.dataSource){
      // 这里可以执行loading
      // render方法最终是要return一个组件的.
     return this.renderLoading();
    }

    // var movie = MOCKED_MOVIES_DATA[0]
    // var movie = this.state.dataSrouce.movies
    // return this.renderMovie(movie[0])
    return (
        <View >
          <View style={styles.topBg}>
            <Text style={styles.topTitle}>这是我们的标题</Text>
          </View>
        <ListView 
          style={styles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData)=>{
            return(
                this.renderMovie(rowData)
              )
          }}
        />
        </View>
      )
  }
  // TouchableNativeFeedback
  // 自定义方法
  renderLoading(){
    return (
        <View style={styles.container}>
          <Text>正在加载中...</Text>
        </View>
      )
  }
  // 自定义的方法
  renderMovie(movie){
    console.log(movie);
    return (
      <TouchableNativeFeedback 
      onPress={this.handlePress.bind(this)}
      background={TouchableNativeFeedback.Ripple('#F23131',false)}>
      <View style={styles.container}>
          <Image style={styles.image}
          source={{uri:movie.posters.detailed}} />
          <View style={styles.text}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text>{movie.year}</Text>
            <Text>{this.state.tmp}</Text>
          </View>
      </View>
      </TouchableNativeFeedback>
  )
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
  },
  listView:{
    // marginTop:49
  },
  topBg:{
    // flex:1,
    height:49,
    // alignItems:'center',
    // justifyContent:'center',
    backgroundColor:'#403C3C'
  },
  topTitle:{
    // textAlign:'center',
    fontSize:30,
    color:'#fff'
  }


}


// 注册一个App
AppRegistry.registerComponent('nativeApp', () => nativeApp);
