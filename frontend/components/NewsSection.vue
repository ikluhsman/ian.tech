<template>
  <section id="news">
    <h2>{{ thisSection.headline }}</h2>
    <div v-html="htmlContent" />
    <ul class="list-none p-0 leading-7">
      <li v-for="a in articles" :key="a.id" class="flex gap-4">
      <div class="flex gap-6 w-full">
        <span>{{ formatDate(a.attributes.createdAt, "MM.DD.YYYY") }}</span>
        <nuxt-link class="cursor-pointer" :to="'/articles/' + a.attributes.slug">{{ a.attributes.headline }}</nuxt-link>
      </div>
      </li>
    </ul>
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