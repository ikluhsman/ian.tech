<template>
  <section id="nav">
    <nav>
      <h2>nav</h2>
      <ul class="list-none p-0 md:leading-6">
        <li><span id="linkto-news" class="cursor-pointer underline" @click="idLinkClick">news</span></li>
        <li><span id="linkto-projects" class="cursor-pointer underline" @click="idLinkClick">projects</span></li>
        <li><span id="linkto-photos" class="cursor-pointer underline" @click="idLinkClick">photos</span></li>
        <li><span id="linkto-footer" class="cursor-pointer underline" @click="idLinkClick"><nuxt-link to="/contact">contact</nuxt-link></span></li>
      </ul>
    </nav>
  </section>
</template>
<script setup>
import { gsap } from 'gsap';
function idLinkClick(e) {
  const headingId = '#' + e.target.id.split('-')[1];
  gsap.to(window, {
    duration: 0.35,
    scrollTo: { y: headingId, offsetY: 200 },
  });
}
</script>
<style scoped>
h2 {
  @apply text-gray-1000 dark:text-gray-100;
}
</style>