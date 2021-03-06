module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Octopus Builder',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Octopus page builder and components orchestra' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: 'http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://use.fontawesome.com/releases/v5.1.1/css/all.css' }
    ]
  },
  loading: {
    color: '#ffffff'
  },
  /*
  ** Global CSS
  */
  css: [
    { src: '~/assets/scss/style.scss', lang: 'scss' }
  ],
  /*
  ** Module
  */
  modules: [
    'bootstrap-vue/nuxt'
  ],
  // Plugins
  plugins: [
    { src: '~/plugins/vuex.js', ssr: false },
    { src: '~/plugins/element.js', ssr: false },
    { src: '~/plugins/swal.js', ssr: false },
    { src: '~/plugins/select.js', ssr: false },
    { src: '~/plugins/checkbox.js', ssr: false },
    { src: '~/plugins/client-init.js', ssr: false }
  ],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })

        const vueLoader = config.module.rules.find(({loader}) => loader === 'vue-loader')
        const { options: {loaders} } = vueLoader || { options: {} }
        if (loaders) {
          for (const loader of Object.values(loaders)) {
            changeLoaderOptions(Array.isArray(loader) ? loader : [loader])
          }
        }
        config.module.rules.forEach(rule => changeLoaderOptions(rule.use))
      }
    }
  }
}

const changeLoaderOptions = (loaders) => {
  if (loaders) {
    for (const loader of loaders) {
      if (loader.loader === 'sass-loader') {
        Object.assign(loader.options, {
          includePaths: ['./assets']
        })
      }
    }
  }
}
