<template>
  <div>
    <h1>{{ thisSection.headline }}</h1>
    <span class="m-0 accent-color font-display text-xl font-bold">hiring? see </span><nuxt-link class="text-2xl text-shadow-accent-color" to="/resume">my resum&egrave;</nuxt-link>
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
</script>

