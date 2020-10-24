<template>
	<view class="content">
    <!-- 状态栏 -->
		<todoHeader 
      v-if="list.length !== 0 || finishList.length !== 0"
      :tabCount="tabCount"
      @onChange="init"
      @onTab="onTab">
		</todoHeader>
    
    <scroll-view :scroll-y="true">
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
      <todoItems v-else 
        :list="list" 
        :finishList="finishList" 
        :swipeOptions="swipeOptions"
        @onChange="init" 
        @onSwipe="init"></todoItems>
    </scroll-view>
    <!-- 创建按钮 -->
    <view class="create-todo" @click="create">
      <text class="iconfont icon-add1" :class="{'create-todo-active': textShow}"></text>
    </view>
    
    <!-- 输入框 -->
    <view class="create-content" :class="{'create--show': textShow}" v-if="active">
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
  import todoItems from '@/components/todo-items/todo-items.vue'
  import todoHeader from '@/components/todo-header/todo-header.vue'
	export default {
    components: {
      todoItems,
      todoHeader
    },
		data() {
			return {
        list: [],       // 未完成的todo
        finishList: [], // 已完成的todo
        active: false,
        textShow: false,
        value: "",
        activeTab: "all",
        tabCount: {
          all: 0,
          todo: 0,
          finish: 0,
          recycle: 0
        },
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
    watch:{
      'list'(newVal) {
        this.tabCount.all = this.tabAllCount();
        this.tabCount.todo = this.tabTodoCount();
        this.tabCount.finish = this.tabFinishTodoCount();
        this.tabCount.recycle = this.tabRecycleTodoCount();
      }
    },
		onLoad() {
      this.init();
		},
    onShow() {
      this.init();
    },
		methods: {
      init() {
        this.list = this.getLocalStorage().todos;
        this.finishList = this.getLocalStorage().finishTodos;
      },
      // 状态栏各状态计数
      tabAllCount() {
        const {todos} = this.getLocalStorage();
        const {finishTodos} = this.getLocalStorage();
        return todos.length + finishTodos.length;
      },
      tabTodoCount() {
        return this.getLocalStorage().todos.length;
      },
      tabFinishTodoCount() {
        return this.getLocalStorage().finishTodos.length;
      },
      tabRecycleTodoCount() {
        return this.getLocalStorage().recyclesTodos.length;
      },
      getLocalStorage() {
        return {
          todos: uni.getStorageSync('todo') || [],
          finishTodos: uni.getStorageSync('todo-finish') || [],
          recyclesTodos: uni.getStorageSync('recycles') || []
        }
      },
      create() {
        if(this.active) {
          this.close();
        } else {
          this.open();
        }
      },
      // 打开关闭动画
      open() {
        this.active = true;
        this.$nextTick(() => {
          setTimeout(() => {
            this.textShow = true;
          }, 50)
        })
      },
      close() {
        this.textShow = false;
        this.$nextTick(() => {
          setTimeout(() => {
            this.active = false;
          }, 350)
        })
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
        this.close()
      },
      onTab(data) {
        this.list = data.list;
        this.finishList = data.finishList;
      }
		}
	}
</script>

<style>
  @import "./index.css"
</style>
