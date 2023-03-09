<template>
  <section id="projects">
    <h2>{{ thisSection.headline }}</h2>
    <div v-html="htmlContent" />
    <div>
      <ul class="list-none p-0 leading-7">
        <li v-for="(r, k) in repos" :key="k">
          <div class="inline-flex gap-6">
            <div class="w-20">{{ formatDate(r.created, "MM.DD.YYYY") }}</div>
            <div class="flex-1 flex items-center gap-4">
              <a :href="r.html_url" target="_blank" rel="noreferrer noopener">{{ r.name }}</a>
              <span v-if="r.language" class="text-sm accent-color text-shadow-accent-color">{{
              r.language }}</span>
            </div>
          </div>
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
function formatDate(dateString, format) {
  const date = dayjs(dateString);
  return date.format(format);
}
</script>
