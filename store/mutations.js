const mutations = {
  SET_SETTINGS: (state, { data }) => {
    state.settings = data
  },
  SET_FILES: (state, { data }) => {
    state.allFiles = data
  },
  SET_PROPERTIES: (state, data) => {
    state.properties = data
  }
}

export default mutations
