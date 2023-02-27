<template>
  <div>
    <h1>{{ homePage?.attributes.intro.heading }}</h1>
    <div>
      <intro-section :htmlContent="introContent" />
      <nav-section />
      <news-section :htmlContent="newsContent" :caption="newsCaption"/>
      <project-section :repos="repos" />
      <photo-section />
      <footer-section />
    </div>
  </div>
</template>
<script setup>
// tell the store to fetch data
import { useAppStore } from "~~/stores/AppStore";
const appStore = useAppStore();
await appStore.fetchHomePage();
await appStore.fetchGitHubRepos();
// reference fetched data via computed methods
const repos = computed(() => {
  return appStore.getGitHubRepos;
});
const homePage = computed(() => {
  return appStore.getHomepage;
});
// render some content from getters
const { $mdRenderer } = useNuxtApp();
const introContent = $mdRenderer.render(appStore.getHomepage.attributes?.intro.content);
const newsContent = $mdRenderer.render(appStore.getHomepage.attributes?.news.content);
const newsCaption = appStore.getHomepage.attributes?.news.caption;
onMounted(() => {
  let root = document.querySelector(":root");
  root.style.setProperty("--accent-color", appStore.randomColor);
});
</script>
<style scoped>
section { @apply pb-8; }
section nav h2:first-of-type {
  @apply text-gray-1000 dark:text-gray-100;
}
section:last-of-type h2 {
  @apply text-gray-1000 dark:text-gray-100;
}
</style>