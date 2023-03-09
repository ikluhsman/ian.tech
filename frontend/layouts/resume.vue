<script setup>
import { useAppStore } from "../stores/AppStore.js";
import { storeToRefs } from 'pinia';
import Flip from "gsap/Flip";
import _ from "lodash";
import gsap from 'gsap';

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
  gsap.to("#top-button", { duration: 0.6, opacity: 0.75, y: -50 })
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
function clickImageOverlay() {
  const imageOverlay = document.getElementById("image-overlay");
  const closeButton = document.getElementById("close-button");
  if (appStore.imageOverlayIsOpen) {
    let state = Flip.getState(document.querySelector('#' + closeButton?.id));
    closeButton.classList.add("visible");
    closeButton.classList.remove("hidden");
    Flip.from(state);
    gsap.set("#" + imageOverlay?.id, { height: innerHeight, width: innerWidth });
    gsap.to("#" + imageOverlay?.id, { duration: 0.7, opacity: 1, ease: "power4.in" });
    gsap.to("#" + closeButton?.id, { duration: 0.5, opacity: 1, delay: 0.3, ease: "power4.in" });
  }
  if (!appStore.imageOverlayIsOpen) {
    let state = Flip.getState(document.querySelector('#' + closeButton?.id));
    closeButton.classList.toggle("hidden");
    Flip.from(state);
    gsap.to("#" + imageOverlay?.id, { duration: 0.7, x: 0, opacity: 0, ease: "power4.out" });
    gsap.set("#" + imageOverlay?.id, { height: 0, width: 0, delay: 1 });
    gsap.to("#" + closeButton?.id, { duration: 0.5, opacity: 0, delay: 0.3, ease: "power4.out" });
  }
};
var isOpen = ref(appStore.imageOverlayIsOpen);
const { getImageOverlayStatus } = storeToRefs(appStore);
watch(getImageOverlayStatus, clickImageOverlay);
const imageUrl = computed(() => {
  if (appStore.getImageOverlayUrl === "") {
    return "https://placekitten.com/1024/768" // nuxt-img needs a placeholder to load the first time
  }
  return appStore.getImageOverlayUrl;
})
</script>
<template>
  <color-scheme placeholder="" tag="span">
    <arrow-button id="top-button" @click="scrollToTop" class="opacity-0 fixed bottom-0 right-8 md:right-16" />
    <div id="image-overlay"
      class="fixed top-0 left-0 right-0 z-50 w-0 h-0 flex justify-center items-center bg-gray-900/80 opacity-0">
      <button id="close-button"
        class="fixed top-1/4 right-8 bg-accent-color accent-color h-12 w-12 z-50 rounded-full border-none shadow-xl shadow-current opacity-0 hidden"
        @click="appStore.imageOverlayIsOpen = !appStore.imageOverlayIsOpen">
        <Icon name="lucide:x" class="text-gray-50 dark:text-gray-90" />
      </button>
      <nuxt-img :src="imageUrl" class="w-full sm:w-2/3 h-auto" />
    </div>
    <div class="mt-2 pb-40">
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
              <nuxt-link href="/" class="no-underline flex items-center my-4" v-if="route.path !== '/'">
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