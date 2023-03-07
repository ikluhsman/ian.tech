<template>
  <section id="news">
    <h2>{{ thisSection.headline }}</h2>
    <div v-html="htmlContent" />
    <div>
      <ul class="list-none p-0 md:leading-6">
        <li v-for="a in articles" :key="a.id">
          {{ formatDate(a.attributes.createdAt, "MM-DD-YYYY") }}
          <nuxt-link class="cursor-pointer" :to="'/articles/' + a.attributes.slug">{{ a.attributes.headline }}</nuxt-link>
        </li>
      </ul>
    </div>
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
