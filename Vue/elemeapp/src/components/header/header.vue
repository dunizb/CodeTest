<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img style="width:64px;height:64px;" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icomoon icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icomoon icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="satr-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text">{{seller.supports[$index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close">
        <i class="icomoon icon-close" @click="hideDetail"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from 'components/star/star';

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      };
    },
    methods: {
      showDetail() {
        this.detailShow = true;
      },
      hideDetail() {
        this.detailShow = false;
      }
    },
    created() {
      this.classMap = [ 'decrease', 'discount', 'special', 'invoice', 'guarantee' ];
    },
    components: {
      star
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../common/less/mixin.less";
  @import "../../common/less/icon.less";

  .header{
    color: #fff;
    position: relative;
    background-color: rgba(7,17,27,.2);
    overflow: hidden;

    .content-wrapper{
      position: relative;
      padding: 24px 12px 18px 24px;
      font-size: 0;

      .avatar{
        display: inline-block;
        vertical-align: top;
        border-radius: 3px;
      }
      .content{
        margin-left: 16px;
        display: inline-block;

        .title{
          margin: 2px 0 8px 0;

          .brand{
            vertical-align: top;
            width: 30px;
            height: 18px;
            display: inline-block;
            background-image: url("brand@2x.png");
            background-size: 30px 18px;
            background-repeat: no-repeat;
          }
          .name{
            margin-left:6px;
            font-size: 16px;
            line-height:18px;
            font-weight: bold;
          }
        }
        .description{
          margin-bottom:10px;
          line-height:12px;
          font-size: 12px;
        }
        .support{
          .icon{
            display: inline-block;
            vertical-align: top;
            width: 12px;
            height:12px;
            margin-right:4px;
            -webkit-background-size:12px 12px;
            background-size:12px 12px;
            background-repeat: no-repeat;

            &.decrease{
              background-image: url("decrease_1@2x.png");
            }
            &.discount{
              background-image: url("discount_1@2x.png");
            }
            &.guarantee{
              background-image: url("guarantee_1@2x.png");
            }
            &.invoice{
              background-image: url("invoice_1@2x.png");
            }
            &.special{
              background-image: url("special_1@2x.png");
            }
          }
          .text{
            line-height:12px;
            font-size: 12px;

          }
        }
      }
      .support-count{
        position: absolute;
        right:12px;
        bottom: 18px;
        padding: 0 8px;
        height:24px;
        line-height:24px;
        border-radius: 14px;
        background-color: rgba(0,0,0,.2);
        text-align: center;

        .count{
          vertical-align: top;
          font-size: 12px;
        }
        .icon-keyboard_arrow_right{
          line-height:24px;
          margin-left: 2px;
          font-size: 12px;
        }
      }
    }
    .bulletin-wrapper{
      height: 28px;
      line-height:28px;
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      position: relative;
      background-color: rgba(7,17,27,.2);

      .bulletin-title{
        display: inline-block;
        vertical-align: top;
        margin-top:8px;
        width: 22px;
        height: 12px;
        background-image: url("bulletin@2x.png");
        background-size: 22px 12px;
        background-repeat: no-repeat;
      }
      .bulletin-text{
        vertical-align: top;
        margin: 0 4px;
        font-size: 12px;
        font-weight: 200;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        font-size: 12px;
        right: 12px;
        top: 1px;
      }
    }
    .background{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
    }
    .detail{
      position: fixed;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      top: 0;
      left: 0;
      background-color: rgba(7,17,27,.8);
      transition:all 0.5s;
      -webkit-backdrop-filter: blur(10px);

      &.fade-transition{
        opacity: 1;
        background: rgba(7,17,27,.8);
      }
      &.fade-enter,&.fade-leave {
        opacity: 0;
        background: rgba(7,17,27,0);
      }

      .detail-wrapper{
        min-height: 100%;
        width: 100%;

        .detail-main{
          margin-top: 64px;
          padding-bottom: 64px;

          .name{
            font-size: 16px;
            line-height: 16px;
            text-align: center;
            font-weight: 700;
          }
          .satr-wrapper{
            margin-top: 18px;
            padding: 2px 0;
            text-align: center;
          }
          .title{
            display: flex;
            width: 80%;
            margin: 28px auto 24px auto;

            .line{
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255,255,255,.2);
            }
            .text{
              padding: 0 12px;
              font-size: 14px;
              font-weight: 700;
            }
          }
          .supports{
            width: 80%;
            margin: 0 auto;

            .support-item{
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &.last-child{
                margin-bottom: 0;
              }

              .icon{
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 16px 16px;
                background-repeat: no-repeat;

                &.decrease{
                  background-image: url("decrease_2@2x.png");
                }
                &.discount{
                  background-image: url("discount_2@2x.png");
                }
                &.guarantee{
                  background-image: url("guarantee_2@2x.png");
                }
                &.invoice{
                  background-image: url("invoice_2@2x.png");
                }
                &.special{
                  background-image: url("special_2@2x.png");
                }
              }
              .text{
                line-height:16px;
                font-size: 12px;
              }
            }
          }
          .bulletin{
            width: 80%;
            margin: 0 auto;

            .content{
              padding: 0 12px;
              line-height:24px;
              font-size: 12px;
            }
          }
        }
      }
      .detail-close{
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
      }
    }
  }
</style>
