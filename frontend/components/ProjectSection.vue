<template>
  <section id="projects">
    <h2>{{ thisSection.headline }}</h2>
    <div v-html="htmlContent" />
    <div>
      <div class="flex flex-col justify-center">
        <div v-for="(r, k) in repos" :key="k">
            <div class="flex items-center gap-4">
              <div class="w-1/6">{{ formatDate(r.created, "MM.DD.YYYY") }}</div>
              <a class="" :href="r.html_url" target="_blank" rel="noreferrer noopener">{{ r.name }}</a>
              <h3 v-if="r.language" class="text-sm accent-color text-shadow-accent-color p-0 m-0">{{
              r.language }}</h3>
           </div>
        </div>
      </div>
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
function formatDate(dateString, format) {
  const date = dayjs(dateString);
  return date.format(format);
}
</script>
