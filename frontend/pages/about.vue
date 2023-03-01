<template>
  <div>
    <timeline/>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '../stores/AppStore.js';
definePageMeta({
  layout: "about",
});
const appStore = useAppStore();
appStore.fetchRandomColor();
onMounted(() => {
  let root = document.querySelector(":root");
  root?.style.setProperty("--accent-color", appStore.randomColor);
});
</script>