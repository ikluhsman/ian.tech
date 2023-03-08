<template>
  <section id="projects">
    <h2>{{ thisSection.headline }}</h2>
    <div v-html="htmlContent" />
    <div>
      <ul class="p-0 list-none leading-7">
        <li v-for="(r, k) in repos" :key="k" class="flex gap-4">
          <span class="w-24">{{ formatDate(r.created) }}</span>
          <a :href="r.html_url" target="_blank">{{ r.name }}</a>
          <span v-if="r.language" class="accent-color text-shadow-accent-color">{{
            r.language }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup >
import { useAppStore } from '~~/stores/AppStore.js';
import dayjs from 'dayjs';
const appStore = useAppStore();
const { $mdRenderer } = useNuxtApp();
const thisSection = appStore.getHomePageProjectSection;
const repos = appStore.getGitHubRepos;
const htmlContent = $mdRenderer.render(thisSection.content);
function formatDate(dateString) {
  const date = dayjs(dateString);
  return date.format("MM/DD/YYYY");
}
</script>
