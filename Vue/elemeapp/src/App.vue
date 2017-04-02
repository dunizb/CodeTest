<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <a v-link="{path:'/goods'}">商品</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/ratings'}">评论</a>
      </div>
      <div class="tab-item">
        <a v-link="{path:'/seller'}">商家</a>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <!--keep-alive:生命周期不会被重新加载-->
    <router-view :seller="seller" keep-alive></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {urlParse} from './common/js/utils.js';
  import Header from './components/header/header.vue';

  const ERR_OK = 0;

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            return queryParam.id;
          })()
        }
      };
    },
    created() {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.seller = response.data;
          this.seller = Object.assign({}, this.seller, response.data);
        }
      });
    },
    components: {
      'v-header': Header
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "./common/less/mixin.less";

  .tab{
    display: flex;
    width:100%;
    height: 40px;
    line-height:40px;
    .border-1px(rgba(7,17,27,.1));

    .tab-item{
      flex:1;
      text-align: center;

      a{
        display: block;
        font-size:14px;
        color: rgb(77,85,93);
        &.active{
          color: red;
        }
      }
    }
  }
</style>
