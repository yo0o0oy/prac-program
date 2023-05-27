import axios, { AxiosResponse } from "axios"
import { /* getterTree, */ mutationTree, actionTree, getAccessorType } from 'typed-vuex'
import { Todo } from '~/types/todo'

// これらは型推論に必要のため、空でも定義しておく
export const state = () => ({
  list: [] as Array<Todo>
})
export const getters = {}

export const mutations = mutationTree(state, {
  getTodos(state, data: Todo[]): void {
    state.list = data
  },
  postTodo(state, data: Todo): void {
    state.list.push(data)
  },
  putTodo(state, data: Todo): void {
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
    async getTodos({ commit }) {
      await axios({
        method: 'get',
        url: 'http://localhost:3001/todos',
      }).then((response: AxiosResponse) => {
        commit('getTodos', response.data)
      })
    },
    async postTodo({ commit }, data: {
      id: number,
      isDone: boolean,
      task: string,
    }) {
      await axios({
        method: 'post',
        url: 'http://localhost:3001/todos',
        data,
      }).then((response: AxiosResponse) => {
        commit('postTodo', response.data)
      })
    },
    async putTodo({ commit }, { id, data }: {
      id: number,
      data: {
        id: number,
        isDone: boolean,
        task: string,
      },
    }) {
      await axios({
        method: 'put',
        url: `http://localhost:3001/todos/${id}`,
        data,
      }).then((response: AxiosResponse) => {
        commit('putTodo', response.data)
      })
    },
    async deleteTodo({ commit }, id: number) {
      await axios({
        method: 'delete',
        url: `http://localhost:3001/todos/${id}`,
      }).then(() => {
        commit('deleteTodo', id)
      })
    },
  },
)

export const accessorType = getAccessorType({
  state,
  // getters,
  mutations,
  actions,
})
