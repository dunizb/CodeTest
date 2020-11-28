<template>
  <template v-if="visible">
    <!-- Vue3新增组件：https://v3.cn.vuejs.org/guide/teleport.html#teleport -->
    <Teleport to="body">
      <div class="gulu-dialog-overlay" @click="onClickOverlay"></div>
      <div class="gulu-dialog-wrapper">
        <div class="gulu-dialog">
          <header>
            <slot name="title" />
            <span class="gulu-dialog-close" @click="onClose"></span>
          </header>
          <main>
            <slot name="content" />
          </main>
          <footer>
            <Button @click="onCancel">取消</Button>
            <Button level="primary" @click="onOk">确定</Button>
          </footer>
        </div>
      </div>
    </Teleport>
  </template>
</template>

<script lang="ts">
import Button from "./Button.vue";
export default {
  name: "Dialog",
  components: { Button },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    ok: Function,
    cancel: Function,
    title: {
      type: String,
      default: "提示",
    },
  },
  setup(props, context) {
    const onClose = () => {
      context.emit("update:visible", false);
    };
    const onClickOverlay = () => {
      if (props.closeOnClickOverlay) {
        onClose();
      }
    };
    const onCancel = () => {
      // ?. => ES2020可选链操作符
      props.cancel?.();
      onClose();
    };
    const onOk = () => {
      if (props.ok && props.ok() !== false) {
        onClose();
      }
    };

    return { onClose, onClickOverlay, onCancel, onOk };
  },
};
</script>

<style lang="scss">
$radius: 4px;
$border-color: #d9d9d9;

.gulu-dialog {
  background: white;
  border-radius: $radius;
  box-shadow: 0 0 3px fade_out(black, 0.5);
  min-width: 24em;
  max-width: 90%;
  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: fade_out(black, 0.5);
    z-index: 10;
  }
  &-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }
  > header {
    padding: 12px 16px;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
  }
  > main {
    padding: 12px 16px;
  }
  > footer {
    border-top: 1px solid $border-color;
    padding: 12px 16px;
    text-align: right;
  }
  &-close {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;
    &::before,
    &::after {
      content: "";
      position: absolute;
      height: 1px;
      background: black;
      width: 100%;
      top: 50%;
      left: 50%;
    }
    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }
    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}
</style>
