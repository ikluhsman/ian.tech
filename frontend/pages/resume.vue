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
    <section v-for="(section, key) in resumePage.attributes.resumeSections" :key="key"
      class="experience-section relative">
      <h3>{{ section.headline }}</h3>
      <ul v-if="section.experiences.data.length > 0" class="list-none p-0">
        <li v-for="(e, k) in section.experiences.data" :key="k" :id="'accordion-li-' + e.id" class="accordion-group p-2">
          <div id="experience-header" class="flex group cursor-pointer" @click="toggleMenu($event, e)">
            <div class="w-full">
              <div class="order-1 shadow-only transition-ease ">
                <div class="flex justify-between text-xl">
                  <span class="font-semibold sm:whitespace-nowrap highlight m-0">
                    {{ e.attributes.title }}
                  </span>
                  <span class="font-bold highlight whitespace-nowrap">
                    {{ formatDate(e.attributes.startDate, "YYYY") }} - {{ formatDate(e.attributes.endDate, "YYYY") }}
                  </span>
                </div>
                <h5 class="font-semibold m-0 ml-2 mt-1">@ {{ e.attributes.company }}</h5>
              </div>
            </div>
          </div>

          <div :id="'accordion-content-' + e.id" class="h-0 overflow-hidden accordion-content">
            
            <!-- highlights -->
            <div class="py-4">
              <hr class="experience-separator" />
              <h6 class="m-0 p-0 mb-1">highlights</h6>
              <div class="highlight-content text-base mt-4 m-0" v-html="formatContent(e.attributes.highlights)" />
            </div>
            
            <!-- skills -->
            <div v-if="e.attributes.skills.data.length > 0" class="pb-4">
              <hr class="experience-separator" />
              <h6 class="m-0 p-0 mb-2">skills</h6>
              <ul class="list-none pl-4">
                <li class="text-sm flex items-center gap-4 my-3" v-for="(s, k) in e.attributes.skills.data" :key="k">
                  <icon :name="s.attributes.iconesName" class="text-xl w-12" />
                  <div :id="'skill-description-' + e.id" class="skill-description w-full">
                    <span>{{ s.attributes.description }}</span>
                  </div>
                </li>
              </ul>
            </div>

            <!-- references -->
            <div v-if="e.attributes.references.data.length > 0">
              <hr class="experience-separator" />
              <h6 class="m-0 p-0 mb-4">references</h6>
              <div class="text-sm flex items-center ml-4" v-for="(r, k) in e.attributes.references.data"
                :key="k">
                <a href="javascript:void(0)" class="flex" @click="clickImageOverlay(r)">
                  <nuxt-img :src="r.attributes.image.data.attributes.formats.thumbnail.url" class="h-16 cursor-pointer" />
                </a>
                <div :id="'reference-description-' + r.id" class="reference-description ml-4">
                  <span>{{ r.attributes.title }}, {{ r.attributes.company }}</span>
                </div>
              </div>
            </div>

            <!-- achievements -->
            <div v-if="e.attributes.achievements.data.length > 0">
              <hr class="experience-separator" />
              <h6 class="m-0 p-0">achievements</h6>
              <ul class="list-none p-0">
                <li class="text-sm flex my-4 items-center" v-for="(a, k) in e.attributes.achievements.data"
                  :key="k">

                  <a href="javascript:void(0)" @click="clickImageOverlay(a)" class="flex items-center">
                    <div class="flex items-center justify-center w-16" v-if="!a.attributes.image.data">
                      <icon name="game-icons:achievement" class="cursor-pointer h-12 w-16 dark:text-gray-400" v-if="!a.attributes.image.data"/>
                    
                    </div>
                    <nuxt-img v-if="a.attributes.image.data"
                      :src="a.attributes.image.data?.attributes.formats.thumbnail.url" class="cursor-pointer w-16" />
                  </a>
                  <div class="pl-4">
                    <p class="m-0">{{ a.attributes.dateCompleted }}</p>
                    <div :id="'achievement-description-' + a.id" class="achievement-description flex flex-1 items-center">
                      <a v-if="a.attributes.linkUrl" :href="a.attributes.linkUrl" target="_blank" rel="noopener noreferrer">{{ a.attributes.title }}</a>
                      <span v-if="!a.attributes.linkUrl">{{ a.attributes.title }}</span>
                    </div>
                  </div>
                  

                </li>
              </ul>
            </div>

          </div>
        </li>
      </ul>
    </section>
  </div>
</template>
<style scoped>
.experience-separator {
  @apply border-gray-400 dark:border-gray-600 border border-solid;
}

span {
  @apply tracking-wide;
}

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
}</style>
