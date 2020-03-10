<template>
  <div class="wrapper">
    <h4>{{ question }}</h4>
    <input type="text" :placeholder="placeholder" />
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  props: {
    question: String
  }
};
</script>
