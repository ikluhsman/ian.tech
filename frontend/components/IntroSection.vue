<template>
  <div>
    <h1>{{ thisSection.headline }}</h1>
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

