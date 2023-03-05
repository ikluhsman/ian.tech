<template>
  <div>
    <h1>{{ thisSection.headline }}</h1>
    <h6 class="m-0 text-lg">hiring? see my <nuxt-link class="text-2xl text-shadow-accent-color" to="/resume">resum&egrave;</nuxt-link></h6>
    <section id="intro" v-html="htmlContent" />
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
</script>

