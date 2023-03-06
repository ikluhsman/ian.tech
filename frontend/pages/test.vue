<script setup>
import gsap from 'gsap';
import { useAppStore } from '../stores/AppStore.js';
const appStore = useAppStore();
definePageMeta({
  layout: "test",
});
</script>
<template>
    <div  class="w-full">
        <div class="container space-y-8">
            <h1 class="text-4xl font-light">Welcome to ian.tech</h1>
            <h2 class="text-xl">Full-screen overlay navigation menu example</h2>
            <p><a href="javascript:void(0)" @click="appStore.imageOverlayIsOpen = !appStore.imageOverlayIsOpen"
                    class="px-5 py-3 bg-blue-500 hover:bg-blue-600 text-xl text-white duration-100">
                    <span class="text-2xl">&#9776;</span>
                    Show Overlay
                    
                </a></p>
                
        </div>
        <p>{{  appStore.imageOverlayIsOpen }}</p>    
    </div>
</template>