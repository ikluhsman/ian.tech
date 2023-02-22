export default defineNuxtConfig({
  app: {
    head: {
      title: "anikl.com",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "anikl.com", name: "Ian K Dev", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          hid: "canonical",
          rel: "canonical",
          href: "https://anikl.com",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Fira%20Mono",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Fira%20Code",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Oswald",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Karla",
        },
      ],
    },
  },
  build: {
    transpile: ["gsap"],
  },
  css: ["~/assets/scss/global.scss"],
  colorMode: {
    preference: "system",
    fallback: "light",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
  modules: ["@nuxtjs/color-mode", "@pinia/nuxt", "nuxt-icon", "@nuxtjs/strapi"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  strapi: {
    url: "http://localhost:1337",
  },
  typescript: {
    strict: true,
  }
});
