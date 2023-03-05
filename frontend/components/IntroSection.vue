<template>
  <div>
    <h1>{{ headline }}</h1>
    <section id="intro" v-html="htmlContent" />
  </div>
</template>
<script setup>
defineProps({
  headline: {
    type: String,
    default: ""
  },
  htmlContent: {
    type: String,
    default: "",
  },
});
</script>

