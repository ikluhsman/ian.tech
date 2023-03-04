<script setup>
defineProps({
  footerPage: {
    type: Object,
    default: {},
  },
});
</script>
<template>
  <section>
    <footer>
      <h2>footer</h2>
      <!-- {{ footerPage.attributes.heading1 }} -->
      stuff in the footer
    </footer>
  </section>
</template>
<style scoped>
h2 {
  @apply text-gray-1000 dark:text-gray-50;
}
</style>