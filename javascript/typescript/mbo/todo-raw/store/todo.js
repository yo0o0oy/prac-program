export const state = () => ({
  list: [],
})

export const mutations = {
  getTodos(state, data) {
    state.list = data
  },
  postTodo(state, data) {
    state.list.push(data)
  },
  putTodo(state, data) {
    state.list = state.list.map((e) => {
      if (e.id === data.id) {
        return data
      }
      return e
    })
  },
  deleteTodo(state, id) {
    state.list = state.list.filter((e) => e.id !== id)
  },
}

export const actions = {
  async getTodos({ commit }) {
    await this.$axios({
      method: 'get',
      url: 'http://localhost:3001/todos',
    }).then((response) => {
      commit('getTodos', response.data)
    })
  },
  async postTodo({ commit }, data) {
    await this.$axios({
      method: 'post',
      url: 'http://localhost:3001/todos',
      data,
    }).then((response) => {
      commit('postTodo', response.data)
    })
  },
  async putTodo({ commit }, { id, data }) {
    await this.$axios({
      method: 'put',
      url: `http://localhost:3001/todos/${id}`,
      data,
    }).then((response) => {
      commit('putTodo', response.data)
    })
  },
  async deleteTodo({ commit }, id) {
    await this.$axios({
      method: 'delete',
      url: `http://localhost:3001/todos/${id}`,
    }).then(() => {
      commit('deleteTodo', id)
    })
  },
}