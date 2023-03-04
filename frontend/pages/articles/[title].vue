<template>
  <div>
    <h1>an article with some content about <span class="text-gray-900 dark:text-gray-50">{{ route.params.title }}</span></h1>
  </div>
</template>
<script setup>
const route = useRoute();

</script>
