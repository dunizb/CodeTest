<template>
  <div class="gulu-tabs">
    <div class="gulu-tabs-nav" ref="container">
      <div
        class="gulu-tabs-nav-item"
        :class="{ selected: title === selected }"
        v-for="(title, index) in titles"
        :key="index"
        :ref="
          (el) => {
            if (title === selected) selectedItem = el;
          }
        "
        @click="select(title)"
      >
        {{ title }}
      </div>
      <div class="gulu-tabs-nav-indicator" ref="indicator"></div>
    </div>
    <div class="gulu-tabs-content">
      <component
        class="gulu-tabs-content-item"
        :class="{ selected: comp.props.title === selected }"
        v-for="(comp, index) in defaults"
        :key="index"
        :is="comp"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import Tab from "./Tab.vue";
export default {
  name: "Tabs",
  props: {
    selected: String,
  },
  setup(props, context) {
    const defaults = context.slots.default();
    const selectedItem = ref<HTMLDivElement>(null);
    const indicator = ref<HTMLDivElement>(null);
    const container = ref<HTMLDivElement>(null);

    // watchEffect挂载前就加载了一次
    onMounted(() => {
      watchEffect(
        () => {
          const {
            width,
            left: leftI,
          } = selectedItem.value.getBoundingClientRect();
          indicator.value.style.width = width + "px";
          const {
            left: leftC,
          } = container.value.getBoundingClientRect();

          const left = leftI - leftC;
          indicator.value.style.left = left + "px";
        },
        {
          flush: "post",
        }
      );
    });
    // 检查子组件类型
    defaults.forEach((tag) => {
      // @ts-ignore
      if (tag.type.name !== Tab.name) {
        throw new Error("Tabs的子标签必须是Tab");
      }
    });
    const titles = defaults.map((tag) => {
      return tag.props.title;
    });
    const select = (title: string) => {
      context.emit("update:selected", title);
    };

    return {
      selectedItem,
      container,
      indicator,
      defaults,
      titles,
      select,
    };
  },
};
</script>

<style lang="scss">
$blue: #40a9ff;
$color: #333;
$border-color: #d9d9d9;

.gulu-tabs {
  &-nav {
    display: flex;
    color: $color;
    border-bottom: 1px solid $border-color;
    position: relative;

    &-item {
      padding: 8px 0;
      margin: 0 16px;
      cursor: pointer;
      &:first-child {
        margin-left: 0;
      }
      &.selected {
        color: $blue;
      }
    }
    &-indicator {
      position: absolute;
      height: 3px;
      background: $blue;
      left: 0;
      bottom: -1px;
      width: 100px;
      transition: all 250ms;
    }
  }
  &-content {
    padding: 8px 0;
    &-item {
      display: none;
      &.selected {
        display: block;
      }
    }
  }
}
</style>
