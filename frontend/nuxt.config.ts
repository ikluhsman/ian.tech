export default defineNuxtConfig({
  app: {
    head: {
      title: "ian.tech",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "ian.tech", name: "Ian Tech", content: "" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        {
          hid: "canonical",
          rel: "canonical",
          href: "https://ian.tech",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css?family=Outfit",
        },       

      ],
    },
  },
  build: {
    transpile: ["gsap"],
  },
  css: ["~/assets/scss/global.scss", "~/assets/prism.css"],
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
  modules: ["@nuxtjs/color-mode", "@pinia/nuxt", "nuxt-icon", "@nuxtjs/strapi", "@nuxt/image-edge"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  strapi: {
    url: "http://172.30.1.66:1337",
  },
  image: {
    provider: "strapi",
    strapi: {
      baseURL: "http://172.30.1.66:1337",
    },
  },
  typescript: {
    strict: true,
  },
});
