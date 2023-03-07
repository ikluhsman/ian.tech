<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup>
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { Flip } from "gsap/Flip";
import { useAppStore } from "./stores/AppStore.js";
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Flip);
const appStore = useAppStore();
appStore.fetchRandomColor();
onMounted(() => {
  let root = document.querySelector(":root");
  root.style.setProperty("--accent-color", appStore.randomColor);
});
</script>