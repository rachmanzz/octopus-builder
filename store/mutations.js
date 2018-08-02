const mutations = {
  SET_SETTINGS: (state, { data }) => {
    state.settings = data
  },
  SET_FILES: (state, { data }) => {
    state.files = data
  },
  SET_TITLE: (state, data) => {
    state.title = data
  },
  SET_PROPERTIES: (state, data) => {
    state.properties = data
  },
  SET_COLLAPSE: (state, data) => {
    state.collapse = data
  },
  SET_PAGE: (state, data) => {
    state.page = data
  }
}

export default mutations
