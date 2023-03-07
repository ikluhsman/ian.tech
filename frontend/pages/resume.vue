<script setup>
import { useAppStore } from "~/stores/AppStore";
import dayjs from "dayjs";
import Flip from "gsap/Flip";
import gsap from "gsap";
definePageMeta({
  layout: "resume",
  pageTransition: {
    name: 'slide-in',
    mode: 'out-in',
    onBeforeEnter: (el) => {
      gsap.from(el, { duration: 0.1, x: innerWidth });
    }
  }
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
          
          <div id="experience-header" class="flex group cursor-pointer" @click="toggleMenu($event, e)">
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
                <span class="highlight p-0 m-0 tracking-tight ml-2">
                  @<span class="font-semibold">{{ e.attributes.company }}</span>
                </span>
              </div>
            </div>
            <!-- <div class="flex flex-col items-center justify-stretch invisible sm:visible sm:ml-4">
                  <div
                    class="bg-accent-color group-hover:bg-accent-color rounded-full h-0 w-0 sm:h-4 sm:w-4 shadow-lg shadow-current dark:opacity-80 opacity-50" />
                  <div class="bg-accent-color h-0 sm:h-[90%] w-0 sm:w-1 opacity-50 dark:opacity-80" />
                </div> -->
          </div>

          <div :id="'accordion-content-' + e.id" class="h-0 overflow-hidden accordion-content">

            <div>
              <!-- <h6 class="my-4 ml-2">highlights</h6> -->
              <div class="highlight-content text-sm" v-html="formatContent(e.attributes.highlights)" />
            </div>

            <div>
              <!-- <h6 v-if="e.attributes.skills.data.length > 0" class="my-4 ml-2">skills</h6> -->
              <div class="text-sm flex items-center mb-2" v-for="(s, k) in e.attributes.skills.data" :key="k">
                <icon :name="s.attributes.iconesName" class="text-xl w-12" />
                <div :id="'skill-description-' + e.id" class="skill-description ml-4 w-10/12">
                  <span>{{ s.attributes.description }}</span>
                </div>
              </div>
            </div>

            <div>
              <!-- <h6 v-if="e.attributes.references.data.length > 0" class="my-4 ml-2">reference letters</h6> -->
              <div class="text-sm flex items-center sm:m-4 sm:ml-12" v-for="(r, k) in e.attributes.references.data"
                :key="k">
                <a href="javascript:void(0)" @click="clickImageOverlay(r)">
                  <nuxt-img :src="r.attributes.image.data.attributes.formats.thumbnail.url" class="h-16 cursor-pointer" />
                </a>
                <div :id="'reference-description-' + r.id" class="reference-description ml-4 w-10/12">
                  <span>{{ r.attributes.title }}, {{ r.attributes.company }}</span>
                </div>
              </div>
            </div>

            <div>
              <!-- <h6 v-if="e.attributes.achievements.data.length > 0" class="ml-0 sm:ml-4 m-4">notable achievements</h6> -->
              <div class="text-sm flex items-center sm:m-4 sm:ml-12" v-for="(a, k) in e.attributes.achievements.data"
                :key="k">
                <a href="javascript:void(0)" @click="clickImageOverlay(a)">
                  <nuxt-img v-if="a.attributes.image.data"
                    :src="a.attributes.image.data?.attributes.formats.thumbnail.url" class="h-16 cursor-pointer" />
                </a>
                <div :id="'achievement-description-' + a.id" class="achievement-description ml-4 w-10/12">
                  <span>{{ a.attributes.title }}</span>
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
                <span class="highlight p-0 m-0 tracking-tight ml-2">
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
            <div>
              <h6 v-if="e.attributes.achievements.data.length > 0" class="ml-0 sm:ml-4 m-4">notable achievements</h6>
              <div class="text-sm flex items-center sm:m-4 sm:ml-12" v-for="(a, k) in e.attributes.achievements.data"
                :key="k">
                <a href="javascript:void(0)" @click="clickImageOverlay(a)">
                  <nuxt-img v-if="a.attributes.image.data"
                    :src="a.attributes.image.data?.attributes.formats.thumbnail.url" class="h-16 cursor-pointer" />
                </a>
                <div :id="'achievement-description-' + a.id" class="achievement-description ml-4 w-10/12">
                  <span>{{ a.attributes.title }}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
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
