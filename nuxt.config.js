// import https from 'https'
// import axios from 'axios'
import { sortRoutes } from '@nuxt/utils'
const policies = {
  'default-src': ["'self'", 'maps.googleapis.com'],
  'img-src': ['data:',
    'https:',
    "'self'",
    'maps.gstatic.com',
    '*.googleapis.com',
    '*.ggpht',
    'www.googletagmanager.com',
    'https://ssl.gstatic.com',
    'https://www.gstatic.com',
    'https://www.google-analytics.com',
    'www.google-analytics.com',
    'https://stats.g.doubleclick.net',
    'https://optimize.google.com',
    'https://script.hotjar.com',
    'http://script.hotjar.com'],
  'worker-src': ["'self'", 'blob:'],
  'style-src': ["'self'",
    "'unsafe-inline'",
    'cdn.jsdelivr.net',
    'fonts.googleapis.com',
    'https://tagmanager.google.com',
    'www.googletagmanager.com',
    'https://fonts.googleapis.com',
    'https://optimize.google.com'],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    'maps.googleapis.com',
    'www.googletagmanager.com',
    'https://www.googletagmanager.com',
    'https://tagmanager.google.com',
    'https://www.google-analytics.com',
    'https://optimize.google.com',
    'http://static.hotjar.com',
    'https://static.hotjar.com',
    'https://script.hotjar.com'
  ],
  'font-src': ["'self'",
    'cdn.jsdelivr.net',
    'fonts.gstatic.com',
    'https://fonts.gstatic.com',
    'data:',
    'http://script.hotjar.com',
    'https://script.hotjar.com'],
  'connect-src': ["'self'",
    'https://www.google-analytics.com',
    'www.google-analytics.com',
    'https://stats.g.doubleclick.net',
    'rovara.nl',
    'www.rovara.nl',
    ' http://*.hotjar.com:*',
    'https://*.hotjar.com:*',
    'https://vc.hotjar.io:*',
    'https://surveystats.hotjar.io',
    'wss://*.hotjar.com'
  ],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"],
  'frame-src': [
    'https://optimize.google.com',
    'https://vars.hotjar.com'
  ],
  'object-src': ["'none'"]
// 'base-uri': ['rovara.be', 'rovara.nl']
}
if (process.env.NODE_ENV === 'development') {
  policies['default-src'].push('dev.welivesmart.de')
  policies['connect-src'].push('dev.welivesmart.de')
}

let server = {

}
if (process.env.NODE_ENV === 'development') {
  server = {
    port: process.env.PORT || 3000,
    host: 'localhost',
    timing: false
  }
} else {
  server = {
    port: process.env.PORT || 3000,
    host: '0.0.0.0',
    timing: false
  }
}
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    titleTemplate: '%s - Rovara', // + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      // { hid: 'description', name: 'description', content: 'Wij verzamelen alle populaire producten van de beste online shops. Vergelijk op prijs, reviews en verzending. Overzichtelijk en transparant, in één platform.' }
      // { hid: 'description', name: 'description', content: 'Alles wat je nodig hebt voor een slimme aankoopbeslissing op één plek. Wij vergelijken de prijzen, zo dat jij dat niet meer hoeft te doen.' }
      // { hid: 'description', name: 'description', content: 'Sta je op het punt om een nieuw product aan te schaffen? Bekijk bij ons wat de beste deal is! Zodat jij tijd en geld bespaart op je online aankoop.' }
      { hid: 'description', name: 'description', content: 'Vergelijk prijzen van alle grote online winkels. Bespaar tijd en geld. Wij houden de prijzen voor je bij zodat je altijd weet of je een goede deal hebt.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/Favicon-Rovara.gif' },
      // { rel: 'preload', href: '/Favicon-Rovara.gif', as: 'image' }
      // { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com', crossorigin: true },
      { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&amp;display=swap', as: 'style', crossorigin: 'anonymous' },
      { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Material+Icons&amp;display=swap', as: 'style', crossorigin: 'anonymous' },
      { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Material+Icons+Round&amp;display=swap', as: 'style', crossorigin: 'anonymous' },
      { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&amp;display=swap', as: 'style', crossorigin: 'anonymous' },
      { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap', as: 'style', crossorigin: 'anonymous' },
      { rel: 'preload', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&amp;display=swap', as: 'style', crossorigin: 'anonymous' },
      { rel: 'preload', href: 'https://fonts.gstatic.com/s/poppins/v15/pxiEyp8kv8JHgFVrJJfecg.woff2', as: 'font', crossorigin: 'anonymous' },
      { rel: 'preload', href: 'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2', as: 'font', crossorigin: 'anonymous' },
      { rel: 'preload', href: 'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLDD4Z1xlFQ.woff2', as: 'font', crossorigin: 'anonymous' },
      { rel: 'preload', href: 'https://fonts.gstatic.com/s/poppins/v15/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2', as: 'font', crossorigin: 'anonymous' },
      { rel: 'preload', href: 'https://fonts.gstatic.com/s/materialicons/v92/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', as: 'font', crossorigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&amp;display=swap', media: 'all', crossorigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Icons&amp;display=swap', media: 'all', crossorigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Icons+Round&amp;display=swap', media: 'all', crossorigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&amp;display=swap', media: 'all', crossorigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap', media: 'all', crossorigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap', media: 'all', crossorigin: 'anonymous' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&amp;display=swap', media: 'all', crossorigin: 'anonymous' }
      // { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      // { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
      // { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@latest/css/materialdesignicons.min.css', defer: true, async: true }
      // { rel: 'stylesheet', href: '/css/materialdesignicons.min.css', body: true, defer: true, async: true }
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons&display=swap', defer: true },
      // { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap', defer: true }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'assets/main.css'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '~/plugins/gtm'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  // buildModules: [
  //   // Doc: https://github.com/nuxt-community/eslint-module
  //   // '@nuxtjs/eslint-module',
  //   // '@nuxtjs/vuetify',
  //   'nuxt-purgecss'
  // ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-webfontloader',
    /*  '@nuxtjs/sitemap', */
    '@nuxtjs/robots',
    'cookie-universal-nuxt',
    '@nuxtjs/gtm'
  ],
  gtm: {
    id: 'GTM-MSCLSST',
    scriptDefer: true,
    pageTracking: true,
    autoInit: false
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},

  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    html: {
      minify: {
        collapseBooleanAttributes: true,
        decodeEntities: true,
        minifyCSS: true,
        minifyJS: true,
        processConditionalComments: true,
        removeEmptyAttributes: true,
        removeRedundantAttributes: true,
        trimCustomFragments: true,
        useShortDoctype: true
      }
    }
    /*
    extractCSS: {
      ignoreOrder: false
    } */
  },
  /*
  webfontloader: {
    custom: {
      families: ['Material+Icons', 'Material+Icons+Round',
        'Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700',
        'Amaranth:ital,wght@0,400;0,700;1,400;1,700',
        'DM+Serif+Display:400',
        'Open+Sans:wght@400;600;700;800',
        'Poppins:wght@300;400;500;600;700;800;900'
      ],
      urls: [
        'https://fonts.googleapis.com/css2?family=Material+Icons'
      ]
    }
  }, */
  webfontloader: {
    custom: {
      families: [
        'Material+Icons',
        'Material+Icons+Round',
        'Cabin',
        'Amaranth',
        /* 'DM+Serif+Display', */
        'Open+Sans'
        // 'Poppins'
      ],
      urls: [
        // 'https://fonts.googleapis.com/css2?family=Material+Icons&amp;display=swap',
        // 'https://fonts.googleapis.com/css2?family=Material+Icons+Round&amp;display=swap',
        'https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&amp;display=swap',
        'https://fonts.googleapis.com/css2?family=Amaranth:ital,wght@0,400;0,700;1,400;1,700&amp;display=swap',
        /* 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:wght@400&display=swap', */
        'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700;800&amp;display=swap'
        // 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&amp;display=swap'

      ]
    }
  },

  render: {
    csp: {
      reportOnly: false,
      hashAlgorithm: 'sha256',
      policies
    }
  },
  /*
  sitemap: async () => {
    if (process.env.NODE_ENV !== 'development') {
      return undefined
    }
    const one = 1
    if (one + one === 3) {
      return undefined
    }
    const returnObj = {}
    returnObj.defaults = {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    }
    returnObj.path = '/sitemap/sitemapindex.xml'
    const sitemaps = []
    const urlsPerSitemap = 10000
    const agent = new https.Agent({ rejectUnauthorized: false })
    // const { data } = await axios.get('https://welivesmart.de/api/pages/getSitemapUrlCount', { httpsAgent: agent })
    const pageTypes = ['pages', 'products', 'brands', 'categories']
    for (const pageType of pageTypes) {
      let iterate = true
      let nextId = ''
      for (let i = 0; iterate; i += urlsPerSitemap) {
        const { data } = await axios.get(`https://welivesmart.de/api/pages/urls?objectId=${nextId}&limit=${urlsPerSitemap}&type=${pageType}`, { httpsAgent: agent })
        const { urls, lastId } = data
        nextId = lastId
        iterate = urls.length > 0
        console.log('LENGTH', urls.length)
        if (urls.length > 0) {
          sitemaps.push({
            path: `/sitemap/sitemap-${pageType}-${i}.xml`,
            routes: urls,
            exclude: ['/redirect', '/brand/no']
          })
        }
      }
    }

    returnObj.sitemaps = sitemaps
    console.log(sitemaps)
    returnObj.exclude = ['/redirect', '/brand/no']
    return returnObj
  },
  /**/
  router: {
    trailingSlash: false,
    middleware: 'redirect',
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'brand-brand',
        path: '/brand/:brand',
        component: resolve(__dirname, 'pages/products.vue')
      })
      routes.push({
        name: 'category-all',
        path: '/category/:category(.*)',
        component: resolve(__dirname, 'pages/products.vue')
      })
      sortRoutes(routes)
    }
  },
  /**/
  robots: () => {
    if (process.env.NODE_ENV !== 'production') {
      return {
        UserAgent: '*',
        Disallow: '/',
        sitemap: 'https://www.rovara.nl/sitemap/sitemapindex.xml'
      }
    } else {
      return {
        UserAgent: '*',
        Disallow: '/redirect',
        Allow: '/',
        sitemap: 'https://www.rovara.nl/sitemap/sitemapindex.xml'
      }
    }
  },
  // server: {
  //   port: process.env.PORT || 3000,
  //   host: '0.0.0.0',
  //   timing: false
  // }
  server
}
