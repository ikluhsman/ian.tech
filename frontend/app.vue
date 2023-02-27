<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useAppStore } from "./stores/AppStore.js";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
const appStore = useAppStore();
appStore.fetchRandomColor();
onMounted(() => {
  let root = document.querySelector(":root");
  root.style.setProperty("--accent-color", appStore.randomColor);
});
</script>
