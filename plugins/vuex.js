import createPersistedState from 'vuex-persistedstate'

export default ({ store, isHMR }) => {
  if (isHMR) return
  window.onNuxtReady((nuxt) => {
    // const storage = window.localStorage
    // const vuexStore = JSON.parse(storage.getItem('vuex'))

    createPersistedState({
      paths: [
        'allFiles'
      ]
    })(store)
  })
}
