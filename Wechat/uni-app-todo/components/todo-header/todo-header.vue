<template>
	<view class="todo-header">
	  <!-- 状态栏左侧 -->
	  <view class="todo-header__left">
	    <view class="todo-header__left-item" :class="{'active-tab': activeTab === 'all'}" @click="getAllList">全部({{tabCount.all}})
      </view>
	    <view class="todo-header__left-item" :class="{'active-tab': activeTab === 'todo'}" @click="getTodoList">待办({{tabCount.todo}})
      </view>
	    <view class="todo-header__left-item" :class="{'active-tab': activeTab === 'finish'}" @click="getFinishList">已完成({{tabCount.finish}})</view>
	  </view>
	  <!-- 状态栏右侧 -->
	  <view class="todo-header__right">
	    <view class="todo-header__right-item" @click="toRecycle">回收站({{tabCount.recycle}})</view>
	  </view>
	</view>
</template>

<script>
	export default {
    props:{
      tabCount: {
        type: Object,
        default: () => {
          return {
            all: '',
            todo: '',
            finish: ''
          }
        }
      }
    },
		data() {
			return {
				activeTab: 'all'
			};
		},
    methods: {
      getAllList() {
        this.activeTab = 'all';
        this.$emit('onChange');
      },
      getTodoList() {
        this.finishList = [];
        this.list = uni.getStorageSync('todo') || [];
        this.activeTab = 'todo';
        this.$emit('onTab', {
          list: this.list,
          finishList: this.finishList,
        });
      },
      getFinishList() {
        this.list = [];
        this.finishList = uni.getStorageSync('todo-finish') || [];
        this.activeTab = 'finish';
        this.$emit('onTab', {
          list: this.list,
          finishList: this.finishList,
        });
      },
      toRecycle() {
        uni.navigateTo({
          url: '../../pages/recycle/recycle'
        })
      }
    }
	}
</script>

<style>
.todo-header{
  position: fixed;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items:center;
  padding: 0 15px;
  font-size: 12px;
  color: #333333;
  height: 45px;
  box-shadow: -1px 1px 5px 0px rgba(0,0,0,.1);
  background-color: #FFFFFF;
  z-index: 10;
}
/* todo-header__left{
  width: 100%;
} */
.todo-header__right{
   
}
.todo-header__left{
  display: flex;
}
.todo-header__left-item {
  padding: 0 5px;
}
.active-tab {
  color: #279abf;
}
</style>
