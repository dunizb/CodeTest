<template>
<router-view />
</template>

<script lang="ts">
import {
  provide,
  ref
} from 'vue'
import {
  router
} from './router';
export default {
  name: 'App',
  setup() {
    const clientWidth = document.documentElement.clientWidth;
    const asideVisible = ref(clientWidth <= 500 ? false : true)
    provide('asideVisible', asideVisible)
    router.afterEach(() => {
      if (clientWidth <= 500) {
        asideVisible.value = false
      }
    })
  }
}
</script>
