<script setup>
import { useAppStore } from "~/stores/AppStore";
import dayjs from "dayjs";
import Flip from "gsap/Flip";
import gsap from "gsap";
definePageMeta({
  layout: "resume",
});
const appStore = useAppStore();
// await appStore.fetchExperiences();
await appStore.fetchResumePage();
const experiences = computed(() => {
  return appStore.getJobExperiences;
});
const heading = computed(() => {
  return appStore.getResumeHeading;
});
function formatDate(dateString, format) {
  const date = dayjs(dateString);
  return date.format(format);
}
const { $mdRenderer } = useNuxtApp();
function formatContent(contentAttribute) {
  return $mdRenderer.render(contentAttribute);
}
function toggleMenu(event, e) {
  const groupEls = document.getElementsByClassName("accordion-group");
  let lastHeight = 0;
  // un-expand any things you didn't click
  for (const el of groupEls) {
    if (el.id !== "accordion-li-" + e.id && el.classList.contains("active")) {
      let state = Flip.getState(
        el.querySelector("#accordion-content-" + el.id.split("-")[2])
      );
      el.classList.toggle("active");
      // change arrow icon back down
      // let iconUpEl = document.getElementById("icon-up-" + el.id.split("-")[2]);
      // iconUpEl.classList.toggle("hidden");
      // let iconDownEl = document.getElementById(
      //   "icon-down-" + el.id.split("-")[2]
      // );
      // iconDownEl.classList.toggle("hidden");
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
  // let iconUpEl = document.getElementById("icon-up-" + e.id);
  // iconUpEl.classList.toggle("hidden");
  // let iconDownEl = document.getElementById("icon-down-" + e.id);
  // iconDownEl.classList.toggle("hidden");
  Flip.from(state);
  // scroll to the thing you clicked
  gsap.to(window, {
    duration: 0.5,
    scrollTo: { y: "#" + el.id, offsetY: lastHeight },
  }); // need to improve finding correct scroll position, offset y by the previous height of the content
}
</script>
<template>
  <div class="py-8 container mx-auto">
    <div class="relative">
      <p class="p-2 text-shadow-accent-color text-lg">{{ heading.headline }}</p>
      <ul class="list-none p-0">
        <li v-for="(e, k) in experiences" :key="k" :id="'accordion-li-' + e.id" class="accordion-group mb-8">
          <div class="flex group" @click="toggleMenu($event, e)">
              <h5 class="self-start m-0 text-base font-bold text-gray-900 dark:text-gray-50 highlight p-2 rounded-lg opacity-85">
                {{ formatDate(e.attributes.startDate, "YYYY") }}
              </h5>
            <div class="flex flex-col items-center justify-stretch">
              <div
                class="bg-accent-color group-hover:bg-accent-color rounded-full h-4 w-4 shadow-lg shadow-current dark:opacity-80 opacity-50" />
              <div class="bg-accent-color h-[90%] w-1 opacity-50 dark:opacity-80" />
            </div>
            <div class="flex-1 z-10">
              <div class="order-1 space-y-1 rounded-lg shadow-only transition-ease lg:w-10/12 pl-6">
                <h5 class="m-0 font-bold md:text-lg text-gray-900 dark:text-gray-50 md:whitespace-nowrap highlight">
                  {{ e.attributes.title }}
                </h5>
                <h4 v-if="e.attributes.company === 'ian.tech'"
                  class="text-gray-900 dark:text-gray-50 text-xl md:whitespace-nowrap highlight opacity-98 p-0 m-0">
                  {{ e.attributes.company.split(".")[0]
                  }}<span id="site-logo" class="accent-color text-shadow-accent-color text-2xl">.{{
  e.attributes.company.split(".")[1] }}</span>
                </h4>
                <h4 v-if="e.attributes.company !== 'ian.tech'"
                  class="text-gray-900 dark:text-gray-50 opacity-98 highlight p-0 m-0">
                  {{ e.attributes.company }}
                </h4>
                <icon v-for="achievement in e.attributes.achievements.data" :name="achievement.attributes.iconesName"
                class="m-0.5 h-6 w-6" />
                <!-- <button v-if="e.attributes.highlights"
                          class="accordion-button cursor-pointer bg-transparent w-auto border-solid border-gray-300 dark:border-gray-700 rounded-lg p-1 flex items-center">
                          <icon :id="'icon-up-' + e.id" name="lucide:arrow-up" class="text-gray-900 dark:text-gray-50 hidden" />
                          <icon :id="'icon-down-' + e.id" name="lucide:arrow-down"
                            class="text-gray-900 dark:text-gray-50 visible" />
                          <span
                            class="ml-2 text-gray-900 dark:text-gray-50 opacity-80 text-shadow-accent-color">highlights</span>
                        </button> -->

              </div>
            </div>
          </div>
          <div :id="'accordion-content-' + e.id" class="h-0 overflow-hidden accordion-content">
            <p class="text-gray-900 font-semibold ml-4 py-4 dark:text-gray-50">
              {{ e.attributes.summary }}
            </p>
            <div class="highlight-content text-base" v-html="formatContent(e.attributes.highlights)" />
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
}

.highlight-content ul {
  @apply list-none;
}
</style>
