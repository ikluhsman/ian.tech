<template>
  <div>
    <h1>{{ article?.attributes.title}}</h1>
  </div>
</template>
<script setup>

import { useAppStore } from '../../stores/AppStore.js';

const appStore = useAppStore();

await appStore.fetchArticle();
const article = appStore.getArticle;


const route = useRoute();


</script>
