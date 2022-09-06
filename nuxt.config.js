export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "contactappFour",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["~/plugins/apollo.js"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],
  // "@nuxtjs/apollo"
  // apollo: {
  //   clientConfigs: {
  //     default: "~/plugins/apollo-config.js",
  //   },
  //   defaultOptions: {
  //     $query: {
  //       loadingKey: "loading",
  //       fetchPolicy: "cache-and-network",
  //     },
  //   },
  //   authenticationType: "Bearer",
  //   tokenName: "apollo-token",
  //   cookieAttributes: {
  //     expires: 7,
  //   },
  //   errorHandler: "~/plugins/error-handler.js",
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
