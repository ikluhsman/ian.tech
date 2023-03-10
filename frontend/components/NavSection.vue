<template>
  <section id="nav">
    <nav>
      <h2>nav</h2>
      <div>
        <div><span id="linkto-news" class="cursor-pointer underline" @click="idLinkClick">news</span></div>
        <div><span id="linkto-projects" class="cursor-pointer underline" @click="idLinkClick">projects</span></div>
        <div><span id="linkto-photos" class="cursor-pointer underline" @click="idLinkClick">photos</span></div>
        <div><span id="linkto-footer" class="cursor-pointer underline" @click="idLinkClick"><nuxt-link to="/contact">contact</nuxt-link></span></div>
      </div>
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