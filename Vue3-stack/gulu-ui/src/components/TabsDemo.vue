<template>
  <h1>Tabs 示例</h1>
  <Demo :component="Tabs1Demo" />
</template>

<script lang="ts">
import Demo from "./Demo.vue";
import Tabs1Demo from "./Tabs1.demo.vue";
export default {
  name: "TabsDemo",
  components: { Demo },
  setup() {
    return { Tabs1Demo };
  },
};
</script>
