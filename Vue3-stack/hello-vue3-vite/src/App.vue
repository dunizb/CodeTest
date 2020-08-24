<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>Vue3 + Vite</h1>
    <h3>初始(state.count)：{{ state.count }}</h3>
    <p>{{ msg }}：{{ count }}</p>
    <h3>计算属性(count*state.count)：{{ state.doube }}</h3>
    <div>
      <button @click="increment">increment</button>
      <button @click="decrement">decrement</button>
    </div>
  </div>
</template>

<script>
import { reactive, watchEffect, computed, ref } from "vue";
export default {
  name: "App",
  setup() {
    const msg = ref("这里是使用ref API创建的变量count");
    const { state, count, increment, decrement } = useCount();
    return {
      msg,
      state,
      count,
      increment,
      decrement,
    };
  },
};

function useCount() {
  const state = reactive({
    count: 1,
    doube: computed(() => state.count * count.value),
  });

  const count = ref(2);

  function increment() {
    state.count++;
    count.value++;
  }

  function decrement() {
    state.count--;
    count.value--;
  }

  watchEffect(() => {
    console.log("state.count =>", state.count);
  });

  return {
    state,
    count,
    increment,
    decrement,
  };
}
</script>
