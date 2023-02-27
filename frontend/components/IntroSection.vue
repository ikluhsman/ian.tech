<template>
    <section id="intro" v-html="htmlContent" />
</template>
<script setup>
defineProps({
  htmlContent: {
    type: String,
    default: "",
  },
});
</script>

