<template>
  <div id="app">
    <!-- <div id="cover"></div> -->
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>  
</template>

<script>
import Header from "./layout/header.vue";
import Footer from "./layout/footer.jsx";
import Todo from "./views/todo/todo.vue";

export default {
  components: {
    Header,
    Footer,
    Todo
  },
  mounted() {
  },
  methods: {
    notify() {
      this.$notify({
        content: '哈哈哈哈'
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #555;
  opacity: 0.5;
  z-index: -1;
}
</style>