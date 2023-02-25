<template>
  <div>
    <h1>{{ homePage?.attributes.hero.title }}</h1>
    <div>
      <intro-section :html="introHtml" />
      <nav-section />
      <news-section />
      <project-section :repos="repos" />
      <photo-section />
      <footer-section />
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from "~~/stores/AppStore";
const appStore = useAppStore();
await appStore.fetchHomePage();
await appStore.fetchGitHubRepos();
const repos = computed(() => {
  return appStore.gitHubRepos;
});
const homePage = computed(() => {
  return appStore.getHomepage;
});
const { $mdRenderer } = useNuxtApp();
const introHtml = $mdRenderer.render(appStore.getHomepage.attributes?.hero.introduction);

</script>
