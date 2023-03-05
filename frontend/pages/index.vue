<script setup>
import { useAppStore } from "~~/stores/AppStore";
const appStore = useAppStore();
await appStore.fetchHomePage();
await appStore.fetchGitHubRepos();
await appStore.fetchHomePageArticles();
onMounted(() => {
  let root = document.querySelector(":root");
  root.style.setProperty("--accent-color", appStore.randomColor);
});
</script>
<template>
  <div>
    <div>
      <intro-section class="mt-16" />
      <nav-section />      
      <news-section />
      <project-section />
      <photo-section />
      <footer-section />
    </div>
  </div>
</template>
<style scoped>
section { @apply pb-4; }
</style>