<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useAppStore } from "./stores/AppStore.js";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const appStore = useAppStore();
appStore.fetchRandomColor();
onMounted(() => {
  let root = document.querySelector(":root") as HTMLElement;
  root.style.setProperty("--accentColor", appStore.randomColor);
});
</script>
