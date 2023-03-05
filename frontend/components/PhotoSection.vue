<template>
  <section id="photos">
    <h2>{{ thisSection.headline }}</h2>
    <div v-html="htmlContent"/>
  </section>
</template>
<script setup>
import { useAppStore } from '~~/stores/AppStore.js';
import dayjs from 'dayjs';
const appStore = useAppStore();
const { $mdRenderer } = useNuxtApp();
const thisSection = appStore.getHomePagePhotoSection;
const htmlContent = $mdRenderer.render(thisSection.content);
</script>
