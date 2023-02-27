<template>
  <section id="nav">
    <nav>
      <h2>nav</h2>
      <ul class="list-none p-0">
        <li><span id="linkto-news" class="cursor-pointer underline" @click="idLinkClick">news</span></li>
        <li><span id="linkto-projects" class="cursor-pointer underline" @click="idLinkClick">projects</span></li>
        <li><span id="linkto-photos" class="cursor-pointer underline" @click="idLinkClick">photos</span></li>
        <li><span id="linkto-footer" class="cursor-pointer underline" @click="idLinkClick">contact</span></li>
        <li><nuxt-link to="/history">history</nuxt-link></li>
      </ul>
      <h6 class="m-0">if you are hiring please see <nuxt-link to="/resume">my resume</nuxt-link></h6>
    </nav>
  </section>
</template>
<script setup>
import { gsap } from 'gsap';
function idLinkClick(e) {
  const headingId = '#' + e.target.id.split('-')[1];
  gsap.to(window, {
    duration: 0.75,
    scrollTo: { y: headingId, offsetY: 200 },
  });
}
</script>