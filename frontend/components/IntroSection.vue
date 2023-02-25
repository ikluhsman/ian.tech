<template>
    <section id="intro" v-html="html" />
</template>
<script setup>
defineProps({
  html: {
    type: Array,
    default: [],
  },
});
</script>
