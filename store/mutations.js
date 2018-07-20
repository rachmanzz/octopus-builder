const mutations = {
  SET_SETTINGS: (state, { data }) => {
    state.settings = data
  },
  SET_FILES: (state, { data }) => {
    state.allFiles = data
  }
}

export default mutations
