const state = {
  confirmDialog: {
    visible: false,
    title: '',
    content: '',
  }
}

const getters = {}

const mutations = {
  setConfirmDialog(state, data) {
    state.confirmDialog.visible = data.visible
    state.confirmDialog.title = data.title
    state.confirmDialog.content = data.content
  },
}
const actions = {
  async showConfirmDialog({commit}, {title, content}) {
    commit('setConfirmDialog', {visible: true, title, content})
  }
}
export default {
  state: () => state,
  getters,
  actions,
  mutations
}
