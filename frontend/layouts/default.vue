<template>
  <color-scheme :placeholder="''" tag="span">
    <div>
      <div class="flex justify-center">
        <div class="flex w-full py-1/2">
          <theme-selector class="absolute right-2 top-2" />
        </div>
      </div>
      <div :class="'px-4 md:flex ' + justification">
        <div>
          <site-logo />
          <div id="page-layout">
            <div class="w-11/12 md:w-140">
              <nuxt-link href="/" v-if="route.path !== '/'">go back</nuxt-link>
              <slot />
            </div>
          </div>
        </div>
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
</script>
