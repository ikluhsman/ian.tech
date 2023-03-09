<template>
  <div>
    <h1>{{ aboutPage.attributes.headline }}</h1>
    <div class="about-page-content" v-html="formatContent(aboutPage.attributes.content)"/>

    <!-- <div class="aboutthispage-content" v-html="formatContent(aboutThisPage)" /> -->

    <!-- <h1 id="about-me">about me <span class="text-2xl">(via GitHub<icon name="logos:github-octocat"/>)</span></h1>
    <div class="githubprofile-content" v-html="formatContent(gitHubProfile)" /> -->
    
  </div>
</template>
<script setup>
import { useAppStore } from '../stores/AppStore.js';
import gsap from 'gsap';
definePageMeta({
  pageTransition: {
    name: 'slide-in',
    mode: 'out-in',
    onBeforeEnter: (el) => {
      gsap.from(el, { duration: 0.1, x: innerWidth });
    }
  }
});
const { $mdRenderer } = useNuxtApp();
function formatContent(contentAttribute) {
  return $mdRenderer.render(contentAttribute);
}
const appStore = useAppStore();
// await appStore.fetchGitHubProfile();
// await appStore.fetchAboutThisPage();
await appStore.fetchAboutPage();
appStore.fetchRandomColor();
// const gitHubProfile = computed(() => { return appStore.getGitHubProfile; });
// const aboutThisPage = computed(() => { return appStore.getAboutThisPage; });
const aboutPage = appStore.getAboutPage;

onMounted(() => {
  let root = document.querySelector(":root");
  root?.style.setProperty("--accent-color", appStore.randomColor);
});
</script>