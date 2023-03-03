<template>
  <section id="projects">
    <h2>projects</h2>
    <p>In recent past I started sharing projects I make on
      <a href="https://github.com/ikluhsman" target="_blank">GitHub</a>.
    </p>
    <div>
      <ul class="p-0 list-none">
        <li v-for="(r, k) in repos" :key="k" class="pb-1 flex gap-2">
          <span>{{ formatDate(r.created) }}</span>
          <a :href="r.html_url" target="_blank">{{ r.name }}</a>
          <span v-if="r.language" class="rounded-xl px-2  dark:text-gray-300 text-gray-500 text-shadow-accent-color">{{
            r.language }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import dayjs from "dayjs";
defineProps({
  repos: {
    type: Array,
    default: [],
  },
});
function formatDate(dateString: string | number | Date | dayjs.Dayjs | null | undefined) {
  const date = dayjs(dateString);
  return date.format("MM/DD/YYYY");
}
</script>
