<script setup>
import { useAppStore } from "../stores/AppStore.js";
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
    gsap.to("#" + imageOverlay?.id, { duration: 1, height: innerHeight, width: innerWidth, opacity: 1, ease: "power1.in" });
    gsap.to("#" + closeButton?.id, { duration: 1, opacity: 1, ease: "power1.in" });
  }
  if (!appStore.imageOverlayIsOpen) {
    gsap.to("#" + imageOverlay?.id, { duration: 1, height: 0, width: 0, opacity: 0, ease: "power1.out" });
    gsap.to("#" + closeButton?.id, { duration: 1, opacity: 0, ease: "power1.out" });
  }

};
watchEffect(clickImageOverlay);
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

</script>
<template>
  <color-scheme placeholder="" tag="span">
    <arrow-button id="top-button" @click="scrollToTop" class="opacity-0 fixed bottom-0 right-8 md:right-16" />
    <div id="image-overlay"
      class="fixed z-90 w-0 h-0 flex justify-center items-center bg-gray-900 opacity-0">
      <a href="javascript:void(0)" id="close-button" @click="appStore.imageOverlayIsOpen = !appStore.imageOverlayIsOpen"
        class="fixed top-6 right-8 text-white hover:text-amber-500 text-6xl font-semibold opacity-0"
        >&times;</a>
      <div class="flex flex-col items-center">
        <nuxt-img src="https://placekitten.com/1080/1920" class="w-3/5" />
      </div>
    </div>
    <div class="mt-2">
      <div class="flex justify-center">
        <div class="flex w-full py-1/2">
          <theme-selector class="absolute right-2 top-2 mt-2" />
        </div>
      </div>
      <div :class="'px-4 md:flex ' + justification">
        <div>
          <site-logo />
          <div>
            <div class="mt-16 mb-40 sm:w-140 md:w-160">
              <nuxt-link href="/" class="no-underline" v-if="route.path !== '/'">
                {{ '\< ' }}
                          <span class="underline">{{ ' index' }}</span>
              </nuxt-link>
              <slot />
            </div>
          </div>
        </div>
      </div>
    </div>
  </color-scheme>
</template>