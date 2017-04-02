<template>
  <div class="cartcontrol">
    <div class="cart-decrease" @click.stop.prevent="decreaseCart" v-show="food.count>0" transition="move">
      <span class="inner icomoon icon-remove_circle_outline"></span>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icomoon icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        // 防止响应两次
        if (!event._constructed) {
          return;
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$dispatch('cart-add', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .cartcontrol{
    font-size: 0;
    .cart-decrease{
      display: inline-block !important;
      padding: 6px;
      &.move-transition{
        opacity: 1;
        transform: translate3d(0,0,0);
        .inner{
          display: inline-block;
          line-height: 24px;
          font-size: 24px;
          color: rgb(0,160,220);
          transition: all 0.4s linear;

        }
      }
      &.move-enter,&.move-leave{
        opacity: 0;
        transform: translate3d(24px,0,0);
        .inner{
          transform: rotate(180deg);
        }
      }
    }
    .cart-count{
      display: inline-block !important;
      vertical-align: top;
      width: 12px;
      padding-top: 6px;
      line-height: 24px;
      text-align: center;
      font-size: 12px;
      color: rgb(147,153,159);
    }
    .cart-add{
      display: inline-block !important;
      padding: 6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0,160,220);
    }
  }
</style>

