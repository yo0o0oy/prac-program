import * as FontAwesome from './plugins/fontawesome'
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TODOLIST - JavaScript -',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/stylus/setcss.styl'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    ['@nuxtjs/fontawesome', { component: 'fontAwesome', suffix: true }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
  ],

  fontawesome: {
    icons: {
      solid: FontAwesome.solid,
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  styleResources: {
    stylus: '~/assets/stylus/set.styl',
  },
}
