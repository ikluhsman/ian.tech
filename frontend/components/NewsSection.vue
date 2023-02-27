<template>
  <section id="news">
    <h2>news</h2>
    <p>{{ caption }}</p>
    <div>
      <ul class="list-none p-0">
        <li>article1</li>
        <li>article2</li>
        <li>article3</li>
        <li>article4</li>
      </ul>
    </div>
  </section>
</template>
<script setup>
defineProps({
  htmlContent: {
    type: String,
    default: "",
  },
  caption: {
    type: String,
    default: "",
  }
});
</script>
