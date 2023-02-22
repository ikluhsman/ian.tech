<template>
    <div class="flex gap-4 self-center">
      <div class="invisible md:visible">
        <Icon
          name="lucide:align-horizontal-justify-start"
          v-show="justification === 'justify-start'"
          @click="appStore.setJustification()"
        />
        <Icon
          name="lucide:align-horizontal-justify-center"
          v-show="justification === 'justify-center'"
          @click="appStore.setJustification()"
        />
        <Icon
          name="lucide:align-horizontal-justify-end"
          v-show="justification === 'justify-end'"
          @click="appStore.setJustification()"
        />
      </div>
      <div>
        <Icon
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
