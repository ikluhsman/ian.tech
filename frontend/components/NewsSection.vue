<template>
  <section id="news">
    <h2>{{ thisSection.headline }}</h2>
    <div v-html="htmlContent" />
    <div v-for="a in articles" :key="a.id">
      <div class="flex gap-4 w-full">
        <div class="w-1/6">{{ formatDate(a.attributes.createdAt, "MM.DD.YYYY") }}</div>
        <nuxt-link class="cursor-pointer" :to="'/articles/' + a.attributes.slug">{{ a.attributes.headline }}</nuxt-link>
      </div>
    </div>
    <p>..or see <nuxt-link to="/articles">my news archives..</nuxt-link></p>
  </section>
</template>
<script setup>
import { useAppStore } from '~~/stores/AppStore.js';
import dayjs from 'dayjs';
const appStore = useAppStore();
const { $mdRenderer } = useNuxtApp();
const thisSection = appStore.getHomePageNewsSection;
const htmlContent = $mdRenderer.render(thisSection.content);
const articles = appStore.getHomePageArticles;
function formatDate(dateString, format) {
  const date = dayjs(dateString);
  return date.format(format);
}
</script>