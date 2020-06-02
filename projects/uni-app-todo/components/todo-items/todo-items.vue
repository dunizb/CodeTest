<template>
	<view class="todo-content">
		<!-- 未完成的todo -->
    <uniSwipeAction>
      <uniSwipeActionItem v-for="item in list" :key="item.id" :options="swipeOptions" :show="true" @click="onSwipe($event, item.id, item.checked)" class="todo-list" :class="{'todo--finish': item.checked}">
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
      <uniSwipeActionItem v-for="item in finishList" :key="item.id" :options="swipeOptions" :show="true" @click="onSwipe($event, item.id, item.checked)" class="todo-list todo--finish">
        <view class="todo-list__checkbox">
          <view class="checkbox" @click="changeFinish(item.id, item.checked)"></view>
        </view>
        <view class="todo-list__context">
          {{item.content}}
        </view>
      </uniSwipeActionItem>
    </uniSwipeAction>
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
    props:{
      list: {
        type: Array,
        required: true,
        default: () => {
          return []
        }
      },
      finishList: {
        type: Array,
        required: false,
        default: () => {
          return []
        }
      },
      swipeOptions: {
        type: Array,
        required: false,
        default: () => {
          return []
        }
      }
    },
		data() {
			return {
			};
		},
    methods: {
      changeFinish(id, checked) {
        // 状态已完成，从finishList中移出，再插入list中
        if(checked) {
          const todo = this.finishList.find(item => id === item.id);
          const index = this.finishList.findIndex(item => id === item.id);
          todo.checked = !todo.checked
          this.list.unshift(todo);
          this.finishList.splice(index, 1);
        } else {
          const todo = this.list.find(item => id === item.id);
          const index = this.list.findIndex(item => id === item.id);
          todo.checked = !todo.checked
          this.finishList.unshift(todo);
          this.list.splice(index, 1);
        }
        uni.setStorageSync('todo', this.list);
        uni.setStorageSync('todo-finish', this.finishList);
        this.$emit('onChange');
      },
      onSwipe(e, id, checked) {
        let type = e.content.text;
        let msgContent = '确定删除该内容吗？';
        if(type === '恢复') {
          msgContent = '确定删恢复内容吗？';
        }
        uni.showModal({
          title: '提示',
          content: msgContent,
          success: (res) => {
            if(res.cancel) {
              return
            }
            let item = null;
            if(res.confirm) {
              if(type === '删除') {
                this.deleteItem(id, checked, item)
              }
              if(type === '恢复') {
                this.recoverItem(id, checked, item)
              }
            }
          }
        })
        this.$emit('onSwipe');
      },
      deleteItem(id, checked, item) {
        if(checked) {
          const index = this.finishList.findIndex(item => item.id === id);
          item = this.finishList.find(item => item.id === id);
          // 从已完成列表中删除
          this.finishList.splice(index, 1);
          uni.setStorageSync('todo-finish', this.finishList);
        } else {
          const index = this.list.findIndex(item => item.id === id);
          item = this.list.find(item => item.id === id);
          this.list.splice(index, 1);
          uni.setStorageSync('todo', this.list);
        } 
        this.saveRecycles(item);
        this.$emit('onChange');
      },
      recoverItem(id, checked, item) {
        // 已完成状态，保持状态
        const todos = this.getLocalStorage().todos;
        const finishTodos = this.getLocalStorage().finishTodos;
        const recycles = this.getLocalStorage().recycles;
        const index = recycles.findIndex(item => item.id === id);
        if(checked) {
          finishTodos.push(item);
        } else {
          todos.push(item);
        }
        recycles.splice(index, 1);
        this.setLocalStorage(todos, finishTodos, recycles);
      },
      // 保存到回收站列表
      saveRecycles(item) {
        const recycles = this.getLocalStorage().recycles;
        recycles.push(item);
        uni.setStorageSync('recycles', recycles);
      },
      getLocalStorage() {
        return {
          todos: uni.getStorageSync('todo') || [],
          finishTodos: uni.getStorageSync('todo-finish') || [],
          recycles: uni.getStorageSync('recycles') || []
        }
      },
      setLocalStorage(todos, finishTodos, recycles) {
        uni.setStorageSync('todo', todos);
        uni.setStorageSync('todo-finish', finishTodos);
        uni.setStorageSync('recycles', recycles);
      }
    }
	}
</script>

<style>
.todo-content {
  position: relative;
  padding-top: 45px;
  padding-bottom: 100px;
}
.todo-list{
  position: relative;
  display: flex;
  align-items: center;
  /* padding: 15px; */
  margin: 15px;
  color: #0c3854;
  font-size: 14px;
  border-radius: 10px;
  background-color: #cfebfd;
  box-shadow: -1px 1px 5px 1px rgba(0,0,0,.1);
  /* box-shadow: -1px 1px 5px 1px rgba(0,0,0,.1), -1px 2px 1px 0 rgb(255,255,255) inset; */
  overflow: hidden;
}
.todo-list::after{
  position: absolute;
  content: "";
  top: 0;
  bottom: 0;
  left: 0;
  width: 5px;
  background-color: #91d1e8;
}
.todo-list__checkbox{
  padding-right: 15px;
}

.todo--finish .checkbox{
  position: relative;
  background-color: #eee;
}
.todo--finish .checkbox::after{
  content: "";
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: #CFEBFD;
  box-shadow: 0 0 2px 0 rgba(0,0,0,.2) inset;
}
.todo--finish .todo-list__context{
  color: #999999;
}
.todo--finish.todo-list::before{
  content: "";
  position: absolute;
  top: 50%;
  left: 40px;
  right: 10px;
  height: 2px;
  margin: 0 auto;
  transform: translateY(-50%);
  background-color: #bdcdd8;
}
.todo--finish.todo-list::after{
  background-color: #ccc;
}
.checkbox {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #FFFFFF;
  box-shadow: 0 0 5px 1px rgba(0,0,0,.1);
}
</style>
