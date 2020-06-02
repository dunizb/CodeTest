<template>
	<view class="content">
    <view class="todo-header">
      <!-- 状态栏左侧 -->
      <view class="todo-header__left">
        <view class="todo-header__left-item">{{list.length}} 条记录</view>
      </view>
      <!-- 状态栏右侧 -->
      <view class="todo-header__right">
        <view class="todo-header__right-item item-danger" @click="thoroughDelete"><image src="../../static/huishouzhang.png" mode="aspectFit"></image>彻底删除</view>
        <view class="todo-header__right-item item-info" @click="allRecover"><image src="../../static/ok.png" mode="aspectFit"></image>全部恢复</view>
      </view>
    </view>
	  <scroll-view :scroll-y="true">
	  	<todoItems 
        :list="list" 
        :swipeOptions="swipeOptions" 
        @onSwipe="init"
        @onRecover="init"></todoItems>
	  </scroll-view>
	</view>
</template>

<script>
  import todoItems from '@/components/todo-items/todo-items.vue'
	export default {
    components: {
      todoItems
    },
		data() {
			return {
				list: [],
        swipeOptions: [
          {
            text: '恢复',
            style: {
              backgroundColor: '#0baf0b'
            }
          }
        ]
			}
		},
    onLoad() {
      console.log('onLoad')
    },
    onShow() {
      console.log('onShow')
      this.init();
    },
		methods: {
			init() {
        this.list = uni.getStorageSync('recycles') || []
      },
      thoroughDelete() {
        uni.showModal({
          title: '提示',
          content: '确定彻底删除吗？删除后不可恢复！',
          success: (res) => {
            if(res.confirm) {
              uni.removeStorage({
                key: 'recycles',
                success() {
                  uni.showToast({
                    title: '操作成功',
                    duration: 2000
                  })
                }
              })
              setTimeout(() => {
                uni.navigateBack({
                  delta: 1
                })
              }, 800)
            }
          }
        });
      },
      allRecover() {
        uni.showModal({
          title: '提示',
          content: '确定全部恢复吗？',
          success: (res) => {
            if(res.confirm) {
              const recycles = uni.getStorageSync('recycles') || [];
              const todo = uni.getStorageSync('todo') || [];
              const todoFinish = uni.getStorageSync('todo-finish') || [];
              recycles.forEach(item => {
                if(item.checked) {
                  todoFinish.push(item);
                } else {
                  todo.push(item);
                }
              });
              uni.setStorageSync('todo', todo);
              uni.setStorageSync('todo-finish', todoFinish);
              uni.removeStorage({
                key: 'recycles',
                success() {
                  uni.showToast({
                    title: '操作成功',
                    duration: 2000
                  })
                }
              })
              setTimeout(() => {
                uni.navigateBack({
                  delta: 1
                })
              }, 800)
            }
          }
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
.todo-header__left, .todo-header__right{
  display: flex;
}
.item-danger {
  color: red;
  margin-right: 10px;
}
.item-info{
  color: #0baf0b;
}
.todo-header__right-item image{
  width: 16px;
  height: 16px;
  vertical-align: middle;
  margin-right: 3px;
}
</style>
