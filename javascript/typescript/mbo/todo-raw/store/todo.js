export const state = () => ({
  list: [],
})

export const mutations = {
  getTodos(state, data) {
    state.list = data
  }
}

export const actions = {
  async getTodos({ commit }) {
    await this.$axios({
      method: 'get',
      url: 'http://localhost:3001/todos',
    }).then((response) => {
      commit('getTodos', response.data)
    })
  }
}