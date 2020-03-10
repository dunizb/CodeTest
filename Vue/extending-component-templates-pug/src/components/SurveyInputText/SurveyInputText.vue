<template lang="pug">
  extends SurveyInput.pug
  block input
    input(type="text" :placeholder="placeholder")
</template>
<script>
import SurveyInput from "../SurveyInput/SurveyInput.vue";
export default {
  extends: SurveyInput,
  props: {
    placeholder: String
  }
};
</script>
