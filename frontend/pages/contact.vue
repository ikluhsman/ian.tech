<template>
<div>
    <p>contact me</p>
    <p>If you could count the skeletons in my closet. Under my bed and up under my faucet. Then you would know I've completely lost it. Is he nuts? No, he's insane. If you could count the skeletons in my closet. Under my bed and up under my faucet. Then you would know I've completely lost it. Is he nuts? No, he's insane.
    </p>
    <p>I'm beginning to feel like a Rap God, Rap God. All my people from the front to the back nod, back nod. The way I'm racing around the track, call me NASCAR, NASCAR. Dale Earnhardt of the trailer park, the White Trash God. Kneel before General Zod. This planet's Krypton – no, Asgard, Asgard.</p>
</div>

</template>
<script setup>

import { useAppStore } from "~~/stores/AppStore";
import gsap from 'gsap';
definePageMeta({
  pageTransition: {
    name: 'slide-in',
    mode: 'out-in',
    onBeforeEnter: (el) => {
      gsap.from(el, { duration: 0.25, x: innerWidth });
    }
  }
})
const appStore = useAppStore();
</script>