<template>
  <div>
    <div class="topnav-and-banner">
      <Topnav />
      <div class="banner">
        <h1>Gulu UI</h1>
        <h2>一个厉害的UI框架</h2>
        <p class="actions">
          <a href="https://github.com">Github</a>
          <router-link to="/doc">开始</router-link>
        </p>
      </div>
    </div>
    <div class="features">
      <ul>
        <li>
          <svg>
            <use xlink:href="#icon-vue"></use>
          </svg>
          <h3>基于 Vue 3</h3>
          <p>骄傲地使用了 Vue 3 Composition API</p>
        </li>
        <li>
          <svg>
            <use xlink:href="#icon-ts"></use>
          </svg>
          <h3>基于 TypeScript</h3>
          <p>源代码采用 TypeScript 书写（非严格检查）</p>
        </li>
        <li>
          <svg>
            <use xlink:href="#icon-diandengpao"></use>
          </svg>
          <h3>代码易读</h3>
          <p>每个组件的源代码都极其简洁</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Topnav from "../components/Topnav.vue";
export default {
  name: "Home",
  components: { Topnav },
};
</script>

<style lang="scss" scoped>
$green: #02bcb0;
$border-radius: 4px;
$color: #007974;
.topnav-and-banner {
  color: $color;
  background: rgb(227, 255, 253);
  background: linear-gradient(
    145deg,
    rgba(227, 255, 253, 1) 0%,
    rgba(183, 233, 230, 1) 100%
  );
  clip-path: ellipse(80% 60% at 50% 40%);
}

.features {
  display: flex;
  justify-content: center;
  align-content: center;
  margin: 20px 0;
  > ul {
    display: flex;
    flex-wrap: wrap;
    > li {
      margin: 16px 15px;
      display: grid;
      justify-content: start;
      align-content: space-between;
      grid-template-areas:
        "icon title"
        "icon text";
      grid-template-columns: 80px auto;
      grid-template-rows: 1fr auto;
      > svg {
        grid-area: icon;
        width: 64px;
        height: 64px;
      }
      > h3 {
        grid-area: title;
        font-size: 28px;
      }
      > p {
        grid-area: text;
      }
    }
  }

  // @media (min-width: 800px) {
  //   width: 800px;
  //   > ul {
  //     > li {
  //       width: 50%;
  //     }
  //   }
  // }
  // @media (min-width: 1200px) {
  //   width: 1200px;
  //   > ul {
  //     > li {
  //       width: 33.33333%;
  //     }
  //   }
  // }
}
.banner {
  color: $color;
  padding: 100px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  > .actions {
    padding: 8px 0;
    a {
      margin: 0 8px;
      background: $green;
      color: white;
      display: inline-block;
      padding: 8px 24px;
      border-radius: $border-radius;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
</style>
