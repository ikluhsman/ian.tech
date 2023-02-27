<template>
  <div class="flex gap-2">
    <div class="invisible lg:visible">
      <icon
        name="lucide:align-horizontal-justify-start"
        v-if="justification === 'justify-start'"
        @click="appStore.cycleJustification()"
      />
      <icon
        name="lucide:align-horizontal-justify-center"
        v-if="justification === 'justify-center'"
        @click="appStore.cycleJustification()"
      />
      <icon
        name="lucide:align-horizontal-justify-end"
        v-if="justification === 'justify-end'"
        @click="appStore.cycleJustification()"
      />
    </div>
    <div>
      <icon
        :name="colorMode.preference === 'dark' ? 'ri:moon-line' : 'ri:sun-line'"
        @click="changeDarkLight"
        class="cursor-pointer"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAppStore } from "../stores/AppStore.js";
const colorMode = useColorMode();
const appStore = useAppStore();
const justification = computed(() => {
  return appStore.justification;
});
function changeDarkLight() {
  colorMode.preference === "dark"
    ? (colorMode.preference = "light")
    : (colorMode.preference = "dark");
}
</script>
<style scoped>

</style>
