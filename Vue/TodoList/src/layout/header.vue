<template>
  <header class="main-header">
    <h1>TODO</h1>
    <ul>
      <li><a href="https://coding.net/u/dunizb/p/todo-src">源码</a></li>
      <li><a href="https://www.dunizb.com">博客</a></li>
      <li><a href="https://store.dunizb.com">小铺</a></li>
      <li><a href="https://demo.dunizb.com">小码</a></li>
      <li><a href="https://blog.dunizb.com/about/">关于我</a></li>
    </ul>
  </header>
</template>

<style lang="stylus" scoped>
.main-header {
  display:flex;
  justify-content: space-between
  text-align: center;
  background-color:rgba(0,0,0,.3)
  color:#fff
  margin-bottom 20px
  padding: 0 20px
  ul {
    padding: 0
    margin: 0
    display: flex
    justify-content: center
    align-items: center
  }
  li {
    list-style: none
    padding: 0 5px
    a {
      color: #fff
      text-decoration: none
      font-weight: 300
      font-size: 14px
      &:hover {
        text-shadow: 1px 1px 3px #fff
      }
    }
  }

  h1 {
    font-size: 24px
    margin: 0
    padding: 0
    text-shadow: 1px 1px 3px #fff
  }
}
</style>
