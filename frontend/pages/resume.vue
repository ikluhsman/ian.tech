<script setup>
import { useAppStore } from "~/stores/AppStore";
import dayjs from "dayjs";
import Flip from 'gsap/Flip';
import gsap from 'gsap';
definePageMeta({
  layout: "resume",
});
const appStore = useAppStore();
await appStore.fetchExperiences();
const experiences = computed(() => {
  return appStore.experiences;
});
function formatDate(dateString, format) {
  const date = dayjs(dateString);
  return date.format(format);
}
const { $mdRenderer } = useNuxtApp();
function formatContent(contentAttribute) {
  return $mdRenderer.render(contentAttribute)
};
function toggleMenu(event, e) {
  const groupEls = document.getElementsByClassName("accordion-group");
  let lastHeight = 0;

  // un-expand any things you didn't click
  for (const el of groupEls) {
    if (el.id !== ("accordion-li-" + e.id) && el.classList.contains("active")) {
      let state = Flip.getState(el.querySelector('#accordion-content-' + el.id.split('-')[2]));
      el.classList.toggle("active");

      // change arrow icon back down
      let iconUpEl = document.getElementById("icon-up-" + el.id.split('-')[2]);
      iconUpEl.classList.toggle("hidden");
      let iconDownEl = document.getElementById("icon-down-" + el.id.split('-')[2]);
      iconDownEl.classList.toggle("hidden");
      Flip.from(state);
      lastHeight = el.offsetHeight; // height of the last thing expanded
    }
  }

  // expand the thing you clicked
  const el = document.getElementById("accordion-li-" + e.id);
  let state = Flip.getState(el.querySelector("#accordion-content-" + e.id));
  el.classList.toggle("active");
  const thisHeight = el.offsetHeight;

  // change arrow icon up
  let iconUpEl = document.getElementById("icon-up-" + e.id);
  iconUpEl.classList.toggle("hidden");
  let iconDownEl = document.getElementById("icon-down-" + e.id);
  iconDownEl.classList.toggle("hidden");

  Flip.from(state);

  // scroll to the thing you clicked
  gsap.to(window, {
    duration: 0.6,
    scrollTo: { y: '#' + el.id }
  }); // need to improve finding correct scroll position, offset y by the previous height of the content
}
</script>
<template>
  <div class="py-8 container mx-auto">
    <div class="relative">
      <ul class="list-none">
        <li v-for="(e, k) in experiences" :key="k" :id="'accordion-li-' + e.id" class="accordion-group mb-8">
          <div class="flex group">
            <h5 class="mr-3 text-base mt-1 font-bold text-gray-900 dark:text-gray-50 highlight">
              {{ formatDate(e.attributes.startDate, "YYYY") }}
            </h5>
            <div class="flex flex-col items-center justify-stretch">
              <div
                class="bg-accent-color group-hover:bg-accent-color rounded-full h-4 w-4 shadow-lg shadow-current dark:opacity-80 opacity-50" />
              <div class="bg-accent-color h-[90%] w-1 opacity-50 dark:opacity-80" />
            </div>
            <div class="flex-1 z-10">
              <div class="order-1 space-y-1 rounded-lg shadow-only transition-ease lg:w-10/12 pl-6">
                <h5
                  class="m-0 font-bold text-lg md:text-lg text-gray-900 dark:text-gray-50 md:whitespace-nowrap highlight">
                  {{ e.attributes.title }}
                </h5>
                <h4 v-if="e.attributes.company === 'ian.tech'"
                  class="text-gray-900 dark:text-gray-50 text-lg md:whitespace-nowrap highlight opacity-98">
                  {{ e.attributes.company.split('.')[0] }}<span id="site-logo"
                    class="accent-color text-shadow-accent-color text-2xl">.{{ e.attributes.company.split('.')[1]
                    }}</span>
                </h4>
                <h4 v-if="e.attributes.company !== 'ian.tech'" class="accent-color opacity-98 text-base highlight">
                  {{ e.attributes.company }}
                </h4>
                
                <button v-if="e.attributes.highlights"
                  class="accordion-button cursor-pointer bg-transparent w-auto border-solid border-gray-300 dark:border-gray-700 rounded-md p-1 flex items-center"
                  @click="toggleMenu($event, e)">
                  <icon :id="'icon-up-' + e.id" name="lucide:arrow-up" class="text-gray-900 dark:text-gray-50 hidden" />
                  <icon :id="'icon-down-' + e.id" name="lucide:arrow-down"
                    class="text-gray-900 dark:text-gray-50 visible" />
                  <span class="ml-2 text-gray-900 dark:text-gray-50 opacity-80 text-shadow-accent-color">see
                    highlights</span>
                </button>
              </div>
            </div>
          </div>
          <div :id="'accordion-content-' + e.id" class="h-0 overflow-hidden accordion-content">
            <p class="text-gray-900 font-bold py-4 ml-8 leading-6 dark:text-gray-50">{{ e.attributes.summary }}</p>
            <div class="text-base" v-html="formatContent(e.attributes.highlights)" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.group:hover .group-hover\:bg-accent-color {
  @apply bg-[var(--accent-color)] shadow-lg shadow-current text-[var(--accent-color)];
}

.group:hover hr,
.group:hover h6,
.group:hover .highlight {
  @apply border-[var(--accent-color)] text-[var(--accent-color)];
}

.group:hover .highlight {
  @apply border-[var(--accent-color)] text-[var(--accent-color)];
}

.active .accordion-content {
  height: auto;
}</style>
