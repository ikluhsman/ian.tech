<template>
  <button
    class="bg-accent-color accent-color h-12 w-12 z-50 rounded-full border-none shadow-xl shadow-current"
    @click="$emit('click')"
  >
    <Icon name="lucide:arrow-up" class="text-gray-50 dark:text-gray-90" />
  </button>
</template>
