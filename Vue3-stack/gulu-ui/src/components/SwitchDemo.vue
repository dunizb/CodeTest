<template>
  <div>
    <h1>Switch 组件示例</h1>
    <Demo :component="Switch1Demo" />
    <Demo :component="Switch2Demo" />
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import Switch1Demo from "../components/Switch1.demo.vue";
import Switch2Demo from "../components/Switch2.demo.vue";
import Demo from "./Demo.vue";
// console.log(Switch1Demo.__sourceCode);
export default {
  name: "SwitchDemo",
  components: { Demo },
  setup() {
    return {
      Switch1Demo,
      Switch2Demo,
    };
  },
};
</script>
