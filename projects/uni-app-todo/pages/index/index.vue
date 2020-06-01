<template>
	<view class="content">
		<view class="todo-header" v-if="list.length !== 0">
      <!-- 状态栏左侧 -->
		  <view class="todo-header__left">
		    <text class="active-text">全部</text>
        <text>10条</text>
		  </view>
      <!-- 状态栏右侧 -->
      <view class="todo-header__right">
        <view class="todo-header__right-item active-tab">全部</view>
        <view class="todo-header__right-item">待办</view>
        <view class="todo-header__right-item">已完成</view>
      </view>
		</view>
    
    <!-- 没有数据的状态 -->
    <view v-if="list.length == 0" class="default">
      <view class="image-default">
        <image src="../../static/default.png" mode="aspectFit"></image>
      </view>
      <view class="default-info">
        <view class="default-info__text">您还没有创建任何待办事项</view>
        <view class="default-info__text">点击下方加号创建一个吧</view>
      </view>
    </view>
    
    <!-- 内容 -->
    <view v-else class="todo-content">
      <view class="todo-list todo--finish" v-for="(item, index) in list" :key="index">
        <view class="todo-list__checkbox">
          <view class="checkbox"></view>
        </view>
        <view class="todo-list__context">
          {{item.content}}
        </view>
      </view>
    </view>
    
    <!-- 创建按钮 -->
    <view class="create-todo" @click="create">
      <text class="iconfont icon-add1"></text>
    </view>
    
    <!-- 输入框 -->
    <view class="create-content" v-if="active">
      <view class="create-content-box">
        <!-- Input输入 -->
        <view class="create-input">
          <input type="text" v-model="value" placeholder="请输入要创建的todo" />
        </view>
        <!-- 发布按钮 -->
        <view class="create-button" @click="add">创建</view>
      </view>
    </view>
  </view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
        active: false,
        value: ""
			}
		},
		onLoad() {

		},
		methods: {
      create() {
        this.active = true;
      },
      add() {
        this.list.unshift({
          content: this.value
        });
        this.value = '';
      }
		}
	}
</script>

<style>
  @import "./index.css"
</style>
