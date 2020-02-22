<template>
  <section class="real-app">
    <div class="tab-container">
      <tabs :value="filter" @change="handleChangeTab">
        <tab :label="tab" :index="tab" v-for="tab in status" :key="tab" />
      </tabs>
    </div>
    <input type="text"
      class="add-input"
      autofocus="autofocus"
      placeholder="接下来要做什么?"
      @keyup.enter="addTodo">
    <Item v-for="todo in filteredTodos"
      :key="todo.id"
      :todo="todo"
      @del="deleteTodo"></Item>
    <helper :filter="filter"
      :todos="todos"
      @clearAllCompleted="clearAllCompleted"></helper>
  </section>
</template>

<script>
import Item from "./items.vue";
import helper from "./helper.vue";

let id = 0;

export default {
  data() {
    return {
      todos: [],
      filter: "all",
      status: ["all", "active", "completed"]
    };
  },
  computed: {
    filteredTodos() {
      if (this.filter === "all") {
        return this.todos;
      }
      const completed = this.filter === "completed";
      // 将todos数组中，completed为true的值过滤出来，并返回一个新数组
      return this.todos.filter(todo => completed === todo.completed);
    }
  },
  components: {
    Item,
    helper
  },
  methods: {
    addTodo(e) {
      if (e.target.value.trim()) {
        this.todos.unshift({
          id: id++,
          content: e.target.value.trim(),
          completed: false
        });
        e.target.value = "";
      } else {
        alert("傻X，输入不能为空 !-_-");
      }
    },
    deleteTodo(id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1);
      this.$notify({content: '删除成功'});
    },
    clearAllCompleted() {
      // 给todos赋一个新的值（即todo.completed为false的值）
      this.todos = this.todos.filter(todo => todo.completed === false);
    },
    handleChangeTab(value) {
      this.filter = value;
    }
  }
};
</script>

<style lang="stylus" scoped>
.real-app {
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}

.add-input {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  font-smoothing: antialiased;
  padding: 16px 16px 16px 36px;
  border: none;
  box-shadow: inset 0 -2px 1px rgba(0, 0, 0, 0.03);
}
.tab-container
  background-color: #fff
  padding: 0 15px
</style>
