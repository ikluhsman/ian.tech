<template>
  <div>
    <h1>{{ homePage.attributes.hero.title }}</h1>
    <div>
      <section v-html="introHtml"/>
      <section>
        <nav>
          <h2>nav</h2>
          <ul>
            <li><nuxt-link to="/articles">articles</nuxt-link></li>
            <li><nuxt-link to="/about">about</nuxt-link></li>
            <li><nuxt-link to="/contact">contact</nuxt-link></li>
          </ul>
        </nav>
      </section>
      <section>
        <h2>posts</h2>
      </section>
      <section>
        <h2>projects</h2>
      </section>
    </div>
  </div>
</template>
<script setup>
import { useStrapiStore } from "../stores/StrapiStore.js";
const strapiStore = useStrapiStore();
await strapiStore.fetchHomePage();
const homePage = computed(() => {
  return strapiStore.getHomepage;
});
const { $mdRenderer } = useNuxtApp()
const introHtml = $mdRenderer.render(strapiStore.getHomepage.attributes?.hero.introduction);
</script>
<style scoped>
h1 {
  color: var(--accentColor);
}
section { @apply pb-8; }
section nav h2:first-of-type {
  @apply text-gray-1000 dark:text-gray-100;
}
section:last-of-type h2 {
  @apply text-gray-1000 dark:text-gray-100;
}
</style>
