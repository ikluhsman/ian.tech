<template>
  <div>
    <h1>{{ thisSection.headline }}</h1>
    <span class="m-0 text-lg accent-color font-display">hiring? see my <nuxt-link class="text-2xl text-shadow-accent-color font-" to="/resume">resum&egrave;</nuxt-link></span>
    <section id="intro" class="intro" v-html="htmlContent" />
  </div>
</template>
<script setup>
import { useAppStore } from '~~/stores/AppStore.js';
defineProps({
  mainSection: {
    type: Object,
    default: {},
  },
});
const appStore = useAppStore();
const { $mdRenderer } = useNuxtApp();
const thisSection = appStore.getHomePageIntroSection;
const htmlContent = $mdRenderer.render(thisSection.content);
console.log(htmlContent);
</script>

