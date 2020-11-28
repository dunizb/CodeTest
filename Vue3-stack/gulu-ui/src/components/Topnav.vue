<template>
  <div class="topnav">
    <router-link to="/" class="logo">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zhanghu"></use>
      </svg>
    </router-link>
    <ul class="menu">
      <li>
        <router-link to="/doc">文档</router-link>
      </li>
    </ul>
    <svg
      v-if="toggleAsideIsView"
      class="toggleAside"
      @click="toggleAside"
    >
      <use xlink:href="#icon-menu1"></use>
    </svg>
  </div>
</template>

<script lang="ts">
import { inject, Ref } from "vue";
export default {
  name: "Topnav",
  props: {
    toggleAsideIsView: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const asideVisible = inject<Ref<boolean>>("asideVisible");
    const toggleAside = () => {
      asideVisible.value = !asideVisible.value;
    };

    return {
      toggleAside,
    };
  },
};
</script>

<style lang="scss" scoped>
$color: #007974;
.topnav {
  color: $color;
  display: flex;
  padding: 16px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  justify-content: center;
  align-items: center;

  > .logo {
    max-width: 6em;
    margin-right: auto;
    > svg {
      width: 32px;
      height: 32px;
    }
  }

  > .menu {
    display: flex;
    white-space: nowrap;
    flex-wrap: nowrap;

    > li {
      margin: 0 1em;
    }
  }

  > .toggleAside {
    display: none;
    width: 32px;
    height: 32px;
    position: absolute;
    left: 16px;
    top: 50%;
    z-index: 20;
    transform: translateY(-50%);
    // background: fade-out(#000000, 0.9);
    cursor: pointer;
  }

  @media (max-width: 500px) {
    > .menu {
      display: none;
    }

    > .logo {
      margin: 0 auto;
    }

    > .toggleAside {
      display: inline-block;
    }
  }
}
</style>
