import axios from '~/plugins/axios'

const actions = {
  async nuxtClientInit ({ commit }) {
    try {
      const results = await axios.get('/core/setting')
      commit('SET_SETTINGS', { data: results.data })
    } catch (error) {
      throw error
    }
  }
}

export default actions
