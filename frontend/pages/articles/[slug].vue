<template>
  <div>
    <h1>{{ article?.attributes.title}}</h1>
    <div v-html="htmlContent"/>
  </div>
</template>
<script setup>

import { useAppStore } from '../../stores/AppStore.js';
const { $mdRenderer } = useNuxtApp();
const appStore = useAppStore();

await appStore.fetchArticle();
const article = appStore.getArticle;

const htmlContent = $mdRenderer.render(article.attributes.content);
const route = useRoute();


</script>
