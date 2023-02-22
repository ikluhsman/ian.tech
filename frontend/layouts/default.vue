<template>
  <color-scheme :placeholder="''" tag="span">
    <div class="flex justify-end p-2">
      <theme-selector />
    </div>
    <div id="page-layout" :class="'px-4 flex ' + justification">
      <div class="w-11/12 sm:w-128">
        <nuxt-link href="/" v-if="route.path !== '/'">go back to home</nuxt-link>
        <slot />
      </div>
    </div>
  </color-scheme>
</template>
<script setup>
import { useAppStore } from "../stores/AppStore.js";
const appStore = useAppStore();
const justification = computed(() => {
  return appStore.justification;
});
const route = useRoute();
const router = useRouter();
</script>
