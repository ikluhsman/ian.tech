<template>
  <div>
  <h1>about this page</h1>
    <div class="aboutthispage-content" v-html="formatContent(aboutThisPage)" />
  <h1>about me</h1>
    <div class="githubprofile-content" v-html="formatContent(gitHubProfile)" />
  </div>
</template>
<script setup>
import { useAppStore } from '../stores/AppStore.js';
const { $mdRenderer } = useNuxtApp();
function formatContent(contentAttribute) {
  return $mdRenderer.render(contentAttribute);
}
const appStore = useAppStore();
await appStore.fetchGitHubProfile();
await appStore.fetchAboutThisPage();
appStore.fetchRandomColor();
const gitHubProfile = computed(() => { return appStore.getGitHubProfile; });
const aboutThisPage = computed(() => { return appStore.getAboutThisPage; });

onMounted(() => {
  let root = document.querySelector(":root");
  root?.style.setProperty("--accent-color", appStore.randomColor);
});
</script>