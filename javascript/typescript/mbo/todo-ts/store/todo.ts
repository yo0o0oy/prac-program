import { getAccessorType } from 'typed-vuex'
import { getterTree, mutationTree, actionTree } from 'typed-vuex'

// これらは型推論に必要のため、空でも定義しておく
export const state = () => ({
  list: [] as Array<{
    id: number,
    isDone: boolean,
    task: string,
  }>
})
export const getters = {}
export const mutations = mutationTree(state, {
  getTodos(state, data: {
    id: number,
    isDone: boolean,
    task: string,
  }[]): void {
    state.list = data
  },
  postTodo(state, data: {
    id: number,
    isDone: boolean,
    task: string,
  }): void {
    state.list.push(data)
  },
  putTodo(state, data: {
    id: number,
    isDone: boolean,
    task: string,
  }): void {
    state.list = state.list.map((e) => {
      if (e.id === data.id) {
        return data
      }
      return e
    })
  },
  deleteTodo(state, id: number): void {
    state.list = state.list.filter((e) => e.id !== id)
  },
})
export const actions = actionTree(
  { state, getters, mutations },
  {
    getTodos({ commit }): void {
      // await this.$axios({
      //   method: 'get',
      //   url: 'http://localhost:3001/todos',
      // }).then((response) => {
      //   commit('getTodos', response.data)
      // })
      commit('getTodos', [])
    },
    postTodo({ commit }, data: {
      id: number,
      isDone: boolean,
      task: string,
    }) {
      // await this.$axios({
      //   method: 'post',
      //   url: 'http://localhost:3001/todos',
      //   data,
      // }).then((response) => {
      //   commit('postTodo', response.data)
      // })
      commit('postTodo', data)
    },
    putTodo({ commit }, { id, data }: {
      id: number,
      data: {
        id: number,
        isDone: boolean,
        task: string,
      },
    }) {
      // await this.$axios({
      //   method: 'put',
      //   url: `http://localhost:3001/todos/${id}`,
      //   data,
      // }).then((response) => {
      //   commit('putTodo', response.data)
      // })
      console.log(id)
      commit('postTodo', data)
    },
    deleteTodo({ commit }, id: number) {
      // await this.$axios({
      //   method: 'delete',
      //   url: `http://localhost:3001/todos/${id}`,
      // }).then(() => {
      //   commit('deleteTodo', id)
      // })
      commit('deleteTodo', id)
    },
  },
)

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
})
