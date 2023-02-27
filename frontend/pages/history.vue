<template>
  <div>
  <p class="text-sm italic">Updated: {{ formatDate(historyPage.attributes.updatedAt) }}</p>
    <div>

      <!-- I'd like to add some history here about myself. but don't know where to start..

        how bout an intro story? that's good. it should be.. expandable? 

        then lets add a summary of my resume, like a work history overview, this would possibly be a timeline component.

        then we can add personal achievements, recognitions, and education
        -->
        
        <!-- lets get the history page object that has the story on it from Strapi -->

        <!-- <section v-html="storyHtml"/> -->
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from '../stores/AppStore.js';
import dayjs from 'dayjs';
const appStore = useAppStore();
await appStore.fetchHistoryPage();
appStore.fetchRandomColor();
const historyPage = computed(() => { return appStore.historyPage });
function formatDate(dateString) {
  const date = dayjs(dateString);
  return date.format("MM/DD/YYYY");
}
const { $mdRenderer } = useNuxtApp();
const storyHtml = $mdRenderer.render(appStore.getHistory.attributes?.story.story);
onMounted(() => {
  let root = document.querySelector(":root");
  root.style.setProperty("--accent-color", appStore.randomColor);
});
</script>
