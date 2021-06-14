import axios from 'axios'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-storyblok-template',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],
  /* eslint-disable camelcase */
  generate: {
    fallback: 'index.html',
    routes (callback) {
      const token = 'H2caXLtWRSTEoFDR6QeNkgtt'
      const per_page = 10
      const version = 'published'
      let cache_version = 0

      const page = 1

      // other routes that are not in Storyblok with their slug.
      const routes = ['/'] // adds home directly but with / instead of /home

      // Load space and receive latest cache version key to improve performance
      axios.get(`https://api.storyblok.com/v1/cdn/spaces/me?token=${token}`).then((space_res) => {
        // timestamp of latest publish
        cache_version = space_res.data.space.version

        // Call first Page of the Stories
        axios.get(`https://api.storyblok.com/v1/cdn/stories?token=${token}&version=${version}&per_page=${per_page}&page=${page}&cv=${cache_version}`).then((res) => {
          res.data.stories.forEach((story) => {
            if (story.full_slug !== 'home') {
              routes.push('/' + story.full_slug)
            }
          })

          // Check if there are more pages available otherwise execute callback with current routes.
          const total = res.headers.total
          const maxPage = Math.ceil(total / per_page)
          if (maxPage <= 1) {
            callback(null, routes)
            return
          }

          // Since we know the total we now can pregenerate all requests we need to get all stories
          const contentRequests = []
          for (let page = 2; page <= maxPage; page++) {
            contentRequests.push(axios.get(`https://api.storyblok.com/v1/cdn/stories?token=${token}&version=${version}&per_page=${per_page}&page=${page}`))
          }

          // Axios allows us to exectue all requests using axios.spread we will than generate our routes and execute the callback
          axios.all(contentRequests).then(axios.spread((...responses) => {
            responses.forEach((response) => {
              response.data.stories.forEach((story) => {
                if (story.full_slug !== 'home') {
                  routes.push('/' + story.full_slug)
                }
              })
            })

            callback(null, routes)
          })).catch(callback)
        })
      })
    }
  },
  /* eslint-enable camelcase */

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/components.js',
    '~/plugins/composition-api.js',
    '~/plugins/storyblok-rich-text-renderer.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    'nuxt-i18n',
    '@nuxtjs/axios',
    [
      'storyblok-nuxt', {
        accessToken: 'H2caXLtWRSTEoFDR6QeNkgtt',
        cacheProvider: 'memory'
      }
    ]
  ],
  i18n: {
    locales: [
      { code: 'en', iso: 'en', file: 'en.js', name: 'English' },
      { code: 'pl', iso: 'pl', file: 'pl.js', name: 'Polski' }
    ],
    defaultLocale: 'pl',
    strategy: 'prefix_except_default',
    lazy: true,
    langDir: 'i18n/',
    baseUrl: '',
    seo: false,
    parsePages: false,
    syncRouteParams: true,
    pages: {
      'articles/index': {
        en: '/articles/',
        pl: '/artykuly/'
      },
      'articles/_slug': {
        en: '/articles/:slug',
        pl: '/artykuly/:slug'
      }
    },
    vueI18n: {
      fallbackLocale: 'pl',
      messages: {
        en: require('./i18n/en.json'),
        pl: require('./i18n/pl.json')
      }
    }
  },
  tailwindcss: {
    jit: true
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
