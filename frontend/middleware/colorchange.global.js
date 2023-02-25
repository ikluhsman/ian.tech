import { useAppStore } from "../stores/AppStore.js";
export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    "global-middleware",
    (to, from) => {
      useAppStore().fetchRandomColor();
    },
    { global: true }
  );
});
