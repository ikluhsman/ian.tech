<template>
  <section id="projects">
    <h2>projects</h2>
    <p>Most of the complex code I have created cannot be shared with the public.</p>
    <p>
      I do have some pet projects on
      <a href="https://github.com/ikluhsman" target="_blank">GitHub</a> that are public,
      including this site.
    </p>
    <div>
      <ul class="list-none p-0">
        <li v-for="(r, k) in repos" :key="k">
          {{ formatDate(r.created) }}
          <a :href="r.html_url" target="_blank">{{ r.name }}</a>
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
const { $mdRenderer } = useNuxtApp();
</script>
