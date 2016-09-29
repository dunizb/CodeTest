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
      movies:null
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
          movies:data.movies
        })
      })

    // 这个在浏览器中也能用,是用来发请求
    // fetch(REQUEST_URL)
    //   .then(function(response){
    //     // 本次return的值，是下一次then中回调的参数
    //     return response.json();
    //   })
    //   .then(function(data){
    //     // 这里的data就是我们得到的数据
    //     console.log(data);
    //     // 这里要注意this.指向
    //     console.log(this.setState)
    //     this.setState({
    //         movies:data.movies
    //     })
    //   })
  }
  componentDidMount(){
    this.fetchData()
  }
  render(){
    console.warn('render方法');
    if(!this.state.movies){
      // 这里可以执行loading
      // render方法最终是要return一个组件的.
     return this.renderLoading();
    }

    // var movie = MOCKED_MOVIES_DATA[0]
    var movie = this.state.movies
    return this.renderMovie(movie[0])
  }
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
      <View style={styles.container}>
          <Image style={styles.image}
          source={{uri:movie.posters.thumbnail}} />
          <View style={styles.text}>
            <Text style={styles.title}>{movie.title}</Text>
            <Text>{movie.year}</Text>
          </View>
      </View>
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
  }

}


// 注册一个App
AppRegistry.registerComponent('nativeApp', () => nativeApp);
