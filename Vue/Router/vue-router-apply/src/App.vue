<template>
  <div id="app">
    <!-- <form>
      <label><input name="router" type="radio" :checked="picked === 'hash'" value="hash" v-model="picked">Hash模式 </label>
      <label><input name="router" type="radio" :checked="picked === 'history'" value="history" v-model="picked"> History API模式  </label>
    </form>
    <hr> -->
    <router-link to="/home">/home</router-link>
    <router-link to="/about">/about</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      picked: 'Hash模式'
    }
  },
  watch: {
    picked (val) {
      sessionStorage.setItem('router-mode', val)
      location.reload()
    }
  },
  mounted () {
  },
  components: {
  }
}
</script>

<style>
a{
  display:block;
  font-size: 16px;
}
</style>
