<script setup>
import { useAppStore } from "~/stores/AppStore";
import dayjs from "dayjs";
import Flip from "gsap/Flip";
import gsap from "gsap";
definePageMeta({
  layout: "resume",
});
const appStore = useAppStore();
await appStore.fetchResumePage();
const resumePage = computed(() => {
  return appStore.getResumePage;
})
const experienceSection = computed(() => {
  return appStore.getResumePage_Experiences;
});
const educationSection = computed(() => {
  return appStore.getResumePage_Education;
});
const skillsSection = computed(() => {
  return appStore.getResumePage_Skills;
})
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
      Flip.from(state);
      lastHeight = el.offsetHeight; // height of the last thing expanded, for offsetting scroll position
    }
  }
  // expand the thing you clicked
  const el = document.getElementById("accordion-li-" + e.id);
  let state = Flip.getState(el.querySelector("#accordion-content-" + e.id));
  el.classList.toggle("active");
  Flip.from(state);
  // scroll to the thing you clicked
  gsap.to(window, {
    duration: 0.5,
    scrollTo: { y: "#" + el.id, offsetY: lastHeight + 100 },
  });
}

async function clickImageOverlay(r) {
  await appStore.setImageOverlayUrl(r.attributes.image.data.attributes.formats.large.url);
  appStore.imageOverlayIsOpen = !appStore.imageOverlayIsOpen;
}
</script>
<template>
  <div class="mx-auto">
    <section class="experience-section relative">
      <h3>{{ resumePage.attributes.experiences.headline }}</h3>
      <ul class="list-none p-0">
        <li v-for="(e, k) in appStore.getResumePage_Experiences" :key="k" :id="'accordion-li-' + e.id"
          class="accordion-group mb-4">
          <div class="flex group cursor-pointer" @click="toggleMenu($event, e)">
            <div class="w-full">
              <div class="order-1 shadow-only transition-ease ">
                <div class="flex justify-between text-base">
                  <h6 class="font-semibold text-gray-900 dark:text-gray-50 sm:whitespace-nowrap highlight m-0">
                    {{ e.attributes.title }}
                  </h6>
                  <span class="font-bold highlight opacity-85 whitespace-nowrap">
                    {{ formatDate(e.attributes.startDate, "YYYY") }} - {{ formatDate(e.attributes.endDate, "YYYY") }}
                  </span>
                </div>
                <!-- ian.tech conditional to format my logo :) -->
                <h6 v-if="e.attributes.company === 'ian.tech'"
                  class="text-gray-900 dark:text-gray-50 sm:whitespace-nowrap highlight opacity-98 p-0 ml-2 m-0">
                  @ {{ e.attributes.company.split(".")[0] }}<span id="site-logo"
                    class="accent-color text-shadow-accent-color text-xl">.{{ e.attributes.company.split(".")[1]
                    }}</span>
                </h6>
                <!-- anything *not* ian.tech company -->
                <span v-if="e.attributes.company !== 'ian.tech'" class="highlight p-0 m-0 tracking-tight ml-2">
                  @<span class="font-semibold">{{ e.attributes.company }}</span>
                </span>
              </div>
            </div>
            <div class="flex flex-col items-center justify-stretch invisible sm:visible sm:ml-4">
              <div
                class="bg-accent-color group-hover:bg-accent-color rounded-full h-0 w-0 sm:h-4 sm:w-4 shadow-lg shadow-current dark:opacity-80 opacity-50" />
              <div class="bg-accent-color h-0 sm:h-[90%] w-0 sm:w-1 opacity-50 dark:opacity-80" />
            </div>
          </div>

          <div :id="'accordion-content-' + e.id" class="h-0 overflow-hidden accordion-content">
            <div class="highlight-content pt-4" v-html="formatContent(e.attributes.highlights)" />
            <div class="my-8 text-sm flex items-center" v-for="(s, k) in e.attributes.skills.data" :key="k">
              <icon :name="s.attributes.iconesName" class="text-xl w-20" />
              <div :id="'skill-description-' + e.id" class="skill-description ml-2 w-10/12">
                <span>{{ s.attributes.description }}</span>
              </div>
            </div>
            <!-- <h6 v-if="e.attributes.references.data.length > 0">supporting references</h6> -->
            <div class="ml-4">
              <h6 v-if="e.attributes.references.data.length > 0 " class="ml-0 sm:ml-4 m-4">reference letters</h6>
              <div class="text-sm flex items-center sm:m-4 sm:ml-12" v-for="(r, k) in e.attributes.references.data" :key="k">
                <a href="javascript:void(0)" @click="clickImageOverlay(r)">
                  <nuxt-img :src="r.attributes.image.data.attributes.formats.thumbnail.url" class="h-16 cursor-pointer"/>
                </a>
                <div :id="'reference-description-' + r.id" class="reference-description ml-4 w-10/12">
                  <span>{{ r.attributes.title }}, {{ r.attributes.company }}</span>
                </div>
              </div>
            </div>
            
          </div>
        </li>
      </ul>
    </section>
    <section>
      <h3>{{ resumePage.attributes.education.headline }}</h3>
      <ul class="list-none p-0">
        <li v-for="(e, k) in appStore.getResumePage_Education" :key="k" :id="'accordion-li-' + e.id"
          class="accordion-group mb-4">
          <div class="flex group cursor-pointer" @click="toggleMenu($event, e)">

            <div class="flex flex-col items-center justify-stretch invisible sm:visible sm:mr-4">
              <div
                class="bg-accent-color group-hover:bg-accent-color rounded-full h-0 w-0 sm:h-4 sm:w-4 shadow-lg shadow-current dark:opacity-80 opacity-50" />
              <div class="bg-accent-color h-0 sm:h-[90%] w-0 sm:w-1 opacity-50 dark:opacity-80" />
            </div>

            <div class="w-full">
              <div class="order-1 shadow-only transition-ease ">
                <div class="flex justify-between text-base">
                  <h6 class="font-semibold text-gray-900 dark:text-gray-50 sm:whitespace-nowrap highlight m-0">
                    {{ e.attributes.title }}
                  </h6>
                  <span class="font-bold highlight opacity-85 whitespace-nowrap">
                    {{ formatDate(e.attributes.startDate, "YYYY") }} - {{ formatDate(e.attributes.endDate, "YYYY") }}
                  </span>
                </div>
                <!-- ian.tech conditional to format my logo :) -->
                <h6 v-if="e.attributes.company === 'ian.tech'"
                  class="text-gray-900 dark:text-gray-50 sm:whitespace-nowrap highlight opacity-98 p-0 ml-2 m-0">
                  @ {{ e.attributes.company.split(".")[0] }}<span id="site-logo"
                    class="accent-color text-shadow-accent-color text-xl">.{{ e.attributes.company.split(".")[1]
                    }}</span>
                </h6>
                <!-- anything *not* ian.tech company -->
                <span v-if="e.attributes.company !== 'ian.tech'" class="highlight p-0 m-0 tracking-tight ml-2">
                  @<span class="font-semibold">{{ e.attributes.company }}</span>
                </span>
              </div>
            </div>
          </div>
          <div :id="'accordion-content-' + e.id" class="h-0 overflow-hidden accordion-content">
            <p class="text-gray-900 font-semibold ml-4 dark:text-gray-50">
              {{ e.attributes.summary }}
            </p>
            <div class="highlight-content" v-html="formatContent(e.attributes.highlights)" />
            <div class="mt-8 text-sm flex items-center" v-for="(s, k) in e.attributes.skills.data" :key="k">
              <icon :name="s.attributes.iconesName" class="text-xl w-20" />
              <div :id="'skill-description-' + e.id" class="skill-description ml-2 w-10/12">
                <span>{{ s.attributes.description }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
    <!-- <section class="mb-24">
      <h3 class="text-shadow-accent-color self-start">{{ resumePage.attributes.skills.headline }}</h3>
      <div class="flex flex-wrap gap-4 px-3 py-6 justify-center w-full">
        <icon v-for="(e, k) in appStore.getResumePage_Skills" :name="e.attributes.iconesName" class="w-8 sm:w-12" />
      </div>
    </section> -->
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

.active-icon {
  height: auto;
}
</style>
