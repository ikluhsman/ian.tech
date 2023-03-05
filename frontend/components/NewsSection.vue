<template>
  <section id="news">
    <h2>news</h2>
    <p>{{ caption }}</p>
    <div>
      <ul class="list-none p-0">
        <li v-for="a in articles" :key="a.id">
          {{ formatDate(a.attributes.createdAt, "MM-DD-YYYY") }}
          <nuxt-link class="cursor-pointer" :to="'/articles/' + a.attributes.slug">{{ a.attributes.headline }}</nuxt-link>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup>
import dayjs from 'dayjs';
defineProps({
  htmlContent: {
    type: String,
    default: "",
  },
  articles: {
    type: Array,
    default: "",
  },
  caption: {
    type: String,
    default: "",
  }
});

function formatDate(dateString, format) {
  const date = dayjs(dateString);
  return date.format(format);
}
</script>
