<script setup>

import { useAppStore } from "../stores/AppStore.js";
import _ from "lodash";
import gsap from "gsap";
const appStore = useAppStore();
appStore.fetchRandomColor();
const justification = computed(() => {
  return appStore.justification;
});
const route = useRoute();
const throttleScroll = _.throttle(function () {
  if (window.scrollY > 175) {
    unhideTopButton();
  }
  if (window.scrollY < 175) {
    hideTopButton();
  }
}, 250);
onMounted(() => {
  if (process.client) {
    window.addEventListener("scroll", throttleScroll);
  }
  let root = document.querySelector(":root");
  root.style.setProperty("--accent-color", appStore.randomColor);
});
onUnmounted(() => {
  window.removeEventListener("scroll", throttleScroll);
});
function unhideTopButton() {
  gsap.to("#top-button", { duration: 0.6, opacity: 0.75, y: -50 });
}
function hideTopButton() {
  gsap.to("#top-button", { duration: 0.6, opacity: 0, y: 50 });
}
function scrollToTop() {
  gsap.to(window, {
    duration: 0.25,
    scrollTo: { y: 0, offsetY: 128 },
  });
}
</script>
<template>
  <color-scheme placeholder="" tag="span">
    <arrow-button id="top-button" @click="scrollToTop" class="opacity-0 fixed bottom-0 right-8 md:right-16" />
    <div>
      <div class="flex justify-center">
        <div class="flex w-full py-1/2">
          <theme-selector class="absolute right-2 top-2 mt-2" />
        </div>
      </div>
      <div :class="'px-4 sm:flex ' + justification">
        <div>
          <site-logo />
          <div>
            <div class="mt-8 sm:w-140 md:w-160">
              <nuxt-link href="/" class="no-underline my-4 " v-if="route.path !== '/'">
                <icon name="lucide:arrow-left" class="mx-1 h-4"/>
                      <span class="underline">{{ ' back to index' }}</span>
              </nuxt-link>
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </color-scheme>
</template>