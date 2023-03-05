<script setup>
import { useAppStore } from "~~/stores/AppStore";
const { $mdRenderer } = useNuxtApp();

// go fetch
const appStore = useAppStore();
await appStore.fetchHomePage();
await appStore.fetchGitHubRepos();
await appStore.fetchHomePageArticles();

// computed values
const repos = appStore.getGitHubRepos;
const homePage = appStore.getHomepage;
const homePageArticles = appStore.getHomePageArticles;
const homePagePhotos = appStore.gethomePagePhotos;

const introHeadline = appStore.getHomepage.attributes?.intro.headline;
const introContent = $mdRenderer.render(appStore.getHomepage.attributes?.intro.content);

const newsHeadline = appStore.getHomepage.attributes?.news.headline;
const newsContent = $mdRenderer.render(appStore.getHomepage.attributes?.news.content);

const projectsHeadline = appStore.getHomepage.attributes?.projects.headline;
const projectsContent = $mdRenderer.render(appStore.getHomepage.attributes?.projects.content);

const photosHeadline = appStore.getHomepage.attributes?.photos.headline;
const photosContent = $mdRenderer.render(appStore.getHomepage.attributes?.photos.content);

// lifecycle methods
onMounted(() => {
  let root = document.querySelector(":root");
  root.style.setProperty("--accent-color", appStore.randomColor);
});
</script>
<template>
  <div>
    <div>
      <intro-section class="mt-16" :headline="introHeadline" :htmlContent="introContent" />
      <nav-section />
      <h6 class="m-0 text-lg">hiring? see my <nuxt-link class="text-2xl text-shadow-accent-color" to="/resume">resume</nuxt-link></h6>
      <news-section :htmlContent="newsContent" :articles="homePageArticles" :caption="newsCaption"/>
      <project-section :repos="repos" />
      <photo-section />
      <footer-section />
    </div>
  </div>
</template>
<style scoped>
section { @apply pb-4; }
</style>