<template>
  <div class="py-16 container mx-auto">
    <div class="relative">
      <ul class="list-none m-0 p-0">
        <li v-for="(e, k) in experiences" :key="k">
          <div class="flex group justify-center">
            <div class="mr-6 text-sm">
              {{ formatDate(e.attributes.startDate, "YYYY") }}
            </div>
            <div class="flex flex-col items-center justify-stretch">
              <div
                class="bg-gray-1000 dark:bg-gray-200 group-hover:bg-accent-color z-10 rounded-full h-4 w-4 shadow-lg shadow-current" />
              <div class="bg-accent-color h-[95%] w-1" />
            </div>
            <div class="flex-1 z-10 font-medium mb-12">
              <div class="order-1 space-y-2 rounded-lg shadow-only transition-ease lg:w-10/12 pl-6">
                <h1 class="mt-6 mb-0 font-bold text-2xl text-gray-900 dark:text-gray-50 md:whitespace-nowrap">
                  {{ e.attributes.title }}
                </h1>
                <h2 v-if="e.attributes.company === 'ian.tech'" class="text-gray-900 dark:text-gray-50">
                  {{ e.attributes.company.split('.')[0] }}<span id="site-logo" class="accent-color shadow-lg">.{{ e.attributes.company.split('.')[1] }}</span>
                </h2>
                <h2 v-if="e.attributes.company !== 'ian.tech'" class="text-gray-900 dark:text-gray-50">
                  {{ e.attributes.company }}
                </h2>
                <h3 class="text-sm text-gray-900 dark:text-gray-50">{{ e.attributes.summary }}</h3>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
import { useAppStore } from "~~/stores/AppStore";
import dayjs from "dayjs";
definePageMeta({
  layout: "resume",
});
// tell the store to fetch data
const appStore = useAppStore();
await appStore.fetchResumePage();

const experiences = computed(() => {
  return appStore.experiences;
});
function formatDate(dateString, format) {
  const date = dayjs(dateString);
  return date.format(format);
}
const { $mdRenderer } = useNuxtApp();
// const resumeHighlightContent = $mdRenderer.render(appStore.getResume.attributes?.intro.content);

function formatContent(contentAttribute) {
  return $mdRenderer.render(contentAttribute)
};

</script>
<style scoped>
.group:hover .group-hover\:bg-accent-color {
  @apply bg-[var(--accent-color)] shadow-lg shadow-current text-[var(--accent-color)];
}

.group:hover hr,
.group:hover h6,
.group:hover .year {
  @apply border-[var(--accent-color)] text-[var(--accent-color)];
}
</style>
