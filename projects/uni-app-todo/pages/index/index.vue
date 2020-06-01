<template>
	<view class="content">
		<view class="todo-header" v-if="list.length !== 0 || finishList.length !== 0">
      <!-- 状态栏左侧 -->
		  <view class="todo-header__left">
		    <text class="active-text">全部</text>
        <text>{{allCount}}条</text>
		  </view>
      <!-- 状态栏右侧 -->
      <view class="todo-header__right">
        <view class="todo-header__right-item" :class="{'active-tab': activeTab === 'all'}" @click="getAllList">全部</view>
        <view class="todo-header__right-item" :class="{'active-tab': activeTab === 'todo'}" @click="getTodoList">待办</view>
        <view class="todo-header__right-item" :class="{'active-tab': activeTab === 'finish'}" @click="getFinishList">已完成</view>
      </view>
		</view>
    
    <!-- 没有数据的状态 -->
    <view v-if="list.length === 0 && finishList.length === 0" class="default">
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
      <!-- 未完成的todo -->
      <uniSwipeAction>
        <uniSwipeActionItem :options="swipeOptions" show="true" class="todo-list" :class="{'todo--finish': item.checked}" v-for="item in list" :key="item.id">
          <view class="todo-list__checkbox">
            <view class="checkbox" @click="changeFinish(item.id, item.checked)"></view>
          </view>
          <view class="todo-list__context">
            {{item.content}}
          </view>
        </uniSwipeActionItem>
      </uniSwipeAction>
      
      <!-- 已完成的todo -->
      <uniSwipeAction>
        <uniSwipeActionItem :options="swipeOptions" show="true" class="todo-list todo--finish" v-for="item in finishList" :key="item.id">
          <view class="todo-list__checkbox">
            <view class="checkbox" @click="changeFinish(item.id, item.checked)"></view>
          </view>
          <view class="todo-list__context">
            {{item.content}}
          </view>
        </uniSwipeActionItem>
      </uniSwipeAction>
    </view>
    
    <!-- 创建按钮 -->
    <view class="create-todo" @click="create">
      <text class="iconfont icon-add1" :class="{'active': active}"></text>
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
  import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
  import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	export default {
    components: {
      uniSwipeAction,
      uniSwipeActionItem
    },
		data() {
			return {
				list: [],       // 未完成的todo
        finishList: [], // 已完成的todo
        active: false,
        value: "",
        activeTab: "all",
        swipeOptions: [
          {
            text: '删除',
            style: {
              backgroundColor: 'red'
            }
          }
        ]
			}
		},
		onLoad() {
      this.init();
		},
    computed: {
      allCount() {
        return this.list.length + this.finishList.length;
      }
    },
		methods: {
      init() {
        this.list = uni.getStorageSync('todo') || [];
        this.finishList = uni.getStorageSync('todo-finish') || [];
      },
      create() {
        this.active = !this.active;
      },
      add() {
        if(this.value === "") {
          uni.showToast({
            title: '请输入内容',
            icon: 'none'
          })
          return;
        }
        this.list.unshift({
          id: 'id' + Date.now(),
          content: this.value,
          checked: false
        });
        uni.setStorageSync('todo', this.list);
        uni.setStorageSync('todo-finish', this.finishList);
        this.value = '';
      },
      changeFinish(id, checked) {
        // debugger
        let todo = null
        let index = null
        // 状态已完成，从finishList中移出，再插入list中
        if(checked) {
          todo = this.finishList.find(item => id === item.id);
          index = this.finishList.findIndex(item => id === item.id);
          todo.checked = !todo.checked
          this.list.unshift(todo);
          this.finishList.splice(index, 1);
        } else {
          todo = this.list.find(item => id === item.id);
          index = this.list.findIndex(item => id === item.id);
          todo.checked = !todo.checked
          this.finishList.unshift(todo);
          this.list.splice(index, 1);
        }
        uni.setStorageSync('todo', this.list);
        uni.setStorageSync('todo-finish', this.finishList);
      },
      getAllList() {
        this.init();
        this.activeTab = 'all';
      },
      getTodoList() {
        this.finishList = [];
        this.list = uni.getStorageSync('todo') || [];
        this.activeTab = 'todo';
      },
      getFinishList() {
        this.list = [];
        this.finishList = uni.getStorageSync('todo-finish') || [];
        this.activeTab = 'finish';
      }
		}
	}
</script>

<style>
  @import "./index.css"
</style>
