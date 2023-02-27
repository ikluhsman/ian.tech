<template>
  <div>
    <h1>contact ian</h1>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from '../stores/AppStore.js';
const appStore = useAppStore();
appStore.fetchRandomColor();
onMounted(() => {
});
</script>
