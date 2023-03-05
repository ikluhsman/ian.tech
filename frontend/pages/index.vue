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
      <h6 class="m-0 text-lg">hiring? see my <nuxt-link class="text-2xl text-shadow-accent-color" to="/resume">resum&egrave;</nuxt-link></h6>
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