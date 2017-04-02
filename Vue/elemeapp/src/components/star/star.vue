<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item" track-by="$index"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5;
  const STAR_ON = 'on';
  const STAR_HALF = 'half';
  const STAR_OFF = 'off';

  export default{
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      itemClasses() {
        let result = [];
        let score = Math.floor(this.score * 2) / 2;
        let hasDecimal = score % 1 !== 0;
        let integer = Math.floor(score);

        for (let i = 0; i < integer; i++) {
          result.push(STAR_ON);
        }
        if (hasDecimal) {
          result.push(STAR_HALF);
        }
        while (result.length < LENGTH) {
          result.push(STAR_OFF);
        }
        return result;
      }
    }

  };
</script>

<style lang="less" rel="stylesheet/less">
  .star{
    font-size: 0;

    .star-item{
      display: inline-block;
      background-repeat: no-repeat;

    }

    &.star-48{
      .star-item{
        width: 20px;
        height: 20px;
        margin-right: 22px;
        background-size: 20px 20px;
        &.last-child{
          margin-right: 0;
        }
        &.on{
          background-image: url("star48_on@2x.png");
        }
        &.half{
          background-image: url("star48_half@2x.png");
        }
        &.off{
          background-image: url("star48_off@2x.png");
        }
      }
    }
    &.star-36{
      .star-item{
        width: 15px;
        height: 15px;
        margin-right: 5px;
        background-size: 15px 15px;
        &.last-child{
          margin-right: 0;
        }
        &.on{
          background-image: url("star36_on@2x.png");
        }
        &.half{
          background-image: url("star36_half@2x.png");
        }
        &.off{
          background-image: url("star36_off@2x.png");
        }
      }
    }
    &.star-24{
      .star-item{
        width: 10px;
        height: 10px;
        margin-right: 3px;
        background-size: 10px 10px;
        &.last-child{
          margin-right: 0;
        }
        &.on{
          background-image: url("star24_on@2x.png");
        }
        &.half{
          background-image: url("star24_half@2x.png");
        }
        &.off{
          background-image: url("star24_off@2x.png");
        }
      }
    }
  }
</style>
