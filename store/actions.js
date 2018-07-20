import axios from '~/plugins/axios'

const actions = {
  async nuxtClientInit ({ commit }) {
    try {
      const results = await axios.get('/api/settings')
      commit('SET_SETTINGS', { data: results.data })
    } catch (error) {
      throw error
    }
  }
}

export default actions
